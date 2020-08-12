import React from 'react'
import { ScrollView, View } from 'react-native'
import { Text, withTheme, Portal, Snackbar } from 'react-native-paper'
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
	isErrorVisible: boolean
	oldPassword: string
	newPassword: string
	passwordCheck: string
	oldPasswordError: string
	newPasswordError: string
	passwordCheckError: string
}

class ChangePassword extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			isErrorVisible: false,
			oldPassword: '',
			newPassword: '',
			passwordCheck: '',
			oldPasswordError: '',
			newPasswordError: '',
			passwordCheckError: '',
		}
	}

	_oldPasswordChange = (text: string) => {
		this.setState({ oldPassword: text })
	}
	_newPasswordChange = (text: string) => {
		this.setState({ newPassword: text })
	}
	_passwordCheckChange = (text: string) => {
		this.setState({ passwordCheck: text })
	}

	_onLoginPress = async () => {
		let screen = this.props.navigation.getScreenProps()
		if (!this.state.oldPassword) {
			return this.setState({ oldPasswordError: screen.language.old_password_empty })
		}

		if (!this.state.newPassword) {
			return this.setState({ newPasswordError: screen.language.new_password_empty })
		}
		if (this.state.newPassword.length < 5) {
			return this.setState({ newPasswordError: screen.language.new_password_less })
		}

		if (this.state.newPassword !== this.state.passwordCheck) {
			return this.setState({ newPasswordError: screen.language.password_not_match, passwordCheckError: screen.language.password_not_match })
		}

		let response = await Api.changePassword({
			token: screen.user.token,
			old_password: this.state.oldPassword,
			new_password: this.state.newPassword,
		})

		if (response) {
			if (response.status) {
				this.setState({
					isErrorVisible: true,
					passwordCheckError: '',
					newPasswordError: '',
					oldPasswordError: '',
					newPassword: '',
					oldPassword: '',
					passwordCheck: '',
				})
			} else {
				if (response.error === 'some_empty') {
					screen.error(screen.language.some_empty)
				} else if (response.error === 'wrong_password') {
					screen.error(screen.language.wrong_password)
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
				<Header title={screen.language.change_password} />
				<ScrollView
					style={[styles.container, { backgroundColor: theme.colors.surface }]}
					keyboardDismissMode='none'
					keyboardShouldPersistTaps='handled'
				>
					<View style={styles.centerContainer}>
						<Input
							placeholder={screen.language.old_password}
							leftIcon='lock'
							password
							value={this.state.oldPassword}
							onChangeText={this._oldPasswordChange}
							error={this.state.oldPasswordError}
						/>

						<Input
							placeholder={screen.language.new_password}
							leftIcon='lock'
							password
							value={this.state.newPassword}
							onChangeText={this._newPasswordChange}
							error={this.state.newPasswordError}
						/>

						<Input
							placeholder={screen.language.new_password_again}
							leftIcon='lock'
							password
							value={this.state.passwordCheck}
							onChangeText={this._passwordCheckChange}
							error={this.state.passwordCheckError}
						/>
					</View>

					<View style={styles.bottomContainer}>
						<Button
							label={screen.language.change_password}
							loading={true}
							containerStyle={styles.buttonContainer}
							onPress={this._onLoginPress}
						/>
					</View>

					<Portal>
						<Snackbar visible={this.state.isErrorVisible} onDismiss={this.dismissError}>
							<Text style={{ color: theme.colors.contrast }}>{screen.language.change_password_success}</Text>
						</Snackbar>
					</Portal>
				</ScrollView>
			</>
		)
	}
}

export default withTheme(ChangePassword)
