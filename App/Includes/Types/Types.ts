import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation'
import { NavigationStackProp } from 'react-navigation-stack'

declare namespace Types {
	export interface Navigation<Params = NavigationParams, State = NavigationState> extends NavigationStackProp<State, Params> {
		getScreenProps: () => Types.ScreenProps
	}

	export interface ScreenProps {
		theme: Theme
		user: ScreenPropsUser
		selectedTheme: SupportedThemes

		setUserData: (user: ScreenPropsUser, callback?: () => void) => void
		setTheme: (theme: SupportedThemes, callback?: () => void) => void
	}

	export interface AppState {
		theme: 'light' | 'dark'
		selectedTheme: SupportedThemes
		user: ScreenPropsUser
	}

	export interface ScreenPropsUser {
		active: boolean
		username: string
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

	export type SupportedThemesObject = {
		light: string
		dark: string
		timed: string
		system: string
	}
	export type SupportedThemes = keyof SupportedThemesObject
}

export default Types
