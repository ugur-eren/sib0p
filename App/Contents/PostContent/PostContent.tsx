import React from 'react'
import { ImageStyle, StyleProp } from 'react-native'
import { withTheme } from 'react-native-paper'
import Types from '../../Includes/Types/Types'
import PostTypes from '../../Includes/Types/PostTypes'
import DoubleLike from './DoubleLike'
import Image from './Image'
import Video from './Video'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import styles from './styles'

interface Props {
	navigation: Types.Navigation
	theme: Types.Theme
	post: PostTypes.PostData
	like: () => Promise<void>
	width?: number
	style?: StyleProp<ImageStyle>
	setVisibleRef: (ref: { setVisible: (visible: boolean) => void }) => void
}

interface State {
	muted: boolean
}

class PostContent extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			muted: props.navigation.getScreenProps().getIsVideoMuted(),
		}
	}

	private likeRef: { onPress: () => void } = null

	onPress = () => {
		this.props.navigation.getScreenProps().setIsVideoMuted(!this.props.navigation.getScreenProps().getIsVideoMuted())
		this.setState({ muted: this.props.navigation.getScreenProps().getIsVideoMuted() })
		if (this.likeRef) this.likeRef.onPress()
	}

	_setLikeRef = (ref: any) => {
		this.likeRef = ref
	}

	render() {
		return (
			<TouchableWithoutFeedback style={styles.postContent} onPress={this.onPress}>
				<>
					{this.props.post.type === 'image' ? (
						<Image
							width={this.props.width}
							setVisibleRef={this.props.setVisibleRef}
							navigation={this.props.navigation}
							post={this.props.post}
							style={this.props.style}
						/>
					) : this.props.post.type === 'video' ? (
						<Video
							width={this.props.width}
							setVisibleRef={this.props.setVisibleRef}
							muted={this.state.muted}
							navigation={this.props.navigation}
							post={this.props.post}
							style={this.props.style}
						/>
					) : (
						<></>
					)}

					<DoubleLike like={this.props.like} likeRef={this._setLikeRef} />
				</>
			</TouchableWithoutFeedback>
		)
	}
}

export default withTheme(PostContent)
