import React from 'react'
import { View, TextInput as RNTextInput, Platform, UIManager, LayoutAnimation } from 'react-native'
import { withTheme, Text, Portal, Snackbar } from 'react-native-paper'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Button from '../../../Components/Button/Button'
import Input from '../../../Components/Input/Input'
import Types from '../../../Includes/Types/Types'
import styles from './styles'
import FastImage from 'react-native-fast-image'

interface Props {
	navigation: Types.Navigation<{
		email: string
	}>
	theme: Types.Theme
}

interface State {
	code: string
	email: string
}

class InputContainerComp extends React.PureComponent<{
	theme: Types.Theme
	code: string
	onCodeChange: (text: string) => void
}> {
	render() {
		let { theme, code } = this.props
		return (
			<>
				<View style={styles.inputsContainer}>
					<View style={styles.inputsInner}>
						{Array.apply(10, Array(6)).map((i, k) => {
							return (
								<View key={k} style={styles.inputsCircles}>
									<View
										style={{
											height: code.length > k ? 25 : 20,
											width: code.length > k ? 25 : 20,
											borderRadius: 25,
											backgroundColor: code.length > k ? theme.colors.main : theme.dark ? '#606060' : '#DBDBDB',
										}}
									></View>
								</View>
							)
						})}
					</View>
				</View>

				<RNTextInput
					style={styles.inputsInput}
					value={code}
					keyboardType='number-pad'
					onChangeText={this.props.onCodeChange}
					caretHidden={true}
					keyboardAppearance={theme.dark ? 'dark' : 'default'}
				/>
			</>
		)
	}
}
const InputContainer = withTheme(InputContainerComp)

class PasswordRecoverySecond extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		if (Platform.OS === 'android') {
			UIManager.setLayoutAnimationEnabledExperimental(true)
		}

		this.state = {
			code: '',
			email: this.props.navigation.getParam('email'),
		}
	}

	onCodeChange = (text: string) => {
		LayoutAnimation.configureNext(LayoutAnimation.create(150, 'easeInEaseOut', 'opacity'))
		this.setState({ code: text.slice(0, 6) })
	}

	onResetPress = () => {
		this.props.navigation.navigate('PasswordRecoveryThird')
	}

	navigateToLogin = () => {
		this.props.navigation.navigate('Login')
	}

	onSnackbarDismiss = () => {
		this.setState({ email: '' })
	}

	render() {
		let { theme } = this.props
		return (
			<Portal>
				<ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]} keyboardDismissMode='none' keyboardShouldPersistTaps='handled'>
					<View style={[styles.topContainer, { backgroundColor: theme.colors.surface }]}>
						<FastImage source={require('../../../Assets/Images/logo-wide.png')} style={styles.topLogo} resizeMode='contain' />
						<Text style={[styles.topSubtitle, { color: theme.colors.contrast }]}>Şifre Sıfırlama</Text>
					</View>

					<View style={[styles.centerContainer, { position: 'relative', alignItems: 'center' }]}>
						<Text style={{ textAlign: 'center' }}>E-Posta adresinize gönderilen şifre sıfırlama kodunu giriniz</Text>
						<InputContainer code={this.state.code} onCodeChange={this.onCodeChange} />
					</View>

					<View style={styles.bottomContainer}>
						<Button label='Reset Password' loading={true} containerStyle={styles.buttonContainer} onPress={this.onResetPress} />
						<TouchableOpacity onPress={this.navigateToLogin}>
							<Text style={[styles.bottomText, { color: theme.colors.contrast }]}>
								Do you have an account? <Text style={{ color: theme.colors.main }}>{'\n\n'}Login</Text>
							</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>

				<Snackbar visible={!!this.state.email} onDismiss={this.onSnackbarDismiss}>
					<Text style={{ color: theme.colors.contrast }}>Şifre sıfırlama kodu, {this.state.email} E-Posta adresine gönderildi.</Text>
				</Snackbar>
			</Portal>
		)
	}
}

export default withTheme(PasswordRecoverySecond)
