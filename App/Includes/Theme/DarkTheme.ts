import { DarkTheme } from 'react-native-paper'
import Config from '../Config'
import Types from '../Types/Types'

export default <Types.Theme>{
	...DarkTheme,
	
	roundness: 5,
	fonts: {
		regular: {
			fontFamily: Config.fonts.regular,
			fontWeight: DarkTheme.fonts.regular.fontWeight,
		},
		medium: {
			fontFamily: Config.fonts.semi,
			fontWeight: DarkTheme.fonts.medium.fontWeight,
		},
		light: {
			fontFamily: Config.fonts.regular,
			fontWeight: DarkTheme.fonts.light.fontWeight,
		},
		thin: {
			fontFamily: Config.fonts.regular,
			fontWeight: DarkTheme.fonts.thin.fontWeight,
		},
	},
	colors: {
		...DarkTheme.colors,
		...Config.colors.dark,
	},
}