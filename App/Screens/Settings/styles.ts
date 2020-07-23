import { StyleSheet } from 'react-native'
import Config from '../../Includes/Config'

export default StyleSheet.create({
	container: {
		flex: 1,
	},
	clearListStyle: {
		paddingHorizontal: 0,
		paddingVertical: 0,
		marginHorizontal: 0,
	},
	listIcon: {
		marginRight: 0,
		paddingHorizontal: 0,
	},
	anchorTouchable: {
		flexDirection: 'row',
		flex: 1,
		alignItems: 'center',
		marginRight: 10,
	},
	anchorTitle: {
		fontFamily: Config.fonts.semi,
		fontSize: 16,
		marginRight: 10,
	},
	clearListMenuStyle: {
		paddingHorizontal: 0,
		paddingVertical: 0,
		marginHorizontal: 0,
		alignItems: 'center',
	},
})
