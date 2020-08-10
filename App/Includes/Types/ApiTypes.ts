import PostTypes from './PostTypes'
import CommentTypes from './CommentTypes'
import UserTypes from './UserTypes'
import NotificationTypes from './NotificationTypes'

declare namespace ApiTypes {
	type Init<T = string> = {
		status: boolean
		error?: T
	}
	type Request = {
		token: string
	}
	export type Response = Promise<any | false>

	export interface CheckLoginResponse extends Init {
		username: string
	}

	export interface LoginResponse extends Init {
		token?: string
		username?: string
	}

	export interface RegisterRequest {
		username: string
		name: string
		surname: string
		email: string
		password: string
		captchaToken: string
		captcha: string
	}
	export interface RegisterResponse
		extends Init<
			| 'some_empty'
			| 'expired_captcha'
			| 'wrong_captcha'
			| 'username_short'
			| 'wrong_username'
			| 'username_not_allowed'
			| 'wrong_email'
			| 'username_in_use'
			| 'email_in_use'
		> {
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

	export interface DoActionRequest extends Request {
		type: 'like' | 'dislike' | 'resib' | 'comment' | 'comment_like' | 'comment_dislike'
		post: number
	}

	export interface DoActionResponse extends Init {
		hasLiked?: boolean
		hasDisliked?: boolean
		likesCount?: number
		dislikesCount?: number
	}

	export interface RequestCaptchaResponse extends Init {
		token: string
		captcha: string
	}
}

export default ApiTypes
