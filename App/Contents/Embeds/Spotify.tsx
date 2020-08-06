import React from 'react'
import { Dimensions, Linking } from 'react-native'
import { Text, Portal, Snackbar, withTheme } from 'react-native-paper'
import { WebView, WebViewNavigation } from 'react-native-webview'
import Types from '../../Includes/Types/Types'

interface Props {
    theme: Types.Theme
	embedId: string
}

interface State {
	isErrorVisible: boolean
}

class Spotify extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			isErrorVisible: false,
		}
	}

	private webViewRef: any = null

	spotifyStateChange = async (event: WebViewNavigation) => {
		if (event.url.startsWith('spotify://')) {
			let supported = await Linking.canOpenURL(event.url)
			if (supported) {
				try {
					await Linking.openURL(event.url)
				} catch (e) {
					this.setState({ isErrorVisible: true })
				}
			} else {
				this.setState({ isErrorVisible: true })
			}
			this.webViewRef.goBack()
		}
	}

	setWebViewRef = (ref: any) => (this.webViewRef = ref)

	dismissError = () => {
		this.setState({ isErrorVisible: false })
	}

	render() {
		let { embedId, theme } = this.props
		return (
			<>
				<WebView
					ref={this.setWebViewRef}
					source={{ uri: 'https://open.spotify.com/embed/track/' + embedId }}
					javaScriptEnabled
					originWhitelist={['https://*', 'spotify://*']}
					style={{
						height: 80,
						width: Dimensions.get('window').width - 20,
					}}
					onNavigationStateChange={this.spotifyStateChange}
				/>
				<Portal>
					<Snackbar visible={this.state.isErrorVisible} onDismiss={this.dismissError}>
						<Text style={{ color: theme.colors.contrast }}>Bu bağlantıyı açacak bir uygulamanız bulunmamaktadır.</Text>
					</Snackbar>
				</Portal>
			</>
		)
	}
}

export default withTheme(Spotify)
