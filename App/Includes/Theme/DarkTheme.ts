import { DarkTheme } from 'react-native-paper'
import Config from '../Config'
import Types from '../Types/Types'

export default <Types.Theme>{
	...DarkTheme,
	
	roundness: 5,
	fonts: {
		regular: {
			fontFamily: Config.fonts.regular,
			fontWeight: undefined,
		},
		medium: {
			fontFamily: Config.fonts.semi,
			fontWeight: undefined,
		},
		light: {
			fontFamily: Config.fonts.regular,
			fontWeight: undefined,
		},
		thin: {
			fontFamily: Config.fonts.regular,
			fontWeight: undefined,
		},
	},
	colors: {
		...DarkTheme.colors,
		...Config.colors.dark,
	},
}