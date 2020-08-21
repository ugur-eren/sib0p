import React, { useState, useRef } from 'react'
import { TouchableOpacity, ImageStyle, StyleProp, Animated, Easing } from 'react-native'
import { useTheme, withTheme } from 'react-native-paper'
import Feather from 'react-native-vector-icons/Feather'
import Video from './Video'
import Types from '../../Includes/Types/Types'
import PostTypes from '../../Includes/Types/PostTypes'
import Image from './Image'
import styles from './styles'

interface Props {
	navigation: Types.Navigation
	theme: Types.Theme
	post: PostTypes.PostData
	isVisible: boolean
	like: () => Promise<void>
	style?: StyleProp<ImageStyle>
}

interface State {
	muted: boolean
}

let doublePress: any = false

const AnimatedFeather = Animated.createAnimatedComponent(Feather)

class PostContent extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			muted: props.navigation.getScreenProps().getIsVideoMuted(),
		}
	}

	private likeAnim = new Animated.Value(0)

	onPress = () => {
		this.props.navigation.getScreenProps().setIsVideoMuted(!this.props.navigation.getScreenProps().getIsVideoMuted())
		this.setState({ muted: this.props.navigation.getScreenProps().getIsVideoMuted() })

		if (doublePress) {
			this.props.like()
			doublePress = false
			Animated.timing(this.likeAnim, {
				useNativeDriver: true,
				toValue: 1,
				duration: 500,
				easing: Easing.elastic(1.2),
			}).start((end) => {
				if (end) {
					Animated.timing(this.likeAnim, {
						useNativeDriver: true,
						toValue: 0,
						duration: 250,
						easing: Easing.elastic(1.2),
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

	render() {
		let { theme } = this.props

		return (
			<TouchableOpacity onPress={this.onPress}>
				{this.props.post.type === 'image' ? (
					<Image navigation={this.props.navigation} post={this.props.post} isVisible={this.props.isVisible} style={this.props.style} />
				) : this.props.post.type === 'video' ? (
					<Video
						muted={this.state.muted}
						navigation={this.props.navigation}
						post={this.props.post}
						isVisible={this.props.isVisible}
						style={this.props.style}
					/>
				) : (
					<></>
				)}

				<Animated.View
					style={[
						styles.likeAnim,
						{
							opacity: this.likeAnim,
							backgroundColor: 'rgba(' + theme.colors.surfaceRgb + ', .75)',
						},
					]}
				>
					<AnimatedFeather
						name='thumbs-up'
						size={64}
						color={theme.colors.success}
						style={{
							transform: [
								{
									rotate: this.likeAnim.interpolate({
										inputRange: [0, 1],
										outputRange: ['180deg', '0deg'],
									}),
								},
								{ scale: this.likeAnim },
							],
						}}
					/>
				</Animated.View>
			</TouchableOpacity>
		)
	}
}

export default withTheme(PostContent)
