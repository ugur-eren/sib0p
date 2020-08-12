import React from 'react'
import { View } from 'react-native'
import { withTheme, Text } from 'react-native-paper'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import FastImage from 'react-native-fast-image'
import OneSignal from 'react-native-onesignal'
import Button from '../../../Components/Button/Button'
import Input from '../../../Components/Input/Input'
import Types from '../../../Includes/Types/Types'
import Api from '../../../Includes/Api'
import Storage from '../../../Includes/Storage'
import styles from './styles'
import Config from '../../../Includes/Config'

interface Props {
	navigation: Types.Navigation
	theme: Types.Theme
}

interface State {
	username: string
	password: string
	usernameError?: string
	passwordError?: string
}

class Login extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			username: '',
			password: '',
			usernameError: null,
			passwordError: null,
		}
	}

	_onUsernameChange = (text: string) => {
		this.setState({ username: text, usernameError: null })
	}

	_onPasswordChange = (text: string) => {
		this.setState({ password: text, passwordError: null })
	}

	_onLoginPress = async () => {
		let { username, password } = this.state
		let screen = this.props.navigation.getScreenProps()

		if (!username) {
			return this.setState({ usernameError: screen.language.username_empty })
		}
		if (username.length < 4) {
			return this.setState({ usernameError: screen.language.username_less })
		}
		if (!password) {
			return this.setState({ passwordError: screen.language.password_empty })
		}

		let login = await Api.login({ username: username, password: password })

		if (!login) {
			return this.props.navigation.getScreenProps().unknown_error()
		}
		if (login.status) {
			if (!login.token || !login.username) {
				return this.props.navigation.getScreenProps().unknown_error(screen.language.couldnt_take_login_info)
			}

			await Storage.setMultiple({
				token: login.token,
				username: login.username,
			})

			OneSignal.sendTag('token', login.notif_token)

			this.props.navigation.getScreenProps().setUserData({
				active: true,
				token: login.token,
				username: login.username,
			})
			this.props.navigation.navigate('mainStack')
		} else {
			this.props.navigation
				.getScreenProps()
				.error(
					login.error === 'wrong_username'
						? screen.language.wrong_username
						: login.error === 'no_user'
						? screen.language.no_user
						: login.error === 'wrong_password'
						? screen.language.wrong_username
						: screen.language.unknown_error + login.error
				)
		}
	}

	navigateToPasswordRecovery = () => {
		this.props.navigation.navigate('PasswordRecovery')
	}

	navigateToRegister = () => {
		this.props.navigation.navigate('Register')
	}

	render() {
		let { theme } = this.props
		let screen = this.props.navigation.getScreenProps()
		return (
			<ScrollView
				style={[styles.container, { backgroundColor: theme.colors.surface }]}
				keyboardDismissMode='none'
				keyboardShouldPersistTaps='handled'
			>
				<View style={[styles.topContainer, { backgroundColor: theme.colors.background }]}>
					<FastImage source={require('../../../Assets/Images/logo-wide.png')} style={styles.topLogo} resizeMode='contain' />
					<Text style={[styles.topSubtitle, { color: theme.colors.contrast }]}>{screen.language.login}</Text>
				</View>

				<View style={styles.centerContainer}>
					<Input
						placeholder={screen.language.username}
						leftIcon='user'
						value={this.state.username}
						onChangeText={this._onUsernameChange}
						error={this.state.usernameError}
					/>
					<Input
						placeholder={screen.language.password}
						leftIcon='lock'
						password
						value={this.state.password}
						onChangeText={this._onPasswordChange}
						error={this.state.passwordError}
					/>

					<TouchableOpacity onPress={this.navigateToPasswordRecovery}>
						<Text style={[styles.centerText, { color: theme.colors.contrast }]}>{screen.language.have_you_forgot_password}</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.bottomContainer}>
					<Button label={screen.language.login} loading={true} containerStyle={styles.buttonContainer} onPress={this._onLoginPress} />
					<TouchableOpacity onPress={this.navigateToRegister}>
						<Text style={[styles.bottomText, { color: theme.colors.contrast }]}>
							{screen.language.have_no_account}{' '}
							<Text style={{ color: theme.colors.main, textAlign: 'center', fontFamily: Config.fonts.semi }}>
								{'\n\n'}
								{screen.language.register}
							</Text>
						</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		)
	}
}

export default withTheme(Login)
