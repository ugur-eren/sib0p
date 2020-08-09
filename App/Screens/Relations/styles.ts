import { StyleSheet } from 'react-native'
import Config from '../../Includes/Config'

const RelationsStyle = StyleSheet.create({
	container: {
		flex: 1,
	},
	listContainer: {
		flex: 1,
	},
})

const RelationStyles = StyleSheet.create({
	container: {
		padding: 10,
		flexDirection: 'row',
	},
	touchableContainer: {
		flex: 1
	},
	touchable: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	imageContainer: {
		width: 60,
		height: 60,
		marginRight: 15,
	},
	image: {
		width: 60,
		height: 60,
		borderRadius: 60,
	},
	username: {
		fontFamily: Config.fonts.semi,
		fontSize: 15,
		marginBottom: 2,
	},
})

export { RelationsStyle, RelationStyles }
