import 'react-native-gesture-handler'

import React from 'react'
import { View, StatusBar } from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper'
import Feather from 'react-native-vector-icons/Feather'
import AppRouter from './App/router'
import Theme from './App/Includes/Theme/Theme'
import Types from './App/Includes/Types/Types'

export default class App extends React.PureComponent<{}, Types.AppState> {
	constructor(props: {}) {
		super(props)

		this.state = {
			theme: 'light',
			selectedTheme: 'light',
			user: {
				active: false,
				username: 'berat'
			}
		}
	}

	setUserData = (user: Types.ScreenPropsUser, callback?: () => void) => {
		this.setState({ user }, () => {
			if (callback){
				callback()
			}
		})
	}

	setTheme = (theme: Types.SupportedThemes, callback?: () => void) => {
		this.setState({ selectedTheme: theme, theme: (theme === 'dark' || theme === 'light') ? theme : this.state.theme }, () => {
			if (callback){
				callback()
			}
		})
	}

	render() {
		return (
			<View style={{ flex: 1 }}>
				{this.state.theme === 'dark' ? (
					<StatusBar barStyle="light-content" backgroundColor="#757575" />
				) : (
					<StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
				)}
				
				<PaperProvider
					settings={{
						icon: (props) => <Feather {...props} />,
					}}
					theme={Theme[this.state.theme]}
				>
					<AppRouter
						theme={this.state.theme}
						screenProps={{
							theme: Theme[this.state.theme],
							user: this.state.user,
							selectedTheme: this.state.selectedTheme,
							
							setUserData: this.setUserData,
							setTheme: this.setTheme
						} as Types.ScreenProps}
					/>
				</PaperProvider>
			</View>
		)
	}
}
