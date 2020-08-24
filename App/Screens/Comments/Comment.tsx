import React from 'react'
import { View } from 'react-native'
import { Text, withTheme } from 'react-native-paper'
import TopProfile from '../../Contents/TopProfile/TopProfile'
import LikeButton from '../../Components/LikeButton/LikeButton'
import Types from '../../Includes/Types/Types'
import CommentTypes from '../../Includes/Types/CommentTypes'
import { CommentStyles as styles } from './styles'
import Functions from '../../Includes/Functions'
import Api from '../../Includes/Api'

interface Props {
	navigation: Types.Navigation
	theme: Types.Theme
	comment: CommentTypes.Comment
	currentTime: number
	openModal: (comment: CommentTypes.Comment) => void
}

interface State {
	comment: CommentTypes.Comment
}

class Comment extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			comment: props.comment,
		}
	}

	likeComment = async () => {
		let screen = this.props.navigation.getScreenProps()

		let response = await Api.doAction({
			type: 'comment_like',
			token: screen.user.token,
			commentId: this.state.comment.id,
		})

		if (response) {
			if (response.status) {
				this.setState({
					comment: {
						...this.state.comment,
						likesCount: response.likesCount,
						dislikesCount: response.dislikesCount,
						hasLiked: response.hasLiked,
						hasDisliked: response.hasDisliked,
					},
				})
			} else {
				if (response.error === 'no_login') {
					screen.logout(true)
				} else if (response.error === 'too_fast_action') {
					screen.error(screen.language.too_fast_action)
				} else if (response.error === 'no_comment') {
					screen.error(screen.language.no_comment_error)
				} else {
					screen.unknown_error(response.error)
				}
			}
		} else {
			screen.unknown_error()
		}
	}

	dislikeComment = async () => {
		let screen = this.props.navigation.getScreenProps()

		let response = await Api.doAction({
			type: 'comment_dislike',
			token: screen.user.token,
			commentId: this.state.comment.id,
		})

		if (response) {
			if (response.status) {
				this.setState({
					comment: {
						...this.state.comment,
						likesCount: response.likesCount,
						dislikesCount: response.dislikesCount,
						hasLiked: response.hasLiked,
						hasDisliked: response.hasDisliked,
					},
				})
			} else {
				if (response.error === 'no_login') {
					screen.logout(true)
				} else if (response.error === 'too_fast_action') {
					screen.error(screen.language.too_fast_action)
				} else if (response.error === 'no_comment') {
					screen.error(screen.language.no_comment_error)
				} else {
					screen.unknown_error(response.error)
				}
			}
		} else {
			screen.unknown_error()
		}
	}

	openModal = () => {
		this.props.openModal(this.state.comment)
	}

	render() {
		let { navigation, theme } = this.props
		let { comment } = this.state
		let screen = this.props.navigation.getScreenProps()
		return (
			<View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
				<TopProfile
					user={comment.user}
					time={Functions.convertTime(comment.time, this.props.currentTime, screen.language)}
					navigation={navigation}
					openModal={comment.isMine ? this.openModal : undefined}
					small
				/>

				<Text style={styles.content}>{Functions.replaceTags(comment.content, navigation, true)}</Text>

				<View style={styles.buttonsContainer}>
					<LikeButton
						type='like'
						active={comment.hasLiked}
						count={comment.likesCount}
						onPress={this.likeComment}
						containerStyle={styles.likeButton}
						small
					/>
					<LikeButton
						type='dislike'
						active={comment.hasDisliked}
						count={comment.dislikesCount}
						onPress={this.dislikeComment}
						containerStyle={styles.likeButton}
						small
					/>
				</View>
			</View>
		)
	}
}

export default withTheme(Comment)
