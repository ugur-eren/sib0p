import { StyleSheet } from 'react-native'
import Config from '../../Includes/Config'

export default StyleSheet.create({
	container: {
		width: '100%',
	},
	description: {
		flex: 1,
		padding: 10,
	},
	bottomContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
	buttons: {
		flexDirection: 'row',
	},
	commentsButton: {
		flex: 1,
		justifyContent: 'flex-end',
		flexDirection: 'row',
		marginRight: 20,
	},
	commentsButtonInner: {
		padding: 10,
	},
	bottomDivider: {
		height: 2,
		marginBottom: 10,
	},
	commentsContainer: {
		flex: 1,
		marginBottom: 10,
	},
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
	},
})
