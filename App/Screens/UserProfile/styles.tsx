import { StyleSheet, Platform } from 'react-native'
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
		height: Platform.OS == 'ios' ? 235 : 200,
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
	profilePhotoContainer: {
		width: 100,
		height: 100,
		backgroundColor: 'red',
		borderRadius: 100,
		top: -25,
		borderWidth: 0.5,
		overflow: 'hidden',
		position: 'relative'
	},
	profilePhoto: {
		width: 100,
		height: 100,
		borderRadius: 100,
		overflow: 'hidden',
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
		marginVertical: 0.5,
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
	centerTouchable: {
		alignItems: 'center',
		flex: 1,
	},
	postsDivider: {
		width: '100%',
		marginVertical: 10,
	},
	userTagsContainer: {
		marginVertical: 0.5,
		padding: 10,
	},
	userTag: {
		flexDirection: 'row',
		marginBottom: 5,
		alignItems: 'center',
	},
	userTagIcon: {
		marginRight: 10,
	},
	bottomLoader: {
		paddingVertical: 15,
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
	},
	ppbgLoading: {
		position: 'absolute',
		left: 0,
		top: 0,
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
})
