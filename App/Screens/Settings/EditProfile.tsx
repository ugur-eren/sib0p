import React from 'react'
import { ScrollView, View } from 'react-native'
import { Text, withTheme, Portal, Snackbar, ActivityIndicator } from 'react-native-paper'
import FastImage from 'react-native-fast-image'
import Input from '../../Components/Input/Input'
import Button from '../../Components/Button/Button'
import Types from '../../Includes/Types/Types'
import { EditProfileStyles as styles } from './styles'
import Header from '../../Components/Header/Header'
import Api from '../../Includes/Api'

interface Props {
	navigation: Types.Navigation
	theme: Types.Theme
}

interface State {
	loading: boolean
	isErrorVisible: boolean
	username: string
	name: string
	surname: string
	email: string
	bio: string
	usernameError: string
	emailError: string
}

class EditProfile extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			loading: true,
			isErrorVisible: false,
			username: '',
			name: '',
			surname: '',
			email: '',
			bio: '',
			usernameError: '',
			emailError: '',
		}
	}

	componentDidMount() {
		this.init()
	}

	init = async () => {
		let screen = this.props.navigation.getScreenProps()

		let response = await Api.getProfileData({ token: screen.user.token })
		if (response) {
			if (response.status) {
				this.setState(response.user_data)
				this.setState({ loading: false })
			} else {
				if (response.error === 'no_login') {
					screen.logout(true)
				} else {
					screen.unknown_error(response.error)
				}
			}
		} else {
			screen.unknown_error()
		}
	}

	_usernameChange = (text: string) => {
		this.setState({ username: text })
	}
	_nameChange = (text: string) => {
		this.setState({ name: text })
	}
	_surnameChange = (text: string) => {
		this.setState({ surname: text })
	}
	_emailChange = (text: string) => {
		this.setState({ email: text })
	}
	_bioChange = (text: string) => {
		this.setState({ bio: text })
	}

	_onLoginPress = async () => {
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

		let screen = this.props.navigation.getScreenProps()

		let response = await Api.updateProfile({
			token: screen.user.token,
			username: this.state.username,
			name: this.state.name,
			surname: this.state.surname,
			email: this.state.email,
			bio: this.state.bio,
		})

		if (response) {
			if (response.status) {
				this.setState({
					loading: false,
					isErrorVisible: true,
					username: '',
					name: '',
					surname: '',
					email: '',
					bio: '',
					usernameError: '',
					emailError: '',
				})
			} else {
				if (response.error === 'wrong_username') {
					screen.error('Kullanıcı adı sadece İngilizce karakterler, sayı, nokta, alt çizgi ve üst çizgi içerebilir.')
				} else if (response.error === 'email_in_use') {
					screen.error('Bu E-Posta adresi başka bir kullanıcı tarafından kullanılmaktadır.')
				} else if (response.error === 'some_empty') {
					screen.error('Bazı alanları doldurmamışsınız. Lütfen bilgilerinizi kontrol edip tekrar deneyiniz.')
				} else if (response.error === 'username_in_use') {
					screen.error('Bu kullanıcı adı başka bir kullanıcı tarafından kullanılmaktadır.')
				} else if (response.error === 'username_not_allowed') {
					screen.error('Bu kullanıcı adı kullanılamaz.')
				} else if (response.error === 'username_short') {
					screen.error('Kullanıcı adı 4 karakterden az olamaz.')
				} else if (response.error === 'wrong_email') {
					screen.error('Girdiğiniz E-Posta adresi doğru değil. Lütfen E-Posta adresinizi kontrol ediniz ve tekrar deneyiniz.')
				} else {
					screen.unknown_error(response.error)
				}
			}
		} else {
			screen.unknown_error()
		}
	}

	dismissError = () => {
		this.setState({ isErrorVisible: false })
	}

	render() {
		let { theme } = this.props
		return (
			<>
				{this.state.loading ? (
					<View style={{ flex: 1, backgroundColor: theme.colors.background, justifyContent: 'center', alignItems: 'center' }}>
						<ActivityIndicator size='large' color={theme.colors.main} />
					</View>
				) : (
					<>
						<Header title={'Profili Düzenle'} />
						<ScrollView
							style={[styles.container, { backgroundColor: theme.colors.surface }]}
							keyboardDismissMode='none'
							keyboardShouldPersistTaps='handled'
						>
							<View style={styles.centerContainer}>
								<Input
									placeholder='Kullanıcı Adı'
									leftIcon='tag'
									value={this.state.username}
									onChangeText={this._usernameChange}
									error={this.state.usernameError}
								/>
								<Input placeholder='İsim' leftIcon='user' value={this.state.name} onChangeText={this._nameChange} />
								<Input placeholder='Soyisim' leftIcon='users' value={this.state.surname} onChangeText={this._surnameChange} />
								<Input
									placeholder='E-Posta'
									leftIcon='at-sign'
									value={this.state.email}
									onChangeText={this._emailChange}
									error={this.state.emailError}
									email
								/>
								<Input placeholder='Bio' leftIcon='lock' multiline value={this.state.bio} onChangeText={this._bioChange} />
							</View>

							<View style={styles.bottomContainer}>
								<Button label='Profili Düzenle' loading={true} containerStyle={styles.buttonContainer} onPress={this._onLoginPress} />
							</View>

							<Portal>
								<Snackbar visible={this.state.isErrorVisible} onDismiss={this.dismissError}>
									<Text style={{ color: theme.colors.contrast }}>Profiliniz başarıyla güncellendi.</Text>
								</Snackbar>
							</Portal>
						</ScrollView>
					</>
				)}
			</>
		)
	}
}

export default withTheme(EditProfile)
