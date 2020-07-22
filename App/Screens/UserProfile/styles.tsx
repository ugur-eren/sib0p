import { StyleSheet } from 'react-native'
import Config from '../../Includes/Config'

export default StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollView: {
		flex: 1,
	},
	scrollViewContainer: {
		minHeight: '100%',
	},
	backgroundContainer: {
		height: 200,
	},
	backgroundImage: {
		flex: 1,
	},
	topInfoContainer: {
		height: 80,
		paddingLeft: 10,
		flexDirection: 'row',
		alignItems: 'center',
	},
	profilePhoto: {
		width: 100,
		height: 100,
		borderRadius: 100,
		top: -25,
		borderWidth: 0.5,
	},
	userInfo: {
		paddingHorizontal: 10,
		flex: 1,
	},
	username: {
		fontFamily: Config.fonts.semi,
		fontSize: 15,
	},
	bio: {
		paddingHorizontal: 10,
		paddingBottom: 10,
	},
	centerContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 10,
		marginTop: 0.5,
		marginBottom: 0.5,
	},
	postsCount: {
		flex: 1,
		alignItems: 'center',
	},
	centerText: {
		fontFamily: Config.fonts.semi,
		fontSize: 16,
	},
	centerDivider: {
		width: 0.5,
		height: '100%',
	},
	centerTouchableContainer: {
		flex: 1,
	},
	centerTouchable: {
		alignItems: 'center',
	},
	postsDivider: {
		width: '100%',
		marginVertical: 10,
	},
})
