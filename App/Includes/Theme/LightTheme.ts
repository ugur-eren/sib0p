import { DefaultTheme } from 'react-native-paper'
import Config from '../Config'
import Types from '../Types/Types'

export default <Types.Theme>{
	...DefaultTheme,
	
	roundness: 5,
	fonts: {
		regular: {
			fontFamily: Config.fonts.regular,
			fontWeight: DefaultTheme.fonts.regular.fontWeight,
		},
		medium: {
			fontFamily: Config.fonts.semi,
			fontWeight: DefaultTheme.fonts.medium.fontWeight,
		},
		light: {
			fontFamily: Config.fonts.regular,
			fontWeight: DefaultTheme.fonts.light.fontWeight,
		},
		thin: {
			fontFamily: Config.fonts.regular,
			fontWeight: DefaultTheme.fonts.thin.fontWeight,
		},
	},
	colors: {
		...DefaultTheme.colors,
		...Config.colors.light,
	},
}