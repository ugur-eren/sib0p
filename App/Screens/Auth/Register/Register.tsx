import React from 'react'
import { View, Image } from 'react-native'
import { withTheme, Text } from 'react-native-paper'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import FastImage from 'react-native-fast-image'
import Button from '../../../Components/Button/Button'
import Input from '../../../Components/Input/Input'
import Types from '../../../Includes/Types/Types'
import styles from './styles'

interface Props {
	navigation: Types.Navigation
	theme: Types.Theme
}

interface State {
	random: string
	username: string
	name: string
	surname: string
	email: string
	password: string
	passwordCheck: string
	captcha: string
}

class Register extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			random: Math.random().toString(36).substring(7),
			username: '',
			name: '',
			surname: '',
			email: '',
			password: '',
			passwordCheck: '',
			captcha: '',
		}
	}

	onLoginPress = () => {}

	navigateToPasswordRecovery = () => {}

	navigateToRegister = () => {
		this.props.navigation.navigate('Register')
	}

	_onUsernameChange = (text: string) => {
		this.setState({ username: text })
	}
	_onNameChange = (text: string) => {
		this.setState({ name: text })
	}
	_onSurnameChange = (text: string) => {
		this.setState({ surname: text })
	}
	_onEmailChange = (text: string) => {
		this.setState({ email: text })
	}
	_onPasswordChange = (text: string) => {
		this.setState({ password: text })
	}
	_onPasswordCheckChange = (text: string) => {
		this.setState({ passwordCheck: text })
	}
	_onCaptchaChange = (text: string) => {
		this.setState({ captcha: text })
	}

	_onCaptchaPress = () => {
		this.setState({ random: Math.random().toString(36).substring(7) })
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
					<Text style={[styles.topSubtitle, { color: theme.colors.contrast }]}>Kayıt Ol</Text>
				</View>

				<View style={styles.centerContainer}>
					<Input placeholder='Username' leftIcon='tag' value={this.state.username} onChangeText={this._onUsernameChange} />
					<Input placeholder='Name' leftIcon='user' value={this.state.name} onChangeText={this._onNameChange} />
					<Input placeholder='Surname' leftIcon='user' value={this.state.surname} onChangeText={this._onSurnameChange} />
					<Input placeholder='Email' leftIcon='at-sign' email value={this.state.email} onChangeText={this._onEmailChange} />
					<Input placeholder='Password' leftIcon='lock' password value={this.state.password} onChangeText={this._onPasswordChange} />
					<Input
						placeholder='Password Check'
						leftIcon='lock'
						password
						value={this.state.passwordCheck}
						onChangeText={this._onPasswordCheckChange}
					/>

					<View style={{ flexDirection: 'row', marginBottom: 21 }}>
						<TouchableOpacity onPress={this._onCaptchaPress}>
							<Image
								source={{ uri: 'https://sib0p.com/inc/captcha.php?random=' + this.state.random }}
								style={{
									width: 100,
									height: 50,
									marginRight: 10,
								}}
								resizeMode='contain'
							/>
						</TouchableOpacity>
						<Input
							containerStyle={{ flex: 1, marginBottom: 0 }}
							placeholder='Captcha'
							leftIcon='key'
							number
							value={this.state.captcha}
							onChangeText={this._onCaptchaChange}
						/>
					</View>
				</View>

				<View style={styles.bottomContainer}>
					<Button label='Login' loading={true} containerStyle={styles.buttonContainer} onPress={this.onLoginPress} />
					<TouchableOpacity onPress={this.navigateToRegister}>
						<Text style={[styles.bottomText, { color: theme.colors.contrast }]}>
							Do you have an account? <Text style={{ color: theme.colors.main }}>{'\n\n'}Login</Text>
						</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		)
	}
}

export default withTheme(Register)
