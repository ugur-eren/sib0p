import UserTypes from './UserTypes'

declare namespace CommentTypes {
	export interface Comment {
        id: number
        user: UserTypes.TopContent
        time: number
        content: string
        likesCount: number
        dislikesCount: number
        hasLiked: boolean
        hasDisliked: boolean
        isMine: boolean
    }
}

export default CommentTypes