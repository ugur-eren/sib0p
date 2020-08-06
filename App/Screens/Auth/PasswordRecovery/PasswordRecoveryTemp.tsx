import React from 'react'
import { View, StyleSheet } from 'react-native'
import { withTheme } from 'react-native-paper'
import WebView from 'react-native-webview'
import Header from '../../../Components/Header/Header'
import Config from '../../../Includes/Config'
import Types from '../../../Includes/Types/Types'

interface Props {
	navigation: Types.Navigation
	theme: Types.Theme
}

interface State {}

class PasswordRecoveryTemp extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {}
	}

	render() {
		let { theme } = this.props
		return (
			<View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
				<Header title='Şifre Sıfırlama' />

				<WebView
					source={{ uri: Config.siteUri + '/mobile/login.php?q=rescue' }}
					style={{
						flex: 1,
					}}
				/>
			</View>
		)
	}
}

export default withTheme(PasswordRecoveryTemp)

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
})
