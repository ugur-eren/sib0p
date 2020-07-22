import React from 'react'
import { View } from 'react-native'
import { withTheme, Text } from 'react-native-paper'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Button from '../../../Components/Button/Button'
import Input from '../../../Components/Input/Input'
import Types from '../../../Includes/Types/Types'
import styles from './styles'
import FastImage from 'react-native-fast-image'

interface Props {
	navigation: Types.Navigation
	theme: Types.Theme
}

interface State {}

class Login extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {}
	}

	onLoginPress = () => {}

	navigateToPasswordRecovery = () => {
		this.props.navigation.navigate('PasswordRecovery')
	}

	navigateToRegister = () => {
		this.props.navigation.navigate('Register')
	}

	render() {
		let { theme } = this.props
		return (
			<ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]} keyboardDismissMode='none' keyboardShouldPersistTaps='handled'>
				<View style={[styles.topContainer, { backgroundColor: theme.colors.surface }]}>
					<FastImage source={require('../../../Assets/Images/logo-wide.png')} style={styles.topLogo} resizeMode='contain' />
					<Text style={[styles.topSubtitle, { color: theme.colors.contrast }]}>Giriş Yap</Text>
				</View>

				<View style={styles.centerContainer}>
					<Input placeholder='User Name' rightIcon='user' />
					<Input placeholder='Password' rightIcon='lock' password />

					<TouchableOpacity onPress={this.navigateToPasswordRecovery}>
						<Text style={[styles.centerText, { color: theme.colors.contrast }]}>Forgot your password?</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.bottomContainer}>
					<Button label='Login' loading={true} containerStyle={styles.buttonContainer} onPress={this.onLoginPress} />
					<TouchableOpacity onPress={this.navigateToRegister}>
						<Text style={[styles.bottomText, { color: theme.colors.contrast }]}>
							Don't have an account? <Text style={{ color: theme.colors.main }}>{'\n\n'}Register</Text>
						</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		)
	}
}

export default withTheme(Login)
