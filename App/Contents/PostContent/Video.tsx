import React from 'react'
import { View, Dimensions, StyleProp, ImageStyle } from 'react-native'
import { Text, withTheme } from 'react-native-paper'
import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native-gesture-handler'
import RNVideo from 'react-native-video'
import Feather from 'react-native-vector-icons/Feather'
import ActivityIndicator from '../../Components/ActivityIndicator/ActivityIndicator'
import Types from '../../Includes/Types/Types'
import PostTypes from '../../Includes/Types/PostTypes'
import styles from './styles'

interface Props {
	theme: Types.Theme
	navigation: Types.Navigation
	post: PostTypes.PostData
	isVisible: boolean
	style?: StyleProp<ImageStyle>
}

interface State {
	renderVideo: boolean
	ready: boolean
	error: boolean
	muted: boolean
}

class Video extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			renderVideo: true,
			ready: false,
			error: false,
			muted: props.navigation.getScreenProps().getIsVideoMuted(),
		}
	}

	private width = Dimensions.get('window').width

	toggleMuteVideo = () => {
		this.props.navigation.getScreenProps().setIsVideoMuted(!this.props.navigation.getScreenProps().getIsVideoMuted())
		this.setState({ muted: this.props.navigation.getScreenProps().getIsVideoMuted() })
	}

	videoError = (err) => {
		if (err & err.error) {
			this.setState({ error: true })
		}
	}

	videoReady = () => {
		this.setState({ ready: true })
	}

	tryAgain = () => {
		this.setState({ renderVideo: false }, () => {
			this.setState({ renderVideo: true, ready: false, error: false })
		})
	}

	render() {
		let { post, theme } = this.props

		if (post.uri === 'http://192.168.1.26/inc/vids/1596923006-1048-96-1.mp4'){
			console.log(this.props.isVisible, this.state.ready)
		}

		return (
			<TouchableWithoutFeedback onPress={this.toggleMuteVideo}>
				{this.state.renderVideo ? (
					<RNVideo
						source={{ uri: post.uri }}
						style={[this.props.style, { height: this.width / post.ratio, aspectRatio: post.ratio }]}
						paused={!this.props.isVisible}
						repeat={true}
						muted={this.state.muted}
						poster={post.poster}
						resizeMode='contain'
						onReadyForDisplay={this.videoReady}
						onError={this.videoError}
					/>
				) : (
					<></>
				)}
				{this.state.ready && !this.state.error ? (
					<></>
				) : (
					<View style={[styles.loader, { backgroundColor: 'rgba(' + theme.colors.surfaceRgb + ', .75)' }]}>
						<ActivityIndicator size={36} />
					</View>
				)}
				{this.state.error ? (
					<TouchableOpacity
						onPress={this.tryAgain}
						style={[styles.loader, { backgroundColor: 'rgba(' + theme.colors.surfaceRgb + ', .75)' }]}
					>
						<Text>Video yüklenemedi. Tekrar denemek için dokunun.</Text>
					</TouchableOpacity>
				) : (
					<></>
				)}
				{this.state.muted ? (
					<View style={styles.mutedContainer}>
						<Feather name='volume-x' size={24} color={'white'} style={styles.muted} />
					</View>
				) : (
					<></>
				)}
			</TouchableWithoutFeedback>
		)
	}
}

export default withTheme(Video)
