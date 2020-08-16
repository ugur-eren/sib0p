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
	outerContent: {
		flex: 1,
		marginLeft: 10,
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
		fontWeight: undefined,
	},
	usertag: {
		marginLeft: 5,
	},
	followButton: {
		alignItems: 'center',
		justifyContent: 'center',
	},
})
