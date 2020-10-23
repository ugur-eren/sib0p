import { StyleSheet } from 'react-native'
import Config from '../../Includes/Config'

export default StyleSheet.create({
	container: {
		flex: 1,
	},
	userContainer: {
		flexDirection: 'row',
		paddingHorizontal: 10,
		marginVertical: 10,
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
	content: {
		flex: 1,
		marginHorizontal: 10,
	},
	username: {
		fontSize: 15,
		fontFamily: Config.fonts.semi,
	},
	notSeen: {
		backgroundColor: 'red',
		width: 13,
		height: 13,
		borderRadius: 13,
		borderWidth: 2,
		position: 'absolute',
		right: 2,
		bottom: 2,
	},
})
