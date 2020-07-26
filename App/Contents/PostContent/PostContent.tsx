import React from 'react'
import { Dimensions, View, ImageStyle, StyleProp } from 'react-native'
import { withTheme } from 'react-native-paper'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import FastImage, { OnProgressEvent, OnLoadEvent } from 'react-native-fast-image'
import Video from 'react-native-video'
import { Circle as CircleProgress } from 'react-native-progress'
import Types from '../../Includes/Types/Types'
import PostTypes from '../../Includes/Types/PostTypes'
import Post from '../Post/Post'

interface Props {
	navigation: Types.Navigation
	theme: Types.Theme
	post: PostTypes.PostData
	isVisible: boolean
	style?: StyleProp<ImageStyle>
}

interface State {
	muted: boolean
	imageProgress: number
}

class PostContent extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			muted: props.navigation.getScreenProps().getIsVideoMuted(),
			imageProgress: 0,
		}
	}

	private width = Dimensions.get('window').width

	toggleMuteVideo = () => {
		this.props.navigation.getScreenProps().setIsVideoMuted(!this.props.navigation.getScreenProps().getIsVideoMuted())
		this.setState({ muted: !this.props.navigation.getScreenProps().getIsVideoMuted() })
	}

	_ImageLoading = (event: OnProgressEvent) => {
		console.log('progress', event.nativeEvent.loaded / event.nativeEvent.total)
		if (event.nativeEvent.loaded / event.nativeEvent.total > this.state.imageProgress + 0.15) {
			console.log('trueee')
			this.setState({ imageProgress: event.nativeEvent.loaded / event.nativeEvent.total })
		}
	}

	_formatImageLoadingText = () => {
		return Math.round(this.state.imageProgress * 100) + ' %'
	}

	_ImageLoadEnd = () => {
		this.setState({ imageProgress: 1 })
	}

	render() {
		let { post, theme } = this.props

		if (post.type === 'image') {
			return (
				<View>
					<FastImage
						source={{ uri: post.uri + '?a=5878' }}
						style={[this.props.style, { height: this.width / post.ratio }]}
						onProgress={this._ImageLoading}
						onLoadEnd={this._ImageLoadEnd}
					/>
					{this.state.imageProgress == 1 ? (
						<></>
					) : (
						<View
							style={{
								backgroundColor: 'rgba(' + theme.colors.surfaceRgb + ', .8)',
								position: 'absolute',
								left: 0,
								top: 0,
								width: '100%',
								height: '100%',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<CircleProgress size={120} progress={this.state.imageProgress} color={theme.colors.main} showsText formatText={this._formatImageLoadingText} />
						</View>
					)}
				</View>
			)
		}
		if (post.type === 'video') {
			return (
				<TouchableWithoutFeedback onPress={this.toggleMuteVideo}>
					<Video
						source={{ uri: post.uri }}
						style={[this.props.style, { height: this.width / post.ratio, aspectRatio: post.ratio }]}
						paused={!this.props.isVisible}
						repeat={true}
						resizeMode='contain'
					/>
					{this.state.muted ? <View style={{ backgroundColor: 'red', width: 100, height: 100 }}></View> : <></>}
				</TouchableWithoutFeedback>
			)
		}
		if (post.type === 'poll') {
			return <FastImage source={{ uri: post.uri }} style={[this.props.style, { height: this.width / post.ratio }]} />
		}
	}
}

export default withTheme(PostContent)
