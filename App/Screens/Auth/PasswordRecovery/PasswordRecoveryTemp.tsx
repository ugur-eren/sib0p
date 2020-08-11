import React from 'react'
import { View, StyleSheet } from 'react-native'
import { withTheme } from 'react-native-paper'
import WebView from 'react-native-webview'
import Header from '../../../Components/Header/Header'
import Config from '../../../Includes/Config'
import Types from '../../../Includes/Types/Types'

interface Props {
	navigation: Types.Navigation<{
		uri?: string
		title?: string
	}>
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
				<Header title={this.props.navigation.getParam("title") || 'Şifre Sıfırlama'} />

				<WebView
					source={{ uri: this.props.navigation.getParam("uri") ? this.props.navigation.getParam("uri") : Config.siteUri + 'login.php?q=rescue' }}
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
