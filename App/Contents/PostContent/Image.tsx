import React from 'react'
import { View, StyleProp, ImageStyle } from 'react-native'
import { withTheme } from 'react-native-paper'
import FastImage, { OnProgressEvent } from 'react-native-fast-image'
import { Circle as CircleProgress } from 'react-native-progress'
import Types from '../../Includes/Types/Types'
import PostTypes from '../../Includes/Types/PostTypes'
import styles from './styles'

interface Props {
	navigation: Types.Navigation
	theme: Types.Theme
	post: PostTypes.PostData
	width: number
	style?: StyleProp<ImageStyle>
	setVisibleRef: (ref: { setVisible: (visible: boolean) => void }) => void
}

interface State {
	imageProgress: number
}

class Image extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			imageProgress: 0,
		}

		props.setVisibleRef({ setVisible: this._setVisible })
	}

	_setVisible = () => {}

	_ImageLoading = (event: OnProgressEvent) => {
		if (event.nativeEvent.loaded / event.nativeEvent.total >= this.state.imageProgress + 0.2) {
			this.setState({ imageProgress: event.nativeEvent.loaded / event.nativeEvent.total })
		}
	}

	_formatImageLoadingText = () => {
		return Math.round(this.state.imageProgress * 100) + ' %'
	}

	_ImageLoadEnd = () => {
		this.setState({ imageProgress: 1 })
	}

	height = { height: this.props.width / this.props.post.ratio }
	imageStyle = [this.props.style, this.height]
	imageSource = { uri: this.props.post.uri }

	render() {
		let { theme } = this.props

		return (
			<View>
				<FastImage
					source={this.imageSource}
					style={this.imageStyle}
					onProgress={this._ImageLoading}
					onLoadEnd={this._ImageLoadEnd}
				/>
				{this.state.imageProgress == 1 ? (
					<></>
				) : (
					<View style={[styles.loader, { backgroundColor: 'rgba(' + theme.colors.surfaceRgb + ', .8)' }]}>
						<FastImage style={styles.loader} source={{ uri: this.props.post.thumbnail }} />
						<CircleProgress
							size={120}
							progress={this.state.imageProgress}
							color={theme.colors.main}
							formatText={this._formatImageLoadingText}
							showsText
							animated
						/>
					</View>
				)}
			</View>
		)
	}
}

export default withTheme(Image)
