import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { Text, Divider, useTheme } from 'react-native-paper'
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
	post: PostTypes.Post
	isVisible: boolean
	currentTime: number
	openModal?: (post: PostTypes.Post) => void
	noUser?: boolean
	noUserTouchable?: boolean
	commentsVisible?: boolean
}

const Post = (props: Props) => {
	let screen = props.navigation.getScreenProps()
	const theme: Types.Theme = useTheme() as any
	let { post, navigation } = props

	const [countState, setCountState] = useState({
		hasLiked: post.hasLiked,
		hasDisliked: post.hasDisliked,
		hasResibed: post.hasResibed,
		likesCount: post.likesCount,
		dislikesCount: post.dislikesCount,
		resibCount: post.resibCount,
	})

	useEffect(() => {
		setCountState({
			...countState,
			hasLiked: post.hasLiked,
			hasDisliked: post.hasDisliked,
			hasResibed: post.hasResibed,
			likesCount: post.likesCount,
			dislikesCount: post.dislikesCount,
			resibCount: post.resibCount,
		})
	}, [props.post])

	const _navigateToComments = () => {
		props.navigation.push('Comments', { post: post.id })
	}

	const _likePost = async () => {
		let response = await Api.doAction({
			token: screen.user.token,
			type: 'like',
			post: post.id,
		})
		if (response) {
			if (response.status) {
				setCountState((countState) => {
					return {
						...countState,
						hasLiked: response ? response.hasLiked : false,
						hasDisliked: response ? response.hasDisliked : false,
						likesCount: response ? response.likesCount : NaN,
						dislikesCount: response ? response.dislikesCount : NaN,
					}
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

	const _dislikePost = async () => {
		let response = await Api.doAction({
			token: screen.user.token,
			type: 'dislike',
			post: post.id,
		})
		if (response) {
			if (response.status) {
				setCountState((countState) => {
					return {
						...countState,
						hasLiked: response ? response.hasLiked : false,
						hasDisliked: response ? response.hasDisliked : false,
						likesCount: response ? response.likesCount : NaN,
						dislikesCount: response ? response.dislikesCount : NaN,
					}
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

	const _resibPost = async () => {
		let response = await Api.doAction({
			token: screen.user.token,
			type: 'resib',
			post: post.id,
		})
		if (response) {
			if (response.status) {
				setCountState((countState) => {
					return {
						...countState,
						hasLiked: response ? response.hasLiked : false,
						hasDisliked: response ? response.hasDisliked : false,
						likesCount: response ? response.likesCount : NaN,
						dislikesCount: response ? response.dislikesCount : NaN,

						hasResibed: response ? response.hasResibed : false,
						resibCount: response ? response.resibCount : NaN,
					}
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

	return (
		<View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
			{post.postType === 'resib' && post.resibber ? (
				<View
					style={{
						paddingHorizontal: 10,
						paddingVertical: 5,
						flexDirection: 'row',
						alignItems: 'center',
						marginBottom: 3,
						borderBottomColor: theme.colors.background,
						borderBottomWidth: 0.5,
					}}
				>
					<Feather name='repeat' size={16} color={theme.colors.main} />
					<FastImage
						source={{ uri: post.resibber.profilePhoto }}
						style={{ width: 25, height: 25, borderRadius: 25, marginHorizontal: 10 }}
					/>
					<Text style={{ fontFamily: 'FiraSans-SemiBold' }}>{post.resibber.username}</Text>
				</View>
			) : (
				<></>
			)}
			{!props.noUser ? (
				<TopProfile
					user={{
						username: post.user.username,
						profilePhoto: post.user.profilePhoto,
						time: Functions.convertTime(post.time, props.currentTime, screen.language),
						tags: post.user.tags,
						isFollowed: post.user.isFollowed,
					}}
					post={post}
					navigation={navigation}
					noUserTouchable={props.noUserTouchable}
					openModal={props.openModal}
				/>
			) : (
				<></>
			)}

			{post.description ? <Text style={styles.description}>{Functions.replaceTags(post.description, navigation)}</Text> : <></>}
			{post.tags ? <RenderTags tags={post.tags} navigation={navigation} /> : <></>}

			{post.postData.length > 0 ? (
				<PostContainer like={_likePost} postData={post.postData} navigation={navigation} isVisible={props.isVisible} />
			) : (
				<></>
			)}

			<View style={styles.bottomContainer}>
				<View style={styles.buttons}>
					<LikeButton type='like' active={countState.hasLiked} count={countState.likesCount} onPress={_likePost} />
					<LikeButton type='dislike' active={countState.hasDisliked} count={countState.dislikesCount} onPress={_dislikePost} />
					<LikeButton type='resib' active={countState.hasResibed} count={countState.resibCount} onPress={_resibPost} />
				</View>

				<View style={styles.commentsButton}>
					<TouchableOpacity onPress={_navigateToComments} style={styles.commentsButtonInner}>
						<Text>{post.commentsCount} {screen.language.comments_count}</Text>
					</TouchableOpacity>
				</View>
			</View>

			{props.commentsVisible ? (
				<></>
			) : (
				<>
					<Divider style={styles.bottomDivider} />
					<TouchableOpacity style={styles.commentsContainer} onPress={_navigateToComments}>
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

const RenderTags = React.memo((props: { tags: PostTypes.Tag[]; navigation: Types.Navigation }) => {
	let renderTag = (tag: PostTypes.Tag) => <RenderTag key={tag.id.toString()} tag={tag} navigation={props.navigation} />

	return <View style={styles.tags}>{props.tags.map(renderTag)}</View>
})
const RenderTag = React.memo((props: { tag: PostTypes.Tag; navigation: Types.Navigation }) => {
	const navigate = () => {
		props.navigation.push('CustomPosts', { type: 'tags', tag: props.tag })
	}

	return (
		<TouchableOpacity onPress={navigate} style={styles.tagContainer}>
			<Text style={styles.tag}>
				#<Text style={styles.tagName}>{props.tag.name}</Text>
			</Text>
		</TouchableOpacity>
	)
})

export default React.memo(Post)
