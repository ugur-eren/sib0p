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

interface State {}

class Register extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {}
	}

	onLoginPress = () => {}

	navigateToPasswordRecovery = () => {}

	navigateToRegister = () => {
		this.props.navigation.navigate('Register')
	}

	render() {
		let { theme } = this.props
		return (
			<ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]} keyboardDismissMode='none' keyboardShouldPersistTaps='handled'>
				<View style={[styles.topContainer, { backgroundColor: theme.colors.surface }]}>
					<FastImage source={require('../../../Assets/Images/logo-wide.png')} style={styles.topLogo} resizeMode='contain' />
					<Text style={[styles.topSubtitle, { color: theme.colors.contrast }]}>Kayıt Ol</Text>
				</View>

				<View style={styles.centerContainer}>
					<Input placeholder='Username' rightIcon='tag' />
					<Input placeholder='Name' rightIcon='user' />
					<Input placeholder='Surname' rightIcon='user' />
					<Input placeholder='Email' rightIcon='at-sign' email />
					<Input placeholder='Password' rightIcon='lock' password />
					<Input placeholder='Password Check' rightIcon='lock' password />

					<View style={{ flexDirection: 'row', marginBottom: 21 }}>
						<Image
							source={{ uri: `https://sib0p.com/inc/captcha.php?random=${Math.random().toString(36).substring(7)}` }}
							style={{
								height: 50,
								width: 50 * 2.07792208,
								marginRight: 10,
							}}
							resizeMode='contain'
						/>
						<Input containerStyle={{ flex: 1, marginBottom: 0 }} placeholder='Captcha' rightIcon='key' number />
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
