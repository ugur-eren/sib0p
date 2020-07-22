import { StyleSheet } from 'react-native'
import Config from '../../Includes/Config'

export default StyleSheet.create({
	container: {
		width: '100%',
		borderRadius: 5,
		overflow: 'hidden',
		alignItems: 'center',
	},
	touchable: {
		width: '100%',
		alignItems: 'center',
	},
	inner: {
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		paddingVertical: 15,
	},
	text: {
		fontSize: 16,
		fontFamily: Config.fonts.bold,
	},
	spinner: {
		marginRight: 20,
		left: -20,
	},
	innerContainerUnusable: {
		flex: 1,
		width: '100%',
	},
	topBlock: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'transparent',
	},
	gradient: {
		width: '100%',
		borderRadius: 5,
		overflow: 'hidden',
		alignItems: 'center',
	},
})
