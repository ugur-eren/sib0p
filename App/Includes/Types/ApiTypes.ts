import PostTypes from './PostTypes'
import CommentTypes from './CommentTypes'
import UserTypes from './UserTypes'

declare namespace ApiTypes {
    type Init = {
        status: boolean
        error?: string
    }
    export type Response = Promise<any | false>

	export interface CheckConnectionResponse extends Init {
        connection: 'ok'
    }

    export interface LoginResponse extends Init {
        token?: string
        username?: string
    }

    export interface GetExploreResponse extends Init {
        posts: PostTypes.Post[]
        currentTime: number
    }

    export interface GetCommentsResponse extends Init {
        comments: CommentTypes.Comment[]
        currentTime: number
    }
    
    export interface GetProfileResponse extends Init {
        user: UserTypes.Profile
    }
}

export default ApiTypes
