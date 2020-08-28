import 'react-native-gesture-handler'

import React from 'react'
import { View, StatusBar, Appearance, Platform, Alert } from 'react-native'
import { Provider as PaperProvider, Portal, Snackbar, Text } from 'react-native-paper'
import Feather from 'react-native-vector-icons/Feather'
import { NavigationActions } from 'react-navigation'
import SplashScreen from 'react-native-splash-screen'
import OneSignal from 'react-native-onesignal'
import PostSharer from './App/Contents/PostSharer/PostSharer'
import AppRouter from './App/router'
import Storage from './App/Includes/Storage'
import Theme from './App/Includes/Theme/Theme'
import Types from './App/Includes/Types/Types'
import Api from './App/Includes/Api'
import { Languages, DefaultLanguage } from './App/Includes/Languages'
import UserTypes from './App/Includes/Types/UserTypes'
import PostTypes from './App/Includes/Types/PostTypes'

export default class App extends React.PureComponent<{}, Types.AppState> {
	constructor(props: {}) {
		super(props)

		OneSignal.init('043f271a-41cf-438f-b28d-6baab28e1e3b', {
			kOSSettingsKeyAutoPrompt: false,
			kOSSettingsKeyInAppLaunchURL: false,
			kOSSettingsKeyInFocusDisplayOption: 2,
		})
		OneSignal.inFocusDisplaying(2)

		if (Platform.OS == 'ios') {
			OneSignal.promptForPushNotificationsWithUserResponse(() => {})
		}

		this.state = {
			ready: false,
			theme: 'dark',
			selectedTheme: 'dark',
			notification: true,
			language: 'tr',
			selectedLanguage: 'system',
			user: {
				active: false,
				username: null,
				token: null,
			},
			errorMessage: false,
			postSharing: false,
		}
	}

	public DataCache: {
		profiles: {
			[key: string]: {
				data?: UserTypes.Profile
				posts?: PostTypes.Post[]
			}
		}
		currentTime: number
	} = {
		profiles: {},
		currentTime: 0,
	}

	async componentDidMount() {
		this.init()
	}

	init = async () => {
		try {
			let values = await Promise.all([
				Api.checkConnection(),
				Storage.getMultipleWithDefault({
					theme: 'system',
					notification: 'true',
					language: 'system',
					token: '',
					username: '',
				}),
			])

			let connected = values[0]
			let settings = values[1]

			if (!connected || !connected.status) {
				return this.setState({ ready: true }, () => {
					SplashScreen.hide()
					this._navigationRef.dispatch(NavigationActions.navigate({ routeName: 'NoConnection' }))
				})
			}

			let allSettings: any = {}
			let stateObject: any = {
				ready: true,
			}

			if (!settings) {
				allSettings = {
					theme: 'system',
					notification: 'true',
					language: 'system',
					token: '',
					username: '',
				}
			} else {
				allSettings = settings
			}

			// check and set notificaiton perm at settings
			stateObject = {
				...stateObject,
				selectedTheme: allSettings.theme,
				notification: allSettings.notification === 'true',
				selectedLanguage: allSettings.language,
			}

			if (allSettings.token && allSettings.username) {
				stateObject = {
					...stateObject,
					user: {
						active: true,
						token: allSettings.token,
						username: allSettings.username,
					},
				}
			} else {
				stateObject = {
					...stateObject,
					user: {
						active: false,
						token: '',
						username: '',
					},
				}
			}

			// themeing
			if (allSettings.theme === 'system') {
				let colorScheme = Appearance.getColorScheme()
				if (!colorScheme) {
					colorScheme = 'light'
				}

				stateObject = {
					...stateObject,
					theme: colorScheme,
				}
			} else if (allSettings.theme === 'timed') {
				let date = new Date()
				let time = parseInt(date.getHours() + '' + date.getMinutes())
				stateObject = {
					...stateObject,
					theme: time > 730 && time < 1730 ? 'light' : 'dark',
				}
			} else {
				stateObject = {
					...stateObject,
					theme: allSettings.theme === 'dark' ? 'dark' : 'light',
				}
			}

			// Language
			if (allSettings.language === 'system') {
				stateObject = {
					...stateObject,
					language: DefaultLanguage,
				}
			} else {
				stateObject = {
					...stateObject,
					language: allSettings.language || 'tr',
				}
			}

			let loggedIn = await Api.checkLogin({ token: stateObject.user.token })
			if (!loggedIn) {
				return this.setState({ ready: true }, () => {
					SplashScreen.hide()
					this._navigationRef.dispatch(NavigationActions.navigate({ routeName: 'NoConnection' }))
				})
			}

			if (!loggedIn.username && !loggedIn.profilePhoto) {
				stateObject = {
					...stateObject,
					user: {
						active: false,
						token: '',
						username: '',
						profilePhoto: '',
						notifCount: 0,
					},
				}

				return this.setState(stateObject, async () => {
					await this.logout()
					SplashScreen.hide()
				})
			} else {
				OneSignal.sendTag('token', loggedIn.notif_token)

				stateObject = {
					...stateObject,
					user: {
						active: true,
						token: stateObject.user.token,
						username: loggedIn.username,
						profilePhoto: loggedIn.profilePhoto,
						notifCount: loggedIn.notifCount,
					},
				}
				Storage.setMultiple({
					username: loggedIn.username || '',
					profilePhoto: loggedIn.profilePhoto || '',
				})
			}

			this.setState(stateObject, () => {
				SplashScreen.hide()
				if (!this.state.user.active) {
					this._navigationRef.dispatch(NavigationActions.navigate({ routeName: 'authStack' }))
				} else {
					this._navigationRef.dispatch(NavigationActions.navigate({ routeName: 'mainStack' }))
				}
			})
		} catch (e) {
			return this.setState({ ready: true }, () => {
				SplashScreen.hide()
				this._navigationRef.dispatch(NavigationActions.navigate({ routeName: 'NoConnection' }))
			})
		}
	}

