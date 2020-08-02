import 'react-native-gesture-handler'

import React from 'react'
import { View, StatusBar, Appearance } from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper'
import Feather from 'react-native-vector-icons/Feather'
import { NavigationActions } from 'react-navigation'
import AppRouter from './App/router'
import Storage from './App/Includes/Storage'
import Theme from './App/Includes/Theme/Theme'
import Types from './App/Includes/Types/Types'

export default class App extends React.PureComponent<{}, Types.AppState> {
	constructor(props: {}) {
		super(props)

		this.state = {
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
		}
	}

	async componentDidMount() {
		let settings = await Storage.getMultipleWithDefault({
			theme: 'system',
			notification: 'true',
			language: 'system',
			token: '',
			username: '',
		})
		let allSettings: any = {}
		let stateObject: any = {}

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
				theme: time > 730 && time < 1730 ? 'dark' : 'light',
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
			if (!this.state.user.active){
				this._navigationRef.dispatch(NavigationActions.navigate({ routeName: 'authStack' }))
			}
		})
	}

	private isVideoMuted: boolean = false
	private _navigationRef: any = null

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

		this.setState({ selectedTheme: theme, theme: theme === 'dark' || theme === 'light' ? theme : this.state.theme }, () => {
			if (callback) {
				callback()
			}
		})
	}

	setIsVideoMuted = (isMuted: boolean) => {
		this.isVideoMuted = isMuted
	}

	getIsVideoMuted = () => this.isVideoMuted

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
					<AppRouter
						ref={this._setNavigationRef}
						theme={this.state.theme}
						screenProps={
							{
								theme: Theme[this.state.theme],
								user: this.state.user,
								selectedTheme: this.state.selectedTheme,

								setUserData: this.setUserData,
								setTheme: this.setTheme,
								setIsVideoMuted: this.setIsVideoMuted,

								getIsVideoMuted: this.getIsVideoMuted,
							} as Types.ScreenProps
						}
					/>
				</PaperProvider>
			</View>
		)
	}
}
