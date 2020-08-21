import React, { useState, useEffect } from 'react'
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
	navigation: Types.Navigation
	theme: Types.Theme
	post: PostTypes.PostData
	isVisible: boolean
	style?: StyleProp<ImageStyle>
	muted: boolean
}

interface State {
	renderVideo: boolean
	ready: boolean
	error: boolean
}

class Video extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			renderVideo: true,
			ready: false,
			error: false,
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

	render() {
		let screen = this.props.navigation.getScreenProps()
		let { theme } = this.props

		return (
			<>
				{this.state.renderVideo ? (
					<RNVideo
						source={{ uri: this.props.post.uri }}
						style={[this.props.style, { height: this.width / this.props.post.ratio, aspectRatio: this.props.post.ratio }]}
						paused={!this.props.isVisible}
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
						<ActivityIndicator size={36} />
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