	private isVideoMuted: boolean = false
	private _navigationRef: any = null
	private sharePostRef: any = null

	_setNavigationRef = (ref: any) => {
		this._navigationRef = ref
	}

	setUserData = (user: Types.ScreenPropsUser, callback?: () => void) => {
		this.setState({ user }, () => {
			if (callback) {
				callback()
			}
		})
	}

	setTheme = (theme: Types.SupportedThemes, callback?: () => void) => {
		Storage.set('theme', theme)

		let selectedTheme: 'dark' | 'light' = 'light'

		if (theme === 'system') {
			let colorScheme = Appearance.getColorScheme()
			if (!colorScheme) {
				colorScheme = 'light'
			}
			selectedTheme = colorScheme
		} else if (theme === 'timed') {
			let date = new Date()
			let time = parseInt(date.getHours() + '' + date.getMinutes())
			selectedTheme = time > 730 && time < 1730 ? 'light' : 'dark'
		} else {
			selectedTheme = theme === 'dark' ? 'dark' : 'light'
		}

		if (this.state.selectedTheme !== theme || this.state.theme !== selectedTheme) {
			this.setState({ selectedTheme: theme, theme: selectedTheme }, () => {
				if (callback) {
					callback()
				}
			})
		} else {
			if (callback) {
				callback()
			}
		}
	}

	setLanguage = (language: Types.SupportedLanguages | 'system', callback?: () => void) => {
		Storage.set('language', language)

		let setLanguage: Types.SupportedLanguages = null

		if (language === 'system') {
			setLanguage = DefaultLanguage
		} else {
			setLanguage = language || 'tr'
		}

		if (this.state.language !== setLanguage || this.state.selectedLanguage !== language) {
			this.setState({ language: setLanguage, selectedLanguage: language }, () => {
				if (callback) {
					callback()
				}
			})
		} else {
			if (callback) {
				callback()
			}
		}
	}

	setIsVideoMuted = (isMuted: boolean) => {
		this.isVideoMuted = isMuted
	}

	getIsVideoMuted = () => this.isVideoMuted

	logout = async (runtime?: boolean) => {
		await Storage.setMultiple({
			token: '',
			username: '',
		})

		this.setState({
			user: {
				active: false,
				token: '',
				username: '',
			},
		})

		OneSignal.deleteTag('token')

		let response = await Api.logout({ token: this.state.user.token })
		if (response && response.status) {
		} else {
			this._navigationRef.dispatch(
				NavigationActions.navigate({
					routeName: 'authStack',
					params: {
						showMessage: runtime ? 'no_login' : undefined,
					},
				})
			)
		}
	}

	unknown_error = (error?: string) => {
		if (error) {
			this.setState({ errorMessage: Languages[this.state.language].unknown_error + error })
		} else {
			Alert.alert(
				Languages[this.state.language].error,
				Languages[this.state.language].unknown_error + Languages[this.state.language].check_network
			)
		}
	}

	error = (error: string) => {
		this.setState({ errorMessage: error })
	}

	onSnackbarDismiss = () => {
		this.setState({ errorMessage: false })
	}

	setSharePost = (ref: any) => {
		this.sharePostRef = ref
	}

	sharePost = (message: string, tags: string[], images: { type: 'image' | 'video'; content: string }[]) => {
		this.sharePostRef.sharePost(message, tags, images)
	}
	isSharePostActive = () => this.sharePostRef.isPostActive()

	getDataCache = () => this.DataCache
	setProfileDataCache = (data: UserTypes.Profile, posts?: PostTypes.Post[]) => {
		this.DataCache = {
			...this.DataCache,
			profiles: {
				...this.DataCache.profiles,
				[data.username]: {
					...(this.DataCache.profiles[data.username] ? this.DataCache.profiles[data.username] : {}),
					data: data,
					...(posts ? { posts: posts } : {}),
				},
			},
		}
	}
	removeProfileDataCache = (username: string) => {
		let profiles = this.DataCache.profiles
		profiles[username] = undefined
		this.DataCache = {
			...this.DataCache,
			profiles: profiles,
		}
	}
	setCurrentTime = (currentTime: number) => {
		this.DataCache = {
			...this.DataCache,
			currentTime: currentTime,
		}
	}

	setNotification = (active: boolean) => {
		Storage.set('notification', active ? 'true' : 'false')
		OneSignal.setSubscription(active)
		this.setState({ notification: active })
	}

	render() {
		return (
			<View style={{ flex: 1 }}>
				{this.state.theme === 'dark' ? (
					<StatusBar barStyle='light-content' backgroundColor='#757575' />
				) : (
					<StatusBar barStyle='dark-content' backgroundColor='#FFFFFF' />
				)}

				<PaperProvider
					settings={{
						icon: (props: { name: string; color: string; size: number; direction: 'rtl' | 'ltr'; allowFontScaling?: boolean }) => (
							<Feather {...props} />
						),
					}}
					theme={Theme[this.state.theme]}
				>
					<PostSharer language={Languages[this.state.language]} sharePost={this.setSharePost} token={this.state.user.token} />
					{this.state.ready ? (
						<AppRouter
							ref={this._setNavigationRef}
							theme={this.state.theme}
							screenProps={
								{
									theme: Theme[this.state.theme],
									language: Languages[this.state.language],
									activeLanguage: this.state.language,
									selectedLanguage: this.state.selectedLanguage,
									user: this.state.user,
									notification: this.state.notification,
									selectedTheme: this.state.selectedTheme,
									logout: this.logout,
									unknown_error: this.unknown_error,
									error: this.error,

									sharePost: this.sharePost,
									isSharePostActive: this.isSharePostActive,
									restart: this.init,

									setUserData: this.setUserData,
									setTheme: this.setTheme,
									setLanguage: this.setLanguage,
									setNotification: this.setNotification,
									setIsVideoMuted: this.setIsVideoMuted,

									getIsVideoMuted: this.getIsVideoMuted,

									DataCache: this.getDataCache,
									setProfileDataCache: this.setProfileDataCache,
									removeProfileDataCache: this.removeProfileDataCache,
									setCurrentTime: this.setCurrentTime,
								} as Types.ScreenProps
							}
						/>
					) : (
						<></>
					)}

					<Portal>
						<Snackbar visible={!!this.state.errorMessage} onDismiss={this.onSnackbarDismiss}>
							<Text style={{ color: Theme[this.state.theme].colors.contrast }}>{this.state.errorMessage}</Text>
						</Snackbar>
					</Portal>
				</PaperProvider>
			</View>
		)
	}
}
