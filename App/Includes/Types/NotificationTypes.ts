import UserTypes from './UserTypes'

declare namespace NotificationTypes {
	export interface Notification {
		id: number
		user: UserTypes.TopContent
		time: number
		type: 'comment' | 'like' | 'comment_like' | 'follow' | 'unfollow' | 'commtag' | 'posttag' | 'warning'
		post?: string
		content?: string
	}
}

export default NotificationTypes
