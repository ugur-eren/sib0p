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

class PasswordRecoveryFirst extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {}
	}

	onResetPress = () => {
        this.props.navigation.navigate('PasswordRecoverySecond', {email: 'con***@ugu***'})
    }

	navigateToLogin = () => {
		this.props.navigation.navigate('Login')
	}

	render() {
		let { theme } = this.props
		return (
			<ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]} keyboardDismissMode='none' keyboardShouldPersistTaps='handled'>
				<View style={[styles.topContainer, { backgroundColor: theme.colors.surface }]}>
					<FastImage source={require('../../../Assets/Images/logo-wide.png')} style={styles.topLogo} resizeMode='contain' />
					<Text style={[styles.topSubtitle, { color: theme.colors.contrast }]}>Şifre Sıfırlama</Text>
				</View>

				<View style={styles.centerContainer}>
					<Input placeholder='Username' rightIcon='user' />
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
		)
	}
}

export default withTheme(PasswordRecoveryFirst)
