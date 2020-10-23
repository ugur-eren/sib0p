import { StyleSheet, Platform } from 'react-native'

const CommentStyles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
		paddingBottom: 0,
	},
	content: {
		paddingHorizontal: 10,
	},
	buttonsContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
	likeButton: {
		paddingTop: 3,
	},
})

const CommentsStyles = StyleSheet.create({
	container: {
		flex: 1,
	},
	itemSeperator: {
		height: 1,
	},
	writeCommentContainer: {
		flexDirection: 'row',

		elevation: 2,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.2,
		shadowRadius: 1.41,
	},
	writeCommentInput: {
		paddingHorizontal: 10,
		marginLeft: 6,
		flex: 1,
		...(Platform.OS === 'ios' ? { height: 49 } : {}),
	},
	loader: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
})

export { CommentStyles, CommentsStyles }
