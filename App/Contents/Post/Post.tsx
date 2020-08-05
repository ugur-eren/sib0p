import React from 'react'
import { View } from 'react-native'
import { WebView } from 'react-native-webview'
import { Text, Divider, withTheme } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler'
import PostContainer from '../PostContainer/PostContainer'
import TopProfile from '../TopProfile/TopProfile'
import PostTypes from '../../Includes/Types/PostTypes'
import Types from '../../Includes/Types/Types'
import LikeButton from '../../Components/LikeButton/LikeButton'
import styles from './styles'
import Functions from '../../Includes/Functions'
import FeaturedComments from '../FeaturedComments/FeaturedComments'

interface Props {
	navigation: Types.Navigation
	post: PostTypes.Post
	theme: Types.Theme
	isVisible: boolean
	currentTime: number
	openModal: (post: PostTypes.Post) => void
	noUser?: boolean
	noUserTouchable?: boolean
	commentsVisible?: boolean
}

interface State {}

class Post extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {}
	}

	render() {
		let { post, theme, navigation } = this.props
		return (
			<View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
				{!this.props.noUser ? (
					<TopProfile
						user={{
							username: post.user.username,
							profilePhoto: post.user.profilePhoto,
							time: Functions.convertTime(post.time, this.props.currentTime),
							isFollowed: post.user.isFollowed,
						}}
						post={post}
						navigation={this.props.navigation}
						noUserTouchable={this.props.noUserTouchable}
						openModal={this.props.openModal}
					/>
				) : (
					<></>
				)}

				{post.description ? <Text style={styles.description}>{Functions.replaceTags(post.description, navigation)}</Text> : <></>}

				{post.postData.length > 0 ? (
					<PostContainer postData={post.postData} navigation={this.props.navigation} isVisible={this.props.isVisible} />
				) : (
					<></>
				)}

				<View style={styles.bottomContainer}>
					<View style={styles.buttons}>
						<LikeButton type='like' active={post.hasLiked} count={post.likesCount} onPress={() => {}} />
						<LikeButton type='dislike' active={post.hasDisliked} count={post.dislikesCount} onPress={() => {}} />
					</View>

					<View style={styles.commentsButton}>
						<TouchableOpacity
							onPress={() => {
								this.props.navigation.push('Comments', { post: post.id })
							}}
							style={styles.commentsButtonInner}
						>
							<Text>{post.commentsCount} Yorum</Text>
						</TouchableOpacity>
					</View>
				</View>

				{this.props.commentsVisible ? (
					<></>
				) : (
					<>
						<Divider style={styles.bottomDivider} />
						<TouchableOpacity
							style={styles.commentsContainer}
							onPress={() => {
								this.props.navigation.push('Comments', { post: post.id })
							}}
						>
							{post.commentsCount > 0 ? (
								<FeaturedComments comments={post.featuredComments} />
							) : (
								<Text style={styles.noComments}>Hiç yorum yok</Text>
							)}
						</TouchableOpacity>
					</>
				)}
			</View>
		)
	}
}

export default withTheme(Post)
