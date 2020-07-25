import React from 'react'
import { View } from 'react-native'
import { TouchableRipple, withTheme } from 'react-native-paper'
import CameraRoll from '@react-native-community/cameraroll'
import FastImage from 'react-native-fast-image'
import Feather from 'react-native-vector-icons/Feather'
import Types from '../../Includes/Types/Types'
import styles from './styles'

interface Props {
	theme: Types.Theme
	video: CameraRoll.PhotoIdentifier
	onVideoPress: (image: CameraRoll.PhotoIdentifier) => void
}

interface State {}

class Video extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {}
	}

	_onImagePress = () => {
		this.props.onVideoPress(this.props.video)
	}

	render() {
		let { video, theme } = this.props

		return (
			<TouchableRipple onPress={this._onImagePress} style={{ width: '100%', backgroundColor: theme.colors.surface }}>
				<>
					<View style={{ paddingBottom: '100%' }} />
					<FastImage source={{ uri: video.node.image.uri }} style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }} />
					<Feather
						name='video'
						color='white'
						size={18}
						style={{
							position: 'absolute',
							left: 5,
							top: 5,
							textShadowColor: 'rgba(0, 0, 0, 1)',
							textShadowOffset: { width: 0, height: 0 },
							textShadowRadius: 10,
						}}
					/>
				</>
			</TouchableRipple>
		)
	}
}

export default withTheme(Video)
