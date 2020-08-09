import React from 'react'
import { ImageStyle, StyleProp } from 'react-native'
import Video from './Video'
import Types from '../../Includes/Types/Types'
import PostTypes from '../../Includes/Types/PostTypes'
import Image from './Image'

interface Props {
	navigation: Types.Navigation
	post: PostTypes.PostData
	isVisible: boolean
	style?: StyleProp<ImageStyle>
}

const PostContent = (props: Props) => {
	if (props.post.type === 'image') {
		return <Image navigation={props.navigation} post={props.post} isVisible={props.isVisible} style={props.style} />
	}
	if (props.post.type === 'video') {
		return <Video navigation={props.navigation} post={props.post} isVisible={props.isVisible} style={props.style} />
	}
	if (props.post.type === 'poll') {
		return <></>
	}
}

export default React.memo(PostContent)
