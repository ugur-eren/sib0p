import { StyleSheet } from 'react-native'
import Config from '../../Includes/Config'

export default StyleSheet.create({
	container: {
		width: '100%',
		flexDirection: 'row',
		padding: 10,
		alignItems: 'center',
	},
	imageContainer: {
		width: 50,
		height: 50,
	},
	image: {
		width: 50,
		height: 50,
		borderRadius: 50,
	},
	smallImageContainer: {
		width: 35,
		height: 35,
	},
	smallImage: {
		width: 35,
		height: 35,
		borderRadius: 35,
	},
	outerContent: {
		flex: 1,
		marginLeft: 10,
		flexDirection: 'row',
	},
	smallOuterContent: {
		flex: 1,
		marginLeft: 0,
		flexDirection: 'row',
	},
	innerContent: {
		marginHorizontal: 10,
		justifyContent: 'center',
	},
	usernameContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	username: {
		fontFamily: Config.fonts.semi,
	},
	usertag: {
		marginLeft: 5,
	},
	followButton: {
		alignItems: 'center',
		justifyContent: 'center',
	},
})
