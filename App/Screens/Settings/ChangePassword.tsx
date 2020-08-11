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
		if (!this.state.oldPassword) {
			return this.setState({ oldPasswordError: 'Eski şifreniz boş olamaz.' })
		}

		if (!this.state.newPassword) {
			return this.setState({ newPasswordError: 'Yeni şifreniz boş olamaz.' })
		}
		if (this.state.newPassword.length < 4) {
			return this.setState({ newPasswordError: 'Yeni şifreniz 4 karakterden az olamaz.' })
		}

		if (this.state.newPassword !== this.state.passwordCheck) {
			return this.setState({ newPasswordError: 'Şifreleriniz eşleşmemektedir.', passwordCheckError: 'Şifreleriniz eşleşmemektedir.' })
		}

		let screen = this.props.navigation.getScreenProps()
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
					screen.error('Bazı alanları doldurmamışsınız. Lütfen bilgilerinizi kontrol edip tekrar deneyiniz.')
				} else if (response.error === 'wrong_password') {
					screen.error('Şifreniz yanlış.')
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
				<Header title={'Profili Düzenle'} />
				<ScrollView
					style={[styles.container, { backgroundColor: theme.colors.surface }]}
					keyboardDismissMode='none'
					keyboardShouldPersistTaps='handled'
				>
					<View style={styles.centerContainer}>
						<Input
							placeholder='Eski Şifre'
							leftIcon='lock'
							password
							value={this.state.oldPassword}
							onChangeText={this._oldPasswordChange}
							error={this.state.oldPasswordError}
						/>

						<Input
							placeholder='Yeni Şifre'
							leftIcon='lock'
							password
							value={this.state.newPassword}
							onChangeText={this._newPasswordChange}
							error={this.state.newPasswordError}
						/>

						<Input
							placeholder='Şifre Tekrar'
							leftIcon='lock'
							password
							value={this.state.passwordCheck}
							onChangeText={this._passwordCheckChange}
							error={this.state.passwordCheckError}
						/>
					</View>

					<View style={styles.bottomContainer}>
						<Button label='Şifre Değiştir' loading={true} containerStyle={styles.buttonContainer} onPress={this._onLoginPress} />
					</View>

					<Portal>
						<Snackbar visible={this.state.isErrorVisible} onDismiss={this.dismissError}>
							<Text style={{ color: theme.colors.contrast }}>Şifreniz başarıyla güncellendi.</Text>
						</Snackbar>
					</Portal>
				</ScrollView>
			</>
		)
	}
}

export default withTheme(ChangePassword)
