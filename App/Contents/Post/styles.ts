import { StyleSheet, Dimensions } from 'react-native'
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
		marginRight: 10,
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
	noComments: {
		paddingHorizontal: 10,
	},
	tags: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		paddingHorizontal: 10,
	},
	tagContainer: {
		marginRight: 10,
	},
	tag: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	tagName: {
		fontFamily: Config.fonts.semi,
	},
	resibTop: {
		paddingHorizontal: 10,
		paddingVertical: 5,
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 3,
		borderBottomWidth: 0.5,
	},
	resibPP: {
		width: 25,
		height: 25,
		borderRadius: 25,
		marginHorizontal: 10,
	},
	resibUsername: {
		fontFamily: Config.fonts.semi,
	},
	adMobContainer: {
		width: '100%',
		height: (Dimensions.get('window').width / 300) * 250,
		alignItems: 'center',
		justifyContent: 'center',
		transform: [{ scale: Dimensions.get('window').width / 300 }],
	},
})
