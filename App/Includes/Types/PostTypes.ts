import CommentTypes from './CommentTypes'
import UserTypes from './UserTypes'

declare namespace PostTypes {
	export interface Post {
		id: string
		user: UserTypes.TopContent
		time: number
		description: string
		postData: PostTypes.PostData[]
		likesCount: number
		dislikesCount: number
		hasLiked: boolean
		hasDisliked: boolean
		commentsCount: number
		featuredComments: CommentTypes.Comment[]
	}
	
	export interface PostData {
		uri: string
		type: 'image' | 'video' | 'poll'
		ratio: number
		thumbnail: string
	}
}

export default PostTypes
