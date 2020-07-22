import React from 'react'
import { Dimensions, ImageStyle, StyleProp } from 'react-native'
import FastImage from 'react-native-fast-image'
import PostTypes from '../../Includes/Types/PostTypes'

interface Props {
	post: PostTypes.PostData
    style?: StyleProp<ImageStyle>
}

interface State {}

export default class PostContent extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {}
    }
    
    private width = Dimensions.get('window').width

	render() {
        let { post } = this.props

        if (post.type === 'image'){
            return (
                <FastImage source={{ uri: post.uri }} style={[this.props.style, {height: this.width / post.ratio}]} />
            )
        }
        if (post.type === 'video'){
            return (
                <FastImage source={{ uri: post.uri }} style={[this.props.style, {height: this.width / post.ratio}]} />
            )
        }
        if (post.type === 'poll'){
            return (
                <FastImage source={{ uri: post.uri }} style={[this.props.style, {height: this.width / post.ratio}]} />
            )
        }
	}
}