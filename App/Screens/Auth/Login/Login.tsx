import React from 'react'
import { View } from 'react-native'
import { withTheme, Text } from 'react-native-paper'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Button from '../../../Components/Button/Button'
import Input from '../../../Components/Input/Input'
import Types from '../../../Includes/Types/Types'
import Api from '../../../Includes/Api'
import Storage from '../../../Includes/Storage'
import styles from './styles'
import FastImage from 'react-native-fast-image'

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

		if (!username) {
			return this.setState({ usernameError: 'Kullanıcı adı boş olamaz.' })
		}
		if (username.length < 4) {
			return this.setState({ usernameError: 'Kullanıcı adı 4 karakterden az olamaz.' })
		}
		if (!password) {
			return this.setState({ passwordError: 'Şifreniz boş olamaz.' })
		}

		let login = await Api.login({ username: username, password: password })

		if (!login) {
			console.log(login)
			return
		}

		if (login.status) {
			if (!login.token && !login.username) {
				console.log(login)
				return
			}

			await Storage.setMultiple({
				token: login.token,
				username: login.username,
			})

			this.props.navigation.getScreenProps().setUserData({
				active: true,
				token: login.token,
				username: login.username
			})
			this.props.navigation.navigate("mainStack")
		} else {
			console.log(login.error)
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
		return (
			<ScrollView
				style={[styles.container, { backgroundColor: theme.colors.surface }]}
				keyboardDismissMode='none'
				keyboardShouldPersistTaps='handled'
			>
				<View style={[styles.topContainer, { backgroundColor: theme.colors.background }]}>
					<FastImage source={require('../../../Assets/Images/logo-wide.png')} style={styles.topLogo} resizeMode='contain' />
					<Text style={[styles.topSubtitle, { color: theme.colors.contrast }]}>Giriş Yap</Text>
				</View>

				<View style={styles.centerContainer}>
					<Input
						placeholder='Username'
						leftIcon='user'
						value={this.state.username}
						onChangeText={this._onUsernameChange}
						error={this.state.usernameError}
					/>
					<Input
						placeholder='Password'
						leftIcon='lock'
						password
						value={this.state.password}
						onChangeText={this._onPasswordChange}
						error={this.state.passwordError}
					/>

					<TouchableOpacity onPress={this.navigateToPasswordRecovery}>
						<Text style={[styles.centerText, { color: theme.colors.contrast }]}>Forgot your password?</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.bottomContainer}>
					<Button label='Login' loading={true} containerStyle={styles.buttonContainer} onPress={this._onLoginPress} />
					<TouchableOpacity onPress={this.navigateToRegister}>
						<Text style={[styles.bottomText, { color: theme.colors.contrast }]}>
							Don't have an account? <Text style={{ color: theme.colors.main, textAlign: 'center' }}>{'\n\n'}Register</Text>
						</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		)
	}
}

export default withTheme(Login)
