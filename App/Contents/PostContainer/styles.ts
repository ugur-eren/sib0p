import { StyleSheet } from 'react-native'
import Config from '../../Includes/Config'

export default StyleSheet.create({
	post: {
		width: '100%',
	},
	carouselContainer: {
		position: 'relative',
		alignItems: 'center',
	},
	slideStyle: {
		justifyContent: 'center',
	},
	paginationContainer: {
		position: 'absolute',
		bottom: 10,
		padding: 5,
		margin: 5,
		borderRadius: 20,
		paddingVertical: 10,
	},
	paginationDotStyle: {
		width: 7,
		height: 7,
		borderRadius: 50,
		marginHorizontal: 2,
	},
	inactiveDotStyle: {
		marginHorizontal: 2,
	},
})
