declare namespace UserTypes {
	export interface TopInfo {
		username: string
		profilePhoto: string
		time: string
		isFollowed?: boolean
	}

	export interface Profile {
		username: string
		fullName: string
		bio: string
		profilePhoto: string
		backgroundPhoto: string
		postsCount: number
		followsCount: number
		followersCount: number
	}

	export interface Follows {
		username: string
		fullName: string
		profilePhoto: string
		isFollowed: boolean
	}

	export interface TopContent {
		username: string
		profilePhoto: string
		isFollowed?: boolean
	}
}

export default UserTypes
