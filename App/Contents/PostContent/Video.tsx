import React, { useState } from 'react'
import { View, Dimensions, StyleProp, ImageStyle } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native-gesture-handler'
import RNVideo from 'react-native-video'
import Feather from 'react-native-vector-icons/Feather'
import ActivityIndicator from '../../Components/ActivityIndicator/ActivityIndicator'
import Types from '../../Includes/Types/Types'
import PostTypes from '../../Includes/Types/PostTypes'
import styles from './styles'

interface Props {
	navigation: Types.Navigation
	post: PostTypes.PostData
	isVisible: boolean
	style?: StyleProp<ImageStyle>
}

const Video = (props: Props) => {
	const theme: Types.Theme = useTheme() as any
	const [renderVideo, setRenderVideo] = useState(true)
	const [ready, setReady] = useState(false)
	const [error, setError] = useState(false)
	const [muted, setMuted] = useState(props.navigation.getScreenProps().getIsVideoMuted())

	const width = Dimensions.get('window').width

	const _toggleMuteVideo = () => {
		props.navigation.getScreenProps().setIsVideoMuted(!props.navigation.getScreenProps().getIsVideoMuted())
		setMuted(props.navigation.getScreenProps().getIsVideoMuted())
	}

	const _videoError = (err: any) => {
		if (err & err.error) {
			setError(true)
		}
	}

	const _videoReady = () => {
		setReady(true)
	}

	const _tryAgain = () => {
		setRenderVideo(false)
		setRenderVideo(true)
		setReady(false)
		setError(false)
	}

	return (
		<TouchableWithoutFeedback onPress={_toggleMuteVideo}>
			{renderVideo ? (
				<RNVideo
					source={{ uri: props.post.uri }}
					style={[props.style, { height: width / props.post.ratio, aspectRatio: props.post.ratio }]}
					paused={!props.isVisible}
					repeat={true}
					muted={muted}
					poster={props.post.poster}
					resizeMode='contain'
					onReadyForDisplay={_videoReady}
					onError={_videoError}
				/>
			) : (
				<></>
			)}

			{error ? (
				<View style={[styles.loader, { backgroundColor: 'rgba(' + theme.colors.surfaceRgb + ', .75)' }]}>
					<TouchableOpacity onPress={_tryAgain} style={styles.errorTouchable}>
						<Text style={styles.errorText}>Video yüklenemedi{'\n'}Tekrar denemek için dokunun</Text>
					</TouchableOpacity>
				</View>
			) : !ready ? (
				<View style={[styles.loader, { backgroundColor: 'rgba(' + theme.colors.surfaceRgb + ', .75)' }]}>
					<ActivityIndicator size={36} />
				</View>
			) : (
				<></>
			)}

			{muted ? (
				<View style={styles.mutedContainer}>
					<Feather name='volume-x' size={24} color={'white'} style={styles.muted} />
				</View>
			) : (
				<></>
			)}
		</TouchableWithoutFeedback>
	)
}

export default React.memo(Video)
