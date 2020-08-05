import React from 'react'
import { Dimensions } from 'react-native'
import { WebView } from 'react-native-webview'

interface Props {
	embedId: string
	isComment?: boolean
}

export default class Youtube extends React.PureComponent<Props> {
	render() {
		let { embedId, isComment } = this.props
		return (
			<WebView
				source={{ uri: 'https://www.youtube.com/embed/' + embedId }}
				javaScriptEnabled
				originWhitelist={['https://*']}
				style={{
					height: isComment ? Dimensions.get('window').width / (24 / 9) : Dimensions.get('window').width / (16 / 9),
					width: Dimensions.get('window').width - 20,
				}}
			/>
		)
	}
}
