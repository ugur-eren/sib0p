import { StyleSheet } from 'react-native'

export default StyleSheet.create({
	container: {
		marginBottom: 21,
	},
	inner: {
		borderWidth: 1,
		borderRadius: 4,
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 12,
	},
	input: {
		flex: 1,
	},
	leftIconStyle: {
		marginRight: 10,
	},
	rightIconStyle: {
		marginLeft: 10,
		marginRight: 0,
	},
	errorText: {
		textAlign: 'right',
		marginTop: 3,
	},
})
