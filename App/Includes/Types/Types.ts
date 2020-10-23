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
		selectedLanguage: SupportedLanguages | 'system'
		user: ScreenPropsUser
		notification: boolean
		selectedTheme: SupportedThemes
		logout: (runtime?: boolean) => Promise<void>
		unknown_error: (error?: string) => void
		error: (error: string) => void

		getSocket: () => SocketIOClient.Socket
		isSocketConnected: () => boolean

		sharePost: (message: string, tags: string[], images: { type: 'image' | 'video'; content: string }[]) => void
		isSharePostActive: () => boolean
		restart: () => any

		setUserData: (user: ScreenPropsUser, callback?: () => void) => void
		setTheme: (theme: SupportedThemes, callback?: () => void) => void
		setLanguage: (language: SupportedLanguages | 'system', callback?: () => void) => void
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
		language: SupportedLanguages
		selectedLanguage: SupportedLanguages | 'system'
		user: ScreenPropsUser
		errorMessage: false | string
		postSharing: boolean
	}

	export interface ScreenPropsUser {
		active: boolean
		username: string
		token: string
		profilePhoto?: string
		notifCount?: number
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

	export interface Language {
		code: string
		langName: string
		language: string
		success: string
		error: string
		ok: string
		unknown_error: string
		share_text: string
		share: string
		report: string
		delete: string
		cancel: string
		delete_post: string
		report_dialog: string
		delete_dialog: string
		no_post_error: string
		no_comment_error: string
		no_user_error: string
		no_comments: string
		comments_count: string
		video_load_error: string
		post_auth_error: string
		report_success: string
		report_success_hide: string
		post_share_success: string
		post_share_error: string
		wrong_username_error: string
		follow: string
		unfollow: string
		username_empty: string
		username_less: string
		password_empty: string
		couldnt_take_login_info: string
		wrong_username: string
		no_user: string
		wrong_password: string
		username: string
		password: string
		password_again: string
		login: string
		have_no_account: string
		register: string
		have_you_forgot_password: string
		password_reset: string
		must_agree_agreement: string
		email_empty: string
		email_wrong: string
		password_less: string
		password_not_match: string
		captcha_empty: string
		email_in_use: string
		expired_captcha: string
		some_empty: string
		username_in_use: string
		username_not_allowed: string
		wrong_captcha: string
		terms_of_use: string
		privacy_policy: string
		name: string
		surname: string
		email: string
		captcha: string
		have_an_account: string
		just_now: string
		seconds_ago: string
		minutes_ago: string
		hours_ago: string
		days_ago: string
		weeks_ago: string
		months_ago: string
		years_ago: string
		seconds_no_ago: string
		minutes_no_ago: string
		hours_no_ago: string
		days_no_ago: string
		weeks_no_ago: string
		months_no_ago: string
		years_no_ago: string
		no_post_data: string
		same_comment_error: string
		comment_auth_error: string
		no_comments_made: string
		comments: string
		your_comment: string
		send: string
		delete_comment: string
		delete_comment_dialog: string
		unknown: string
		no_connection: string
		try_again: string
		notifications: string
		notif_commented: string
		notif_liked_comment: string
		notif_followed: string
		notif_liked_post: string
		notif_tagged_on_comment: string
		notif_tagged_on_post: string
		notif_unfollow: string
		notif_warning: string
		no_notifs: string
		no_follows: string
		no_followers: string
		search: string
		no_search_results: string
		blocked_users: string
		no_blocked_users: string
		old_password_empty: string
		new_password_empty: string
		new_password_less: string
		old_password: string
		new_password: string
		new_password_again: string
		change_password: string
		change_password_success: string
		edit_profile: string
		bio: string
		edit_profile_success: string
		theme: string
		logout: string
		logout_dialog: string
		theme_light: string
		theme_dark: string
		theme_timed: string
		theme_system: string
		cropper_title: string
		loading: string
		choose: string
		image_size_more: string
		must_choose: string
		waiting_to_post: string
		perm_settings_error: string
		share_post: string
		file_perm_unavailable: string
		file_perm_ask: string
		file_perm_open_settins: string
		message: string
		tags: string
		share_dialog: string
		user_block_success: string
		user_unblock_success: string
		pp_photo_success: string
		bg_photo_success: string
		no_image: string
		file_not_supported: string
		file_open_error: string
		follows: string
		followers: string
		no_posts: string
		not_found: string
		user_not_found: string
		block_user_dialog: string
		block: string
		check_network: string
		settings: string
		explore: string
		memelord: string
		profile: string
		posts: string
		unblock: string
		spam: string
		abusive: string
		objectionable: string
		sexual: string
		already_reported: string
		hide: string
		not_reported: string
		already_hidden: string
		report_user_dialog: string
		user_report_success: string
		comment_empty: string
		too_fast_action: string
		media: string
		detail: string
		picture: string
		video: string
		sponsored: string
		image_thin: string
		profile_photo: string
		background_photo: string
	}

	export type SupportedLanguages = 'tr' | 'en' | 'ru' | 'de'
}

export default Types
