import { StyleSheet } from 'react-native'

export default StyleSheet.create({
	container: {
		opacity: 0.5,
		position: 'absolute',
		top: 0,
		left: 0,
		elevation: 0,
		width: '100%',
	},
	inner: {
        flexDirection: 'row',
        alignItems: 'center',
		width: '100%',
	},
	backButton: {
		marginRight: 20
	},
	leftPlus: {
		left: 5
	},
	leftMinus: {
		left: -15
	}
})
