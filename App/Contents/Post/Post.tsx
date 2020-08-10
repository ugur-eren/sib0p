import React, { useState } from 'react'
import { View } from 'react-native'
import { Text, Divider, useTheme } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler'
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
	openModal: (post: PostTypes.Post) => void
	noUser?: boolean
	noUserTouchable?: boolean
	commentsVisible?: boolean
}

const Post = (props: Props) => {
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

	const _navigateToComments = () => {
		props.navigation.push('Comments', { post: post.id })
	}

	const _likePost = async () => {
		let response = await Api.doAction({
			token: props.navigation.getScreenProps().user.token,
			type: 'like',
			post: post.id,
		})
		if (response) {
			if (response.status) {
				setCountState(countState => {
					return ({
					...countState,
					hasLiked: response ? response.hasLiked : false,
					hasDisliked: response ? response.hasDisliked : false,
					likesCount: response ? response.likesCount : NaN,
					dislikesCount: response ? response.dislikesCount : NaN,
				})})
			} else {
				if (response.error === 'no_login') {
					props.navigation.getScreenProps().logout(true)
				} else {
					props.navigation.getScreenProps().unknown_error(response.error)
				}
			}
		} else {
			props.navigation.getScreenProps().unknown_error()
		}
	}

	const _dislikePost = async () => {
		let response = await Api.doAction({
			token: props.navigation.getScreenProps().user.token,
			type: 'dislike',
			post: post.id,
		})
		if (response) {
			if (response.status) {
				setCountState(countState => {
					return ({
					...countState,
					hasLiked: response ? response.hasLiked : false,
					hasDisliked: response ? response.hasDisliked : false,
					likesCount: response ? response.likesCount : NaN,
					dislikesCount: response ? response.dislikesCount : NaN,
				})})
			} else {
				if (response.error === 'no_login') {
					props.navigation.getScreenProps().logout(true)
				} else {
					props.navigation.getScreenProps().unknown_error(response.error)
				}
			}
		} else {
			props.navigation.getScreenProps().unknown_error()
		}
	}

	const _resibPost = async () => {
		let response = await Api.doAction({
			token: props.navigation.getScreenProps().user.token,
			type: 'resib',
			post: post.id,
		})
	}

	return (
		<View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
			{!props.noUser ? (
				<TopProfile
					user={{
						username: post.user.username,
						profilePhoto: post.user.profilePhoto,
						time: Functions.convertTime(post.time, props.currentTime),
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

			{post.postData.length > 0 ? <PostContainer postData={post.postData} navigation={navigation} isVisible={props.isVisible} /> : <></>}

			<View style={styles.bottomContainer}>
				<View style={styles.buttons}>
					<LikeButton type='like' active={countState.hasLiked} count={countState.likesCount} onPress={_likePost} />
					<LikeButton type='dislike' active={countState.hasDisliked} count={countState.dislikesCount} onPress={_dislikePost} />
					<LikeButton type='resib' active={countState.hasResibed} count={countState.resibCount} onPress={_resibPost} />
				</View>

				<View style={styles.commentsButton}>
					<TouchableOpacity onPress={_navigateToComments} style={styles.commentsButtonInner}>
						<Text>{post.commentsCount} Yorum</Text>
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
							<Text style={styles.noComments}>Hiç yorum yok</Text>
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
