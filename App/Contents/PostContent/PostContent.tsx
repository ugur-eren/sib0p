import React from 'react'
import { Dimensions, ImageStyle, StyleProp } from 'react-native'
import { withTheme } from 'react-native-paper'
import FastImage from 'react-native-fast-image'
import Video from './Video'
import Types from '../../Includes/Types/Types'
import PostTypes from '../../Includes/Types/PostTypes'
import Image from './Image'

interface Props {
	navigation: Types.Navigation
	theme: Types.Theme
	post: PostTypes.PostData
	isVisible: boolean
	style?: StyleProp<ImageStyle>
}

interface State {}

class PostContent extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			imageProgress: 0,
		}
	}

	private width = Dimensions.get('window').width

	render() {
		let { post, isVisible, navigation, theme } = this.props

		if (post.type === 'image') {
			return <Image navigation={navigation} post={post} isVisible={isVisible} style={this.props.style} />
		}
		if (post.type === 'video') {
			return <Video navigation={navigation} post={post} isVisible={isVisible} style={this.props.style} />
		}
		if (post.type === 'poll') {
			return <></>
		}
	}
}

export default withTheme(PostContent)
