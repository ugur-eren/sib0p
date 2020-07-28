import UserTypes from './UserTypes'

declare namespace CommentTypes {
	export interface Comment {
        id: string
        user: UserTypes.TopContent
        time: number
        content: string
        likesCount: number
        dislikesCount: number
        hasLiked: boolean
        hasDisliked: boolean
    }
}

export default CommentTypes