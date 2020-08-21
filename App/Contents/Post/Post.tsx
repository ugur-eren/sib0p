import React from 'react'
import { View } from 'react-native'
import { Text, Divider, withTheme } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Feather from 'react-native-vector-icons/Feather'
import FastImage from 'react-native-fast-image'
import PostContainer from '../PostContainer/PostContainer'
import TopProfile from '../TopProfile/TopProfile'
import FeaturedComments from '../FeaturedComments/FeaturedComments'
import LikeButton from '../../Components/LikeButton/LikeButton'
import PostTypes from '../../Includes/Types/PostTypes'
import Functions from '../../Includes/Functions'
import Types from '../../Includes/Types/Types'
import Api from '../../Includes/Api'
import styles from './styles'

interface Props {
	navigation: Types.Navigation
	theme: Types.Theme
	post: PostTypes.Post
	isVisible: boolean
	currentTime: number
	openModal?: (post: PostTypes.Post) => void
	noUser?: boolean
	noUserTouchable?: boolean
	commentsVisible?: boolean
}

interface State {
	hasLiked: boolean
	hasDisliked: boolean
	hasResibed: boolean
	likesCount: number
	dislikesCount: number
	resibCount: number
}

class Post extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			hasLiked: props.post.hasLiked,
			hasDisliked: props.post.hasDisliked,
			hasResibed: props.post.hasResibed,
			likesCount: props.post.likesCount,
			dislikesCount: props.post.dislikesCount,
			resibCount: props.post.resibCount,
		}
	}

	componentDidUpdate(prevProps: Props) {
		if (prevProps.post !== this.props.post) {
			this.setState({
				hasLiked: this.props.post.hasLiked,
				hasDisliked: this.props.post.hasDisliked,
				hasResibed: this.props.post.hasResibed,
				likesCount: this.props.post.likesCount,
				dislikesCount: this.props.post.dislikesCount,
				resibCount: this.props.post.resibCount,
			})
		}
	}

	_navigateToComments = () => {
		this.props.navigation.push('Comments', { post: this.props.post.id })
	}

	_likePost = async () => {
		let screen = this.props.navigation.getScreenProps()
		let response = await Api.doAction({
			token: screen.user.token,
			type: 'like',
			post: this.props.post.id,
		})
		if (response) {
			if (response.status) {
				this.setState({
					hasLiked: response ? response.hasLiked : false,
					hasDisliked: response ? response.hasDisliked : false,
					likesCount: response ? response.likesCount : NaN,
					dislikesCount: response ? response.dislikesCount : NaN,
				})
			} else {
				if (response.error === 'no_login') {
					screen.logout(true)
				} else if (response.error === 'no_post') {
					screen.error(screen.language.no_post_error)
				} else {
					screen.unknown_error(response.error)
				}
			}
		} else {
			screen.unknown_error()
		}
	}

	_dislikePost = async () => {
		let screen = this.props.navigation.getScreenProps()
		let response = await Api.doAction({
			token: screen.user.token,
			type: 'dislike',
			post: this.props.post.id,
		})
		if (response) {
			if (response.status) {
				this.setState({
					hasLiked: response ? response.hasLiked : false,
					hasDisliked: response ? response.hasDisliked : false,
					likesCount: response ? response.likesCount : NaN,
					dislikesCount: response ? response.dislikesCount : NaN,
				})
			} else {
				if (response.error === 'no_login') {
					screen.logout(true)
				} else if (response.error === 'no_post') {
					screen.error(screen.language.no_post_error)
				} else {
					screen.unknown_error(response.error)
				}
			}
		} else {
			screen.unknown_error()
		}
	}

	_resibPost = async () => {
		let screen = this.props.navigation.getScreenProps()
		let response = await Api.doAction({
			token: screen.user.token,
			type: 'resib',
			post: this.props.post.id,
		})
		if (response) {
			if (response.status) {
				this.setState({
					hasLiked: response ? response.hasLiked : false,
					hasDisliked: response ? response.hasDisliked : false,
					likesCount: response ? response.likesCount : NaN,
					dislikesCount: response ? response.dislikesCount : NaN,

					hasResibed: response ? response.hasResibed : false,
					resibCount: response ? response.resibCount : NaN,
				})
			} else {
				if (response.error === 'no_login') {
					screen.logout(true)
				} else if (response.error === 'no_post') {
					screen.error(screen.language.no_post_error)
				} else {
					screen.unknown_error(response.error)
				}
			}
		} else {
			screen.unknown_error()
		}
	}

	render() {
		let screen = this.props.navigation.getScreenProps()
		let { post, theme, navigation } = this.props

		return (
			<View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
				{post.postType === 'resib' && post.resibber ? (
					<View style={[styles.resibTop, { borderBottomColor: theme.colors.background }]}>
						<Feather name='repeat' size={16} color={theme.colors.main} />
						<FastImage source={{ uri: post.resibber.profilePhoto }} style={styles.resibPP} />
						<Text style={styles.resibUsername}>{post.resibber.username}</Text>
					</View>
				) : (
					<></>
				)}
				{!this.props.noUser ? (
					<TopProfile
						user={post.user}
						time={Functions.convertTime(post.time, this.props.currentTime, screen.language)}
						post={post}
						navigation={navigation}
						noUserTouchable={this.props.noUserTouchable && !(post.postType === 'resib' && post.resibber)}
						openModal={this.props.openModal}
					/>
				) : (
					<></>
				)}

				{post.description ? <Text style={styles.description}>{Functions.replaceTags(post.description, navigation)}</Text> : <></>}
				{post.tags ? <RenderTags tags={post.tags} navigation={navigation} /> : <></>}

				{post.postData.length > 0 ? (
					<PostContainer like={this._likePost} postData={post.postData} navigation={navigation} isVisible={this.props.isVisible} />
				) : (
					<></>
				)}

				<View style={styles.bottomContainer}>
					<View style={styles.buttons}>
						<LikeButton type='like' active={this.state.hasLiked} count={this.state.likesCount} onPress={this._likePost} />
						<LikeButton type='dislike' active={this.state.hasDisliked} count={this.state.dislikesCount} onPress={this._dislikePost} />
						{!post.isMine ? (
							<LikeButton type='resib' active={this.state.hasResibed} count={this.state.resibCount} onPress={this._resibPost} />
						) : (
							<></>
						)}
					</View>

					<View style={styles.commentsButton}>
						<TouchableOpacity onPress={this._navigateToComments} style={styles.commentsButtonInner}>
							<Text>
								{post.commentsCount} {screen.language.comments_count}
							</Text>
						</TouchableOpacity>
					</View>
				</View>

				{this.props.commentsVisible ? (
					<></>
				) : (
					<>
						<Divider style={styles.bottomDivider} />
						<TouchableOpacity style={styles.commentsContainer} onPress={this._navigateToComments}>
							{post.commentsCount > 0 ? (
								<FeaturedComments comments={post.featuredComments} />
							) : (
								<Text style={styles.noComments}>{screen.language.no_comments}</Text>
							)}
						</TouchableOpacity>
					</>
				)}
			</View>
		)
	}
}

class RenderTags extends React.PureComponent<{ tags: PostTypes.Tag[]; navigation: Types.Navigation }> {
	renderTag = (tag: PostTypes.Tag) => <RenderTag key={tag.id.toString()} tag={tag} navigation={this.props.navigation} />

	render() {
		return <View style={styles.tags}>{this.props.tags.map(this.renderTag)}</View>
	}
}
class RenderTag extends React.PureComponent<{ tag: PostTypes.Tag; navigation: Types.Navigation }> {
	navigate = () => {
		this.props.navigation.push('CustomPosts', { type: 'tags', tag: this.props.tag })
	}

	render() {
		return (
			<TouchableOpacity onPress={this.navigate} style={styles.tagContainer}>
				<Text style={styles.tag}>
					#<Text style={styles.tagName}>{this.props.tag.name}</Text>
				</Text>
			</TouchableOpacity>
		)
	}
}

export default withTheme(Post)
