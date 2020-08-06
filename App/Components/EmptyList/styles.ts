import { StyleSheet, Dimensions } from 'react-native'
import Config from '../../Includes/Config'

export default StyleSheet.create({
	emptyContainer: {
		width: Dimensions.get('window').width,
		marginTop: 10,
		marginBottom: 20,
	},
	emptyImageFix: {
		paddingBottom: '100%',
	},
	emptyImage: {
		width: '100%',
		height: '100%',
		position: 'absolute',
		left: 0,
		top: 0,
	},
	emptyText: {
		fontFamily: Config.fonts.semi,
		textAlign: 'center',
		fontSize: 16,
		paddingHorizontal: 20
	},
})
