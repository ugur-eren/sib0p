import 'react-native-gesture-handler'

import React from 'react'
import { View, StatusBar, Appearance } from 'react-native'
import { Provider as PaperProvider, Portal, Snackbar, Text } from 'react-native-paper'
import Feather from 'react-native-vector-icons/Feather'
import { NavigationActions } from 'react-navigation'
import SplashScreen from 'react-native-splash-screen'
import PostSharer from './App/Includes/PostSharer'
import AppRouter from './App/router'
import Storage from './App/Includes/Storage'
import Theme from './App/Includes/Theme/Theme'
import Types from './App/Includes/Types/Types'
import Api from './App/Includes/Api'

export default class App extends React.PureComponent<{}, Types.AppState> {
	constructor(props: {}) {
		super(props)

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

	async componentDidMount() {
		this.init()
	}

	init = async () => {
		let connected = await Api.checkConnection()
		if (!connected || !connected.status){
			return this.setState({ready: true}, () => {
				SplashScreen.hide()
				this._navigationRef.dispatch(NavigationActions.navigate({ routeName: 'NoConnection' }))
			})
		}
		let settings = await Storage.getMultipleWithDefault({
			theme: 'system',
			notification: 'true',
			language: 'system',
			token: '',
			username: '',
		})
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
			// do intl stuff. but im using v8-nointl.
			// maybe react-native-intl
		} else {
			stateObject = {
				...stateObject,
				language: allSettings.language === 'tr' ? 'tr' : 'en',
			}
		}

		this.setState(stateObject, () => {
			SplashScreen.hide()
			if (!this.state.user.active) {
				this._navigationRef.dispatch(NavigationActions.navigate({ routeName: 'authStack' }))
			} else {
				this._navigationRef.dispatch(NavigationActions.navigate({ routeName: 'mainStack' }))
			}
		})
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

		if (this.state.selectedTheme !== theme && this.state.theme !== selectedTheme) {
			this.setState({ selectedTheme: theme, theme: selectedTheme }, () => {
				if (callback) {
					callback()
				}
			})
		} else {
			callback()
		}
	}

	setIsVideoMuted = (isMuted: boolean) => {
		this.isVideoMuted = isMuted
	}

	getIsVideoMuted = () => this.isVideoMuted

	logout = async (runtime?: boolean) => {
		let isSet = await Storage.setMultiple({
			token: '',
			username: '',
		})
		if (isSet) {
			this.setState({
				user: {
					active: false,
					token: '',
					username: '',
				},
			})

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
	}

	unknown_error = (error?: string) => {
		if (error) {
			this.setState({ errorMessage: 'Maalesef, Bilinmeyen bir hata ile karşılaştık. ' + error })
		} else {
			this.setState({ errorMessage: 'Maalesef, Bilinmeyen bir hata ile karşılaştık. ' })
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

	sharePost = (message: string, tags: string[], images: string[]) => {
		this.sharePostRef.sharePost(message, tags, images)
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
					<PostSharer sharePost={this.setSharePost} />
					{this.state.ready ? (
						<AppRouter
							ref={this._setNavigationRef}
							theme={this.state.theme}
							screenProps={
								{
									theme: Theme[this.state.theme],
									user: this.state.user,
									selectedTheme: this.state.selectedTheme,
									logout: this.logout,
									unknown_error: this.unknown_error,
									error: this.error,

									sharePost: this.sharePost,
									restart: this.init,

									setUserData: this.setUserData,
									setTheme: this.setTheme,
									setIsVideoMuted: this.setIsVideoMuted,

									getIsVideoMuted: this.getIsVideoMuted,
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
