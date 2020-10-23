import React from 'react'
import { View, Dimensions, StyleProp, ImageStyle, ActivityIndicator } from 'react-native'
import { Text, withTheme } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler'
import RNVideo from 'react-native-video'
import Feather from 'react-native-vector-icons/Feather'
import Types from '../../Includes/Types/Types'
import PostTypes from '../../Includes/Types/PostTypes'
import styles from './styles'

interface Props {
	navigation: Types.Navigation
	theme: Types.Theme
	post: PostTypes.PostData
	style?: StyleProp<ImageStyle>
	muted: boolean
	width: number
	setVisibleRef: (ref: { setVisible: (visible: boolean) => void }) => void
}

interface State {
	renderVideo: boolean
	ready: boolean
	error: boolean
	isVisible: boolean
}

class Video extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			renderVideo: true,
			ready: false,
			error: false,
			isVisible: false,
		}

		props.setVisibleRef({ setVisible: this._setVisible })
	}

	_setVisible = (visible: boolean) => {
		if (this.state.isVisible !== visible) {
			this.setState({ isVisible: visible })
		}
	}

	private width = Dimensions.get('window').width

	_videoError = (err: any) => {
		if (err & err.error) {
			this.setState({ error: true })
		}
	}

	_videoReady = () => {
		this.setState({ ready: true })
	}

	_tryAgain = () => {
		this.setState({ renderVideo: false }, () => {
			this.setState({ renderVideo: true, ready: false, error: false })
		})
	}

	height = { height: this.props.width / this.props.post.ratio, aspectRatio: this.props.post.ratio }
	videoStyle = [this.props.style, this.height]
	videoSource = { uri: this.props.post.uri }

	render() {
		let screen = this.props.navigation.getScreenProps()
		let { theme } = this.props

		return (
			<>
				{this.state.renderVideo ? (
					<RNVideo
						source={this.videoSource}
						style={this.videoStyle}
						paused={!this.state.isVisible}
						repeat={true}
						muted={this.props.muted}
						poster={this.props.post.poster}
						resizeMode='contain'
						onReadyForDisplay={this._videoReady}
						onError={this._videoError}
						mixWithOthers='duck'
					/>
				) : (
					<></>
				)}

				{this.state.error ? (
					<View style={[styles.loader, { backgroundColor: 'rgba(' + theme.colors.surfaceRgb + ', .75)' }]}>
						<TouchableOpacity onPress={this._tryAgain} style={styles.errorTouchable}>
							<Text style={styles.errorText}>{screen.language.video_load_error}</Text>
						</TouchableOpacity>
					</View>
				) : !this.state.ready ? (
					<View style={[styles.loader, { backgroundColor: 'rgba(' + theme.colors.surfaceRgb + ', .75)' }]}>
						<ActivityIndicator size={36} color={theme.colors.main} />
					</View>
				) : (
					<></>
				)}

				{this.props.muted ? (
					<View style={styles.mutedContainer}>
						<Feather name='volume-x' size={24} color={'white'} style={styles.muted} />
					</View>
				) : (
					<></>
				)}
			</>
		)
	}
}

export default withTheme(Video)
