import React from 'react'
import { View } from 'react-native'
import { Text, Divider, useTheme } from 'react-native-paper'
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
	isVisible: boolean
	currentTime: number
	openModal: (post: PostTypes.Post) => void
	noUser?: boolean
	noUserTouchable?: boolean
	commentsVisible?: boolean
}

const Post = (props: Props) => {
	const theme: Types.Theme = useTheme() as any

	const _navigateToComments = () => {
		props.navigation.push('Comments', { post: post.id })
	}

	let { post, navigation } = props

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

			{post.postData.length > 0 ? <PostContainer postData={post.postData} navigation={navigation} isVisible={props.isVisible} /> : <></>}

			<View style={styles.bottomContainer}>
				<View style={styles.buttons}>
					<LikeButton type='like' active={post.hasLiked} count={post.likesCount} onPress={() => {}} />
					<LikeButton type='dislike' active={post.hasDisliked} count={post.dislikesCount} onPress={() => {}} />
					<LikeButton type='resib' active={post.hasResibed} count={post.dislikesCount} onPress={() => {}} />
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

export default React.memo(Post)
