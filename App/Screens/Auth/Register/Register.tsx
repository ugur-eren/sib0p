import React from 'react'
import { View, Image, ScrollView, RefreshControl, ActivityIndicator } from 'react-native'
import { withTheme, Text } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler'
import FastImage from 'react-native-fast-image'
import Button from '../../../Components/Button/Button'
import Input from '../../../Components/Input/Input'
import Api from '../../../Includes/Api'
import Storage from '../../../Includes/Storage'
import Types from '../../../Includes/Types/Types'
import styles from './styles'

interface Props {
	navigation: Types.Navigation
	theme: Types.Theme
}

interface State {
	loading: boolean
	refreshing: boolean
	error: boolean
	captchaToken: string
	username: string
	name: string
	surname: string
	email: string
	password: string
	passwordCheck: string
	captcha: string
	usernameError: string
	nameError: string
	surnameError: string
	emailError: string
	passwordError: string
	passwordCheckError: string
	captchaError: string
}

class Register extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			loading: true,
			refreshing: false,
			error: false,
			captchaToken: null,
			username: '',
			name: '',
			surname: '',
			email: '',
			password: '',
			passwordCheck: '',
			captcha: '',
			usernameError: '',
			nameError: '',
			surnameError: '',
			emailError: '',
			passwordError: '',
			passwordCheckError: '',
			captchaError: '',
		}
	}

	private captchaImage: string = null

	componentDidMount() {
		this.refreshCaptcha()
	}

	refreshCaptcha = () => {
		this.setState({ refreshing: true }, async () => {
			let captcha = await Api.requestCaptcha()
			if (captcha) {
				if (captcha.status) {
					this.captchaImage = captcha.captcha
					this.setState({ captchaToken: captcha.token, error: false, refreshing: false, loading: false })
				} else {
					this.captchaImage = captcha.captcha
					this.setState({ captchaToken: null, error: true, refreshing: false, loading: false })
				}
			} else {
				this.props.navigation.getScreenProps().unknown_error()
				this.props.navigation.goBack()
			}
		})
	}

	onRegisterPress = async () => {
		if (!this.state.username) {
			return this.setState({ usernameError: 'Kullanıcı adı boş olamaz.' })
		}
		if (this.state.username.length < 4) {
			return this.setState({ usernameError: 'Kullanıcı adı 4 karakterden az olamaz.' })
		}

		if (!this.state.email) {
			return this.setState({ emailError: 'E-Posta boş olamaz.' })
		}
		if (this.state.email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,}$/g) === null) {
			return this.setState({ emailError: 'E-Posta Adresiniz doğru değil.' })
		}

		if (this.state.password.length < 5) {
			return this.setState({ passwordError: 'Şifreniz 5 karakterden az olamaz.' })
		}
		if (this.state.password !== this.state.passwordCheck) {
			return this.setState({ passwordError: 'Şifreleriniz eşleşmemektedir.', passwordCheckError: 'Şifreleriniz eşleşmemektedir.' })
		}
		if (!this.state.captcha) {
			return this.setState({ captchaError: 'Doğrulama Kodu boş olamaz.' })
		}

		let register = await Api.register({
			username: this.state.username,
			name: this.state.name,
			surname: this.state.surname,
			email: this.state.email,
			password: this.state.password,
			captchaToken: this.state.captchaToken,
			captcha: this.state.captcha,
		})
		if (register) {
			if (register.status) {
				if (!register.token || !register.username) {
					return this.props.navigation.getScreenProps().unknown_error('Giriş bilgileri alınamadı. Lütfen giriş yapmayı deneyiniz.')
				}

				await Storage.setMultiple({
					token: register.token,
					username: register.username,
				})

				this.props.navigation.getScreenProps().setUserData({
					active: true,
					token: register.token,
					username: register.username,
				})
				this.props.navigation.navigate('mainStack')
			} else {
				if (register.error == 'email_in_use') {
					this.props.navigation.getScreenProps().error('Bu E-Posta adresi başka bir kullanıcı tarafından kullanılmaktadır.')
				} else if (register.error == 'expired_captcha') {
					this.refreshCaptcha()
					this.props.navigation.getScreenProps().error('Güvenlik kodu doğrulama süresi geçti. Lütfen güvenlik kodunu tekrar giriniz.')
				} else if (register.error == 'some_empty') {
					this.props.navigation
						.getScreenProps()
						.error('Bazı alanları doldurmamışsınız. Lütfen bilgilerinizi kontrol edip tekrar deneyiniz.')
				} else if (register.error == 'username_in_use') {
					this.props.navigation.getScreenProps().error('Bu kullanıcı adı başka bir kullanıcı tarafından kullanılmaktadır.')
				} else if (register.error == 'username_not_allowed') {
					this.props.navigation.getScreenProps().error('Bu kullanıcı adı kullanılamaz.')
				} else if (register.error == 'username_short') {
					this.props.navigation.getScreenProps().error('Kullanıcı adı 4 karakterden az olamaz.')
				} else if (register.error == 'wrong_captcha') {
					this.props.navigation.getScreenProps().error('Doğrulama kodu hatalı. Lütfen tekrar deneyiniz.')
				} else if (register.error == 'wrong_email') {
					this.props.navigation
						.getScreenProps()
						.error('Girdiğiniz E-Posta adresi doğru değil. Lütfen E-Posta adresinizi kontrol ediniz ve tekrar deneyiniz.')
				} else if (register.error == 'wrong_username') {
					this.props.navigation
						.getScreenProps()
						.error('Kullanıcı adı sadece İngilizce karakterler, sayı, nokta, alt çizgi ve üst çizgi içerebilir.')
				} else {
					this.props.navigation.getScreenProps().unknown_error()
				}
			}
		} else {
			this.props.navigation.getScreenProps().unknown_error()
		}
	}

	navigateToLogin = () => {
		this.props.navigation.navigate('Login')
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
		this.refreshCaptcha()
	}

	render() {
		let { theme } = this.props
		return (
			<>
				{this.state.loading ? (
					<View style={[styles.loader, { backgroundColor: theme.colors.background }]}>
						<ActivityIndicator size='large' color={theme.colors.main} />
					</View>
				) : (
					<ScrollView
						style={[styles.container, { backgroundColor: theme.colors.surface }]}
						keyboardDismissMode='none'
						keyboardShouldPersistTaps='handled'
						refreshControl={<RefreshControl onRefresh={this.refreshCaptcha} refreshing={this.state.refreshing} />}
					>
						<View style={[styles.topContainer, { backgroundColor: theme.colors.background }]}>
							<FastImage source={require('../../../Assets/Images/logo-wide.png')} style={styles.topLogo} resizeMode='contain' />
							<Text style={[styles.topSubtitle, { color: theme.colors.contrast }]}>Kayıt Ol</Text>
						</View>

						<View style={styles.centerContainer}>
							<Input
								placeholder='Kullanıcı Adı *'
								leftIcon='tag'
								value={this.state.username}
								error={this.state.usernameError}
								onChangeText={this._onUsernameChange}
							/>
							<Input
								placeholder='İsim'
								leftIcon='user'
								value={this.state.name}
								error={this.state.nameError}
								onChangeText={this._onNameChange}
							/>
							<Input
								placeholder='Soyisim'
								leftIcon='users'
								value={this.state.surname}
								error={this.state.surnameError}
								onChangeText={this._onSurnameChange}
							/>
							<Input
								placeholder='E-Posta *'
								leftIcon='at-sign'
								email
								value={this.state.email}
								error={this.state.emailError}
								onChangeText={this._onEmailChange}
							/>
							<Input
								placeholder='Şifre *'
								leftIcon='lock'
								password
								value={this.state.password}
								error={this.state.passwordError}
								onChangeText={this._onPasswordChange}
							/>
							<Input
								placeholder='Şifre Tekrar *'
								leftIcon='lock'
								password
								value={this.state.passwordCheck}
								onChangeText={this._onPasswordCheckChange}
							/>

							<View style={{ flexDirection: 'row', marginBottom: 21 }}>
								<TouchableOpacity onPress={this._onCaptchaPress}>
									<Image
										source={{ uri: this.captchaImage ? 'data:image/jpeg;base64,' + this.captchaImage : null }}
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
									placeholder='Güvenlik Kodu *'
									leftIcon='key'
									number
									value={this.state.captcha}
									error={this.state.captchaError}
									onChangeText={this._onCaptchaChange}
								/>
							</View>
						</View>

						<View style={styles.bottomContainer}>
							<Button label='Kayıt Ol' loading={true} containerStyle={styles.buttonContainer} onPress={this.onRegisterPress} />
							<TouchableOpacity onPress={this.navigateToLogin}>
								<Text style={[styles.bottomText, { color: theme.colors.contrast }]}>
									Hesabın var mı? <Text style={{ color: theme.colors.main }}>{'\n\n'}Giriş Yap</Text>
								</Text>
							</TouchableOpacity>
						</View>
					</ScrollView>
				)}
			</>
		)
	}
}

export default withTheme(Register)
