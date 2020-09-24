declare namespace MessageTypes {
	export interface MessageUser {
		user_id: number
		username: string
		profilePhoto: string
		time: number
		lastMessage: string
		lastMessageSeen: boolean
	}

	export interface Message {
		id: number
		isMine: boolean
		message: string
		seen: boolean
		time: number
		sending?: boolean
		error?: boolean
	}
	
	export interface MessageStatus {
		status: boolean
		message_id: string
	}
	
	export interface NewMessage {
		message_id: number
		message: string
		from_user: number
		time: number
	}
}

export default MessageTypes
