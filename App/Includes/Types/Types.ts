import { NavigationState, NavigationParams } from 'react-navigation'
import { NavigationStackProp } from 'react-navigation-stack'
import UserTypes from './UserTypes'
import PostTypes from './PostTypes'
import { Languages } from '../Languages'

let lang = Languages.tr

declare namespace Types {
	export interface Navigation<Params = NavigationParams, State = NavigationState> extends NavigationStackProp<State, Params> {
		getScreenProps: () => Types.ScreenProps
	}

	export interface ScreenProps {
		theme: Theme
		language: Language
		activeLanguage: string
		selectedLanguage: 'en' | 'tr' | 'system'
		user: ScreenPropsUser
		notification: boolean
		selectedTheme: SupportedThemes
		logout: (runtime?: boolean) => Promise<void>
		unknown_error: (error?: string) => void
		error: (error: string) => void

		sharePost: (message: string, tags: string[], images: { type: 'image' | 'video'; content: string }[]) => void
		isSharePostActive: () => boolean
		restart: () => any

		setUserData: (user: ScreenPropsUser, callback?: () => void) => void
		setTheme: (theme: SupportedThemes, callback?: () => void) => void
		setLanguage: (language: 'en' | 'tr' | 'system', callback?: () => void) => void
		setNotification: (active: boolean) => void
		setIsVideoMuted: (isMuted: boolean) => void

		getIsVideoMuted: () => boolean

		DataCache: () => {
			profiles: {
				[key: string]: {
					data: UserTypes.Profile
					posts?: PostTypes.Post[]
				}
			}
			currentTime: number
		}
		setProfileDataCache: (data: UserTypes.Profile, posts?: PostTypes.Post[]) => void
		removeProfileDataCache: (username: string) => void
		setCurrentTime: (currentTime: number) => void
	}

	export interface AppState {
		ready: boolean
		theme: 'light' | 'dark'
		selectedTheme: SupportedThemes
		notification: boolean
		language: 'en' | 'tr'
		selectedLanguage: 'en' | 'tr' | 'system'
		user: ScreenPropsUser
		errorMessage: false | string
		postSharing: boolean
	}

	export interface ScreenPropsUser {
		active: boolean
		username: string
		token: string
	}

	export interface Theme {
		dark: boolean
		mode?: 'adaptive' | 'exact'
		roundness: number
		colors: {
			background: string
			surface: string
			accent: string
			error: string
			text: string
			onSurface: string
			onBackground: string
			disabled: string
			placeholder: string
			backdrop: string
			notification: string

			main: string
			success: string
			contrast: string
			halfContrast: string
			primary: string
			bottomBarTint: string
			bottomBarActive: string
			bottomBarInactive: string
			buttonBackground: string
			buttonText: string
			inputBackground: string
			inputBorder: string
			inputPlaceholder: string
			surfaceRgb: string
			gradient: string[]
		}
		fonts: {
			regular: Font
			medium: Font
			light: Font
			thin: Font
		}
		animation: {
			scale: number
		}
	}
	interface Font {
		fontFamily: string
		fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
	}

	export type ReportTypes = 'spam' | 'abusive' | 'objectionable' | 'sexual'

	export type SupportedThemesObject = {
		light: string
		dark: string
		timed: string
		system: string
	}
	export type SupportedThemes = keyof SupportedThemesObject

	export type Languages = {
		[key: string]: Language
	}

	export type Language = typeof lang

	/* export interface Language {
		code: string
		langName: string
		success: string
		error: string
		ok: string
		share_text: string
		share: string
		report: string
		delete: string
		cancel: string
		delete_post: string
		report_dialog: string
		delete_dialog: string
		no_post_error: string
		no_user_error: string
		no_comments: string
        comments_count: string
		video_load_error: string
		post_auth_error: string
		report_success: string
		post_share_success: string
		post_share_error: string
		wrong_username_error: string
		follow: string
		username_empty: string
		username_less: string
		password_empty: string
		couldnt_take_login_info: string
		wrong_username: string
		no_user: string
		wrong_password: string
		unknown_error: string
		username: string
		password: string
		login: string
	} */
}

export default Types
