import React from 'react'
import { View } from 'react-native'
import { Text, Divider, withTheme } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler'
import PostContainer from '../PostContainer/PostContainer'
import TopProfile from '../TopProfile/TopProfile'
import PostTypes from '../../Includes/Types/PostTypes'
import Types from '../../Includes/Types/Types'
import LikeButton from '../../Components/LikeButton/LikeButton'
import styles from './styles'
import Functions from '../../Includes/Functions'

interface Props {
	navigation: Types.Navigation
	post: PostTypes.Post
	theme: Types.Theme
	isVisible: boolean
	currentTime: number
	noUser?: boolean
	noUserTouchable?: boolean
}

interface State {}

class Post extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {}
	}

	render() {
		let { post, theme } = this.props
		return (
			<View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
				{!this.props.noUser ? (
					<TopProfile
						user={{ username: post.user.username, profilePhoto: post.user.profilePhoto, time: Functions.convertTime(post.time, this.props.currentTime), isFollowed: post.user.isFollowed }}
						navigation={this.props.navigation}
						noUserTouchable={this.props.noUserTouchable}
					/>
				) : (
					<></>
				)}

				{post.description ? <Text style={styles.description}>{post.description}</Text> : <></>}

				{post.postData.length > 0 ? <PostContainer postData={post.postData} navigation={this.props.navigation} isVisible={this.props.isVisible} /> : <></>}

				<View style={styles.bottomContainer}>
					<View style={styles.buttons}>
						<LikeButton type='like' active={post.hasLiked} count={post.likesCount} onPress={() => {}} />
						<LikeButton type='dislike' active={post.hasDisliked} count={post.dislikesCount} onPress={() => {}} />
					</View>

					<View style={styles.commentsButton}>
						<TouchableOpacity
							onPress={() => {
								this.props.navigation.push('Comments', { comments: post.comments })
							}}
							style={styles.commentsButtonInner}
						>
							<Text>{post.commentsCount} Yorum</Text>
						</TouchableOpacity>
					</View>
				</View>

				{post.commentsCount > 0 ? (
					<>
						<Divider style={styles.bottomDivider} />
						<TouchableOpacity
							style={styles.commentsContainer}
							onPress={() => {
								this.props.navigation.push('Comments', { comments: post.comments })
							}}
						>
							<View style={styles.commentsInner}>
								{post.comments.map((comment, index) => (
									<View key={index} style={styles.comment}>
										<Text style={styles.commentAuthor}>{comment.user.username}</Text>
										<Text style={styles.commentText} numberOfLines={1}>
											{comment.content}
										</Text>
									</View>
								))}
							</View>
						</TouchableOpacity>
					</>
				) : (
					<></>
				)}
			</View>
		)
	}
}

export default withTheme(Post)
