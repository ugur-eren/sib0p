import React from 'react'
import { View } from 'react-native'
import { Text, withTheme } from 'react-native-paper'
import TopProfile from '../../Contents/TopProfile/TopProfile'
import LikeButton from '../../Components/LikeButton/LikeButton'
import Types from '../../Includes/Types/Types'
import CommentTypes from '../../Includes/Types/CommentTypes'
import {CommentStyles as styles} from './styles'
import Functions from '../../Includes/Functions'

interface Props {
    navigation: Types.Navigation
    theme: Types.Theme
	comment: CommentTypes.Comment
	currentTime: number
}

interface State {}

class Comment extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {}
	}

	render() {
		let { comment, navigation } = this.props
		return (
			<View style={styles.container}>
				<TopProfile user={{ username: comment.user.username, profilePhoto: comment.user.profilePhoto, time: Functions.convertTime(comment.time, this.props.currentTime), isFollowed: comment.user.isFollowed }} navigation={navigation} />

				<Text style={styles.content}>{Functions.replaceUserTagWithPage(comment.content, navigation)}</Text>

				<View style={styles.buttonsContainer}>
					<LikeButton type='like' active={comment.hasLiked} count={comment.likesCount} onPress={() => {}} containerStyle={styles.likeButton} />
					<LikeButton type='dislike' active={comment.hasDisliked} count={comment.dislikesCount} onPress={() => {}} containerStyle={styles.likeButton} />
				</View>
			</View>
		)
	}
}

export default withTheme(Comment)
