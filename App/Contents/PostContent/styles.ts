import { StyleSheet } from 'react-native'

export default StyleSheet.create({
	post: {
		width: '100%',
		marginTop: 10,
	},
	loader: {
		position: 'absolute',
		left: 0,
		top: 0,
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	mutedContainer: {
		position: 'absolute',
		top: 10,
		right: 10,
	},
	muted: {
		textShadowColor: 'rgba(0, 0, 0, 1)',
		textShadowOffset: { width: 0, height: 0 },
		textShadowRadius: 10,
	},
	errorTouchable: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	errorText: {
		textAlign: 'center',
	},
	likeAnim: {
		position: 'absolute',
		left: 0,
		top: 0,
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
})
