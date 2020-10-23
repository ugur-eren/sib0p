import { StyleSheet } from 'react-native'

export default StyleSheet.create({
	container: {
		flex: 1,
	},
	headerAvatar: {
		width: 35,
		height: 35,
		borderRadius: 35,
		marginRight: 10,
	},
	listHeaderStyle: {
		height: 20,
	},

	hisMessageContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		paddingHorizontal: 10,
	},
	hisAvatar: {
		width: 30,
		height: 30,
		borderRadius: 30,
		marginRight: 10,
	},
	hisMessage: {
		flexDirection: 'row',
		maxWidth: '60%',
		marginVertical: 5,
	},
	hisMessageText: {
		flex: 1,
		backgroundColor: 'red',
		padding: 5,
		paddingHorizontal: 10,
		borderRadius: 10,
		borderBottomLeftRadius: 0,
	},

	myMessageContainer: {
		flex: 1,
		alignItems: 'flex-end',
		paddingHorizontal: 10,
	},
	myMessage: {
		flexDirection: 'row',
		maxWidth: '60%',
		marginVertical: 5,
		alignItems: 'flex-end',
	},
	myMessageText: {
		backgroundColor: 'red',
		padding: 5,
		paddingHorizontal: 10,
		borderRadius: 10,
		borderBottomRightRadius: 0,
	},
	sendingIcon: {
		marginLeft: 10
	}
})
