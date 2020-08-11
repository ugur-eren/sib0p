import React, { useState, useRef } from 'react'
import { TouchableOpacity, ImageStyle, StyleProp, Animated, Easing } from 'react-native'
import { useTheme } from 'react-native-paper'
import Feather from 'react-native-vector-icons/Feather'
import Video from './Video'
import Types from '../../Includes/Types/Types'
import PostTypes from '../../Includes/Types/PostTypes'
import Image from './Image'

interface Props {
	navigation: Types.Navigation
	post: PostTypes.PostData
	isVisible: boolean
	like: () => Promise<void>
	style?: StyleProp<ImageStyle>
}

let doublePress: any = false

const AnimatedFeather = Animated.createAnimatedComponent(Feather)

const PostContent = (props: Props) => {
	const likeAnim = useRef(new Animated.Value(0)).current
	const [muted, setMuted] = useState(props.navigation.getScreenProps().getIsVideoMuted())

	const onPress = () => {
		props.navigation.getScreenProps().setIsVideoMuted(!props.navigation.getScreenProps().getIsVideoMuted())
		setMuted(props.navigation.getScreenProps().getIsVideoMuted())

		if (doublePress) {
			props.like()
			doublePress = false
			Animated.timing(likeAnim, {
				useNativeDriver: true,
				toValue: 1,
				duration: 1000,
				easing: Easing.elastic(1.2)
			}).start((end) => {
				if (end) {
					Animated.timing(likeAnim, {
						useNativeDriver: true,
						toValue: 0,
						duration: 500,
						easing: Easing.elastic(1.2)
					}).start()
				}
			})
		} else {
			doublePress = true
			setTimeout(() => {
				doublePress = false
			}, 300)
		}
	}

	const theme: Types.Theme = useTheme() as any

	return (
		<TouchableOpacity onPress={onPress}>
			{props.post.type === 'image' ? (
				<Image navigation={props.navigation} post={props.post} isVisible={props.isVisible} style={props.style} />
			) : props.post.type === 'video' ? (
				<Video muted={muted} navigation={props.navigation} post={props.post} isVisible={props.isVisible} style={props.style} />
			) : (
				<></>
			)}

			<Animated.View
				style={{
					opacity: likeAnim,
					position: 'absolute',
					left: 0,
					top: 0,
					width: '100%',
					height: '100%',
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: 'rgba(' + theme.colors.surfaceRgb + ', .75)',
				}}
			>
				<AnimatedFeather
					name='thumbs-up'
					size={64}
					color={theme.colors.success}
					style={{
						transform: [
							{
								rotate: likeAnim.interpolate({
									inputRange: [0, 1],
									outputRange: ["180deg", "0deg"],
								}),
							},
							{ scale: likeAnim },
						],
					}}
				/>
			</Animated.View>
		</TouchableOpacity>
	)
}

export default React.memo(PostContent)
