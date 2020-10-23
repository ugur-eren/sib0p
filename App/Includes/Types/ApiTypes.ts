import PostTypes from './PostTypes'
import CommentTypes from './CommentTypes'
import UserTypes from './UserTypes'
import NotificationTypes from './NotificationTypes'
import Types from './Types'
import MessageTypes from './MessageTypes'

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
		profilePhoto?: string
		notif_token?: string
		notifCount?: number
		version?: number
	}

	export interface LoginResponse extends Init {
		token?: string
		notif_token?: string
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
		notif_token?: string
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

	export interface GetProfileDataResponse extends Init {
		user_data: UserTypes.UserData
	}

	export interface UpdateProfileResponse
		extends Init<
			'username_short' | 'username_not_allowed' | 'username_in_use' | 'wrong_username' | 'email_in_use' | 'wrong_email' | 'some_empty'
		> {}

	export interface ChangePasswordResponse extends Init<'wrong_password' | 'some_empty'> {}

	export interface GetNotificationsResponse extends Init {
		notifications: NotificationTypes.Notification[]
		currentTime: number
	}

	export interface GetRelationsResponse extends Init {
		relations: UserTypes.Relations[]
	}

	export interface SearchResponse extends Init {
		result: UserTypes.Relations[]
	}

	export interface ChangePhotoResponse extends Init<'no_image' | 'not_supported'> {}

	export interface SharePostResponse extends Init {
		notifications: NotificationTypes.Notification[]
		currentTime: number
	}

	export interface DoActionRequest extends Request {
		type: 'like' | 'dislike' | 'resib' | 'comment' | 'comment_like' | 'comment_dislike' | 'follow' | 'delete_post' | 'delete_comment' | 'block' | 'unblock' | 'report' | 'report_user' | 'hide_post'
		post?: number
		username?: string
		commentId?: number
		comment?: string
		report_type?: Types.ReportTypes
	}

	export interface DoActionResponse extends Init {
		hasLiked?: boolean
		hasDisliked?: boolean
		hasResibed?: boolean
		likesCount?: number
		dislikesCount?: number
		resibCount?: number
		
		isFollowed?: boolean
		followersCount?: number

		report_type?: Types.ReportTypes
	}

	export interface GetBlockedUsersResponse extends Init {
		users: UserTypes.Relations[]
	}
	
	export interface RequestCaptchaResponse extends Init {
		token: string
		captcha: string
	}

	export interface GetMessageUsersReponse extends Init {
		users: MessageTypes.MessageUser[]
		currentTime: number
	}
	
	export interface GetMessagesReponse extends Init {
		messages: MessageTypes.Message[]
		currentTime: number
	}

	export interface GetMessageUserDetailReponse extends Init {
		username: string
		profilePhoto: string
	}
}

export default ApiTypes
