import React from 'react'
import { View, Image, ScrollView, RefreshControl, ActivityIndicator } from 'react-native'
import { withTheme, Text, Checkbox } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler'
import FastImage from 'react-native-fast-image'
import Button from '../../../Components/Button/Button'
import Input from '../../../Components/Input/Input'
import Api from '../../../Includes/Api'
import Storage from '../../../Includes/Storage'
import Types from '../../../Includes/Types/Types'
import styles from './styles'
import { CheckboxAndroid } from 'react-native-paper/src/components/Checkbox/CheckboxAndroid'
import Config from '../../../Includes/Config'

interface Props {
	navigation: Types.Navigation
	theme: Types.Theme
}

interface State {
	loading: boolean
	refreshing: boolean
	error: boolean
	agreementActive: boolean
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
			agreementActive: false,
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
		let screen = this.props.navigation.getScreenProps()

		if (!this.state.agreementActive) {
			return this.props.navigation.getScreenProps().error(screen.language.must_agree_agreement)
		}

		if (!this.state.username) {
			return this.setState({ usernameError: screen.language.username_empty })
		}
		if (this.state.username.length < 4) {
			return this.setState({ usernameError: screen.language.username_less })
		}

		if (!this.state.email) {
			return this.setState({ emailError: screen.language.email_empty })
		}
		if (this.state.email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,}$/g) === null) {
			return this.setState({ emailError: screen.language.email_wrong })
		}

		if (this.state.password.length < 5) {
			return this.setState({ passwordError: screen.language.password_less })
		}
		if (this.state.password !== this.state.passwordCheck) {
			return this.setState({ passwordError: screen.language.password_not_match, passwordCheckError: screen.language.password_not_match })
		}
		if (!this.state.captcha) {
			return this.setState({ captchaError: screen.language.captcha_empty })
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
					return this.props.navigation.getScreenProps().unknown_error(screen.language.couldnt_take_login_info)
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
					this.props.navigation.getScreenProps().error(screen.language.email_in_use)
				} else if (register.error == 'expired_captcha') {
					this.refreshCaptcha()
					this.props.navigation.getScreenProps().error(screen.language.expired_captcha)
				} else if (register.error == 'some_empty') {
					this.props.navigation.getScreenProps().error(screen.language.some_empty)
				} else if (register.error == 'username_in_use') {
					this.props.navigation.getScreenProps().error(screen.language.username_in_use)
				} else if (register.error == 'username_not_allowed') {
					this.props.navigation.getScreenProps().error(screen.language.username_not_allowed)
				} else if (register.error == 'username_short') {
					this.props.navigation.getScreenProps().error(screen.language.username_less)
				} else if (register.error == 'wrong_captcha') {
					this.props.navigation.getScreenProps().error(screen.language.wrong_captcha)
				} else if (register.error == 'wrong_email') {
					this.props.navigation.getScreenProps().error(screen.language.email_wrong)
				} else if (register.error == 'wrong_username') {
					this.props.navigation.getScreenProps().error(screen.language.wrong_username)
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
		this.setState({ username: text.replace(/[^a-zA-Z0-9.\-_]/g, '') })
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

	toggleAgreement = () => {
		this.setState({ agreementActive: !this.state.agreementActive })
	}

	_hizmetKosullari = () => {
		this.props.navigation.navigate('PasswordRecovery', {
			title: this.props.navigation.getScreenProps().language.terms_of_use,
			uri: Config.siteUri + 'hizmet-kullanim-kosullari.' + this.props.navigation.getScreenProps().language.code + '.html',
		})
	}

	_gizlilikPolitikasi = () => {
		this.props.navigation.navigate('PasswordRecovery', {
			title: this.props.navigation.getScreenProps().language.privacy_policy,
			uri: Config.siteUri + 'gizlilik-politikasi.' + this.props.navigation.getScreenProps().language.code + '.html',
		})
	}

	render() {
		let { theme } = this.props
		let screen = this.props.navigation.getScreenProps()
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
							<Text style={[styles.topSubtitle, { color: theme.colors.contrast }]}>{screen.language.register}</Text>
						</View>

						<View style={styles.centerContainer}>
							<Input
								placeholder={screen.language.username + ' *'}
								leftIcon='tag'
								value={this.state.username}
								error={this.state.usernameError}
								onChangeText={this._onUsernameChange}
								small
							/>
							<Input
								placeholder={screen.language.name}
								leftIcon='user'
								value={this.state.name}
								error={this.state.nameError}
								onChangeText={this._onNameChange}
							/>
							<Input
								placeholder={screen.language.surname}
								leftIcon='users'
								value={this.state.surname}
								error={this.state.surnameError}
								onChangeText={this._onSurnameChange}
							/>
							<Input
								placeholder={screen.language.email + ' *'}
								leftIcon='at-sign'
								email
								value={this.state.email}
								error={this.state.emailError}
								onChangeText={this._onEmailChange}
								small
							/>
							<Input
								placeholder={screen.language.password + ' *'}
								leftIcon='lock'
								password
								value={this.state.password}
								error={this.state.passwordError}
								onChangeText={this._onPasswordChange}
								small
							/>
							<Input
								placeholder={screen.language.password_again + ' *'}
								leftIcon='lock'
								password
								value={this.state.passwordCheck}
								onChangeText={this._onPasswordCheckChange}
								small
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
									placeholder={screen.language.captcha + ' *'}
									leftIcon='key'
									number
									value={this.state.captcha}
									error={this.state.captchaError}
									onChangeText={this._onCaptchaChange}
								/>
							</View>

							<View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 21, flex: 1 }}>
								<CheckboxAndroid
									theme={theme}
									status={this.state.agreementActive ? 'checked' : 'unchecked'}
									uncheckedColor={theme.colors.contrast}
									color={theme.colors.main}
									onPress={this.toggleAgreement}
								/>
								<Text style={[styles.centerText, { color: theme.colors.contrast, flex: 1 }]} onPress={this.toggleAgreement}>
									{screen.activeLanguage === 'tr' ? (
										<>
											<Text onPress={this._hizmetKosullari} style={{ color: theme.colors.main }}>
												Hizmet ve Kullanım koşullarını
											</Text>
											,{' '}
											<Text onPress={this._gizlilikPolitikasi} style={{ color: theme.colors.main }}>
												Veri ve Gizlilik Politikasını
											</Text>{' '}
											Okudum ve kabul ediyorum.
										</>
									) : (
										<>
											I've read and accept the{' '}
											<Text onPress={this._hizmetKosullari} style={{ color: theme.colors.main }}>
												EULA and Terms of Use
											</Text>
											,{' '}
											<Text onPress={this._gizlilikPolitikasi} style={{ color: theme.colors.main }}>
												Data and Privacy Policy
											</Text>
										</>
									)}
								</Text>
							</View>
						</View>

						<View style={styles.bottomContainer}>
							<Button label={screen.language.register} loading={true} containerStyle={styles.buttonContainer} onPress={this.onRegisterPress} />
							<TouchableOpacity onPress={this.navigateToLogin}>
								<Text style={[styles.bottomText, { color: theme.colors.contrast }]}>
									{screen.language.have_an_account}{' '}
									<Text style={{ color: theme.colors.main, textAlign: 'center', fontFamily: Config.fonts.semi }}>
										{'\n\n' + screen.language.login}
									</Text>
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
