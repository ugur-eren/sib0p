import { StyleSheet, Dimensions } from 'react-native'
import Config from '../../Includes/Config'

export default StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		marginBottom: 20,
	},
	noBottomContent: {
		marginBottom: 0,
	},
	topContainer: {
		width: '100%',
		paddingVertical: 10,
		alignItems: 'center',
	},
	topInner: {
		flexDirection: 'row',
		marginBottom: 10,
		width: '100%',
	},
	topIcon: {
		marginRight: 15,
	},
	topTitle: {
		fontFamily: Config.fonts.semi,
	},
	tags: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	tag: {
		paddingHorizontal: 7,
		paddingVertical: 5,
		borderWidth: 1,
		marginRight: 10,
	},
	tagHash: {
		fontFamily: Config.fonts.semi,
	},
	divider: {
		width: '100%',
	},
	images: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	imageContainer: {
		width: (Dimensions.get('window').width - 60) / 2,
		borderRadius: 20,

		elevation: 2,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.2,
		shadowRadius: 1.41,

		marginBottom: 20,
	},
	imageContainerInner: {
		width: '100%',
		borderRadius: 20,
		overflow: 'hidden',
	},
	imageFix: {
		paddingBottom: '100%',
	},
	imageInner: {
		...StyleSheet.absoluteFillObject,
		alignItems: 'center',
		justifyContent: 'center',
	},
	imageTouchableFix: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'transparent',
	},
	removeIcon: {
		position: 'absolute',
		right: -20,
		top: -20,

		elevation: 2,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.2,
		shadowRadius: 1.41,
	},
	submitButton: {
		elevation: 2,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.2,
		shadowRadius: 1.41,
	},
	submitButtonTouchable: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 15,
	},
	submitIcon: {
		marginRight: 10,
	},
	submitText: {
		fontFamily: Config.fonts.semi,
		fontSize: 16,
	},
	selectorContainer: {
		position: 'absolute',
		left: 0,
		top: 0,
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	selectorInner: {
		flexDirection: 'row',
	},
	selectorOption: {
		padding: 50,
		alignItems: 'center',
		justifyContent: 'center',

		elevation: 2,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.2,
		shadowRadius: 1.41,
	},
	selectorOptionItem: {
		marginTop: 10,
		fontFamily: Config.fonts.semi,
	},
	loading: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingBottom: 20,
	}
})
