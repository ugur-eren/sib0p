import { StyleSheet } from 'react-native'

import Colors from '../../../Includes/Colors'

export default StyleSheet.create({
	topLevelContainer: {
		borderRadius: 5,
		overflow: 'hidden'
	},
	container: {
		padding: 5,
		borderRadius: 5,
		overflow: 'hidden'
	},
	inner: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center'
	},
	checkBox: {
		width: 19,
		height: 19,
		borderWidth: 1,
		borderColor: Colors.primary,
		backgroundColor: Colors.primary,
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center'
	}
})