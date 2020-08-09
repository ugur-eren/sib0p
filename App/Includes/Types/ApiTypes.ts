import PostTypes from './PostTypes'
import CommentTypes from './CommentTypes'
import UserTypes from './UserTypes'
import NotificationTypes from './NotificationTypes'

declare namespace ApiTypes {
	type Init = {
		status: boolean
		error?: string
	}
	export type Response = Promise<any | false>

	export interface CheckConnectionResponse extends Init {}

	export interface LoginResponse extends Init {
		token?: string
		username?: string
	}

	export interface LogoutResponse extends Init {}

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

	export interface GetNotificationsResponse extends Init {
		notifications: NotificationTypes.Notification[]
		currentTime: number
	}

	export interface GetRelationsResponse extends Init {
		relations: UserTypes.Relations[]
	}

	export interface SharePostResponse extends Init {
		notifications: NotificationTypes.Notification[]
		currentTime: number
	}
}

export default ApiTypes
