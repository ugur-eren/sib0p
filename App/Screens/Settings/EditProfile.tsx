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
				} else if (response.error === 'too_fast_action') {
					screen.error(screen.language.too_fast_action)
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

	_onEditPress = async () => {
		let screen = this.props.navigation.getScreenProps()
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
					usernameError: '',
					emailError: '',
				})
			} else {
				if (response.error === 'wrong_username') {
					screen.error(screen.language.wrong_username)
				} else if (response.error === 'email_in_use') {
					screen.error(screen.language.email_in_use)
				} else if (response.error === 'some_empty') {
					screen.error(screen.language.some_empty)
				} else if (response.error === 'username_in_use') {
					screen.error(screen.language.username_in_use)
				} else if (response.error === 'username_not_allowed') {
					screen.error(screen.language.username_not_allowed)
				} else if (response.error === 'username_short') {
					screen.error(screen.language.username_less)
				} else if (response.error === 'wrong_email') {
					screen.error(screen.language.email_wrong)
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
		let screen = this.props.navigation.getScreenProps()
		return (
			<>
				{this.state.loading ? (
					<View style={{ flex: 1, backgroundColor: theme.colors.background, justifyContent: 'center', alignItems: 'center' }}>
						<ActivityIndicator size='large' color={theme.colors.main} />
					</View>
				) : (
					<>
						<Header title={screen.language.edit_profile} />
						<ScrollView
							style={[styles.container, { backgroundColor: theme.colors.surface }]}
							keyboardDismissMode='none'
							keyboardShouldPersistTaps='handled'
						>
							<View style={styles.centerContainer}>
								<Input
									placeholder={screen.language.username}
									leftIcon='tag'
									value={this.state.username}
									onChangeText={this._usernameChange}
									error={this.state.usernameError}
								/>
								<Input placeholder={screen.language.name} leftIcon='user' value={this.state.name} onChangeText={this._nameChange} />
								<Input
									placeholder={screen.language.surname}
									leftIcon='users'
									value={this.state.surname}
									onChangeText={this._surnameChange}
								/>
								<Input
									placeholder={screen.language.email}
									leftIcon='at-sign'
									value={this.state.email}
									onChangeText={this._emailChange}
									error={this.state.emailError}
									email
								/>
								<Input
									placeholder={screen.language.bio}
									leftIcon='lock'
									multiline
									value={this.state.bio}
									onChangeText={this._bioChange}
								/>
							</View>

							<View style={styles.bottomContainer}>
								<Button
									label={screen.language.edit_profile}
									loading={true}
									containerStyle={styles.buttonContainer}
									onPress={this._onEditPress}
								/>
							</View>

							<Portal>
								<Snackbar visible={this.state.isErrorVisible} onDismiss={this.dismissError}>
									<Text style={{ color: theme.colors.contrast }}>{screen.language.edit_profile_success}</Text>
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
