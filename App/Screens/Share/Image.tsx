import React from 'react'
import { View } from 'react-native'
import { TouchableRipple, withTheme } from 'react-native-paper'
import CameraRoll from '@react-native-community/cameraroll'
import FastImage from 'react-native-fast-image'
import Types from '../../Includes/Types/Types'
import styles from './styles'

interface Props {
	theme: Types.Theme
	image: CameraRoll.PhotoIdentifier
	onImagePress: (image: CameraRoll.PhotoIdentifier) => void
}

interface State {}

class Image extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {}
	}

	_onImagePress = () => {
		this.props.onImagePress(this.props.image)
	}

	render() {
		let { image, theme } = this.props

		return (
			<TouchableRipple onPress={this._onImagePress} style={{ width: '100%', backgroundColor: theme.colors.surface }}>
				<>
					<View style={{ paddingBottom: '100%' }} />
					<FastImage source={{ uri: image.node.image.uri }} style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }} />
				</>
			</TouchableRipple>
		)
	}
}

export default withTheme(Image)
