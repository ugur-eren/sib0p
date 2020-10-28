import UserTagTypes from "./UserTagTypes";

declare namespace UserTypes {
	export interface TopInfo {
		username: string
		profilePhoto: string
		time: string
		tags: UserTagTypes.Tag[]
		isFollowed?: boolean
	}

	export interface Profile {
		user_id: number
		username: string
		fullName: string
		bio: string
		profilePhoto: string
		backgroundPhoto: string
		tags: UserTagTypes.Tag[]
		isFollowed: boolean
		postsCount: number
		followsCount: number
		followersCount: number
		sevapPoints: number
	}

	export interface Relations {
		username: string
		fullName: string
		profilePhoto: string
		tags: UserTagTypes.Tag[]
		isFollowed?: boolean
	}

	export interface TopContent {
		username: string
		profilePhoto: string
		tags: UserTagTypes.Tag[]
		isFollowed?: boolean
	}

	export interface UserData {
		username: string
		name: string
		surname: string
		email: string
		bio: string
	}
}

export default UserTypes
