import UserTypes from './UserTypes'

declare namespace NotificationTypes {
    export interface Notification {
        id: string
        user: UserTypes.TopContent
        time: string
        type: 'comment' | 'like' | 'commentlike' | 'follow' | 'commenttag' |'posttag'
        post?: string
        content?: string
    }
}

export default NotificationTypes