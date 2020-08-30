import CommentTypes from './CommentTypes'
import UserTypes from './UserTypes'

declare namespace PostTypes {
	export interface Post {
		id: number
		user: UserTypes.TopContent
		time: number
		description: string
		tags: PostTypes.Tag[]
		postData: PostTypes.PostData[]
		likesCount: number
		dislikesCount: number
		resibCount: number
		hasLiked: boolean
		hasDisliked: boolean
		hasResibed: boolean
		commentsCount: number
		featuredComments: CommentTypes.Comment[]
		isMine: boolean
		postType: 'media' | 'poll' | 'resib' | 'message' | 'adMob'
		resibber?: UserTypes.TopContent
		points?: number
	}
	
	export interface PostData {
		uri: string
		type: 'image' | 'video'
		ratio: number
		thumbnail: string
		poster?: string
	}
	
	export interface Tag {
		id: number
		name: string
	}
}

export default PostTypes
