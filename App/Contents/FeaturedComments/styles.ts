import { StyleSheet } from 'react-native'
import Config from '../../Includes/Config'

export default StyleSheet.create({
	commentsInner: {
		flex: 1,
	},
	comment: {
		flex: 1,
		paddingHorizontal: 10,
		paddingTop: 0,
		flexDirection: 'row',
		alignItems: 'center',
	},
	commentAuthor: {
		fontFamily: Config.fonts.semi,
	},
	commentText: {
		marginLeft: 10,
		flex: 1,
	},
})
