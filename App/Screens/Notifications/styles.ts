import { StyleSheet } from 'react-native'

export default StyleSheet.create({
	container: {
		flex: 1,
	},
	notification: {
		flexDirection: 'row',
		padding: 10,
	},
	userPhoto: {
		width: 50,
		height: 50,
		borderRadius: 50,
	},
	inner: {
		marginLeft: 10,
		flex: 1,
		justifyContent: 'center',
	},
})
