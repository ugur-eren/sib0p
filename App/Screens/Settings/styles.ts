import { StyleSheet } from 'react-native'
import Config from '../../Includes/Config'

export default StyleSheet.create({
	container: {
		flex: 1,
	},
	clearListStyle: {
		paddingHorizontal: 0,
		paddingVertical: 0,
		marginHorizontal: 0,
	},
	listIcon: {
		marginRight: 0,
		paddingHorizontal: 0,
	},
	anchorTouchable: {
		flexDirection: 'row',
		flex: 1,
		alignItems: 'center',
		marginRight: 10,
	},
	anchorTitle: {
		fontFamily: Config.fonts.semi,
		fontSize: 16,
		marginRight: 10,
	},
	clearListMenuStyle: {
		paddingHorizontal: 0,
		paddingVertical: 0,
		marginHorizontal: 0,
		alignItems: 'center',
	},
})

const EditProfileStyles = StyleSheet.create({
	container: {
		flex: 1,
	},
	topContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 42,
	},
	topLogo: {
		height: 60,
		width: '100%',
		marginBottom: 18,
	},
	topSubtitle: {
		fontSize: 20,
		fontFamily: Config.fonts.semi,
	},
	centerContainer: {
		paddingHorizontal: 16,
		paddingVertical: 32,
		paddingBottom: 16,
	},
	centerText: {
		textAlign: 'right',
		fontSize: 15,
		fontFamily: Config.fonts.semi,
	},
	bottomContainer: {
		paddingHorizontal: 16,
		paddingVertical: 32,
	},
	bottomText: {
		textAlign: 'center',
		fontFamily: Config.fonts.semi,
	},
	agreement: {
		flex: 1,
		flexDirection: 'row',
	},
	agreementTextTouchable: {
		flex: 1,
	},
	agreementText: {
		flex: 1,
		flexWrap: 'wrap',
		textAlignVertical: 'center',
	},
	landingCenter: {
		paddingHorizontal: 16,
		flex: 1,
		justifyContent: 'center',
	},
	buttonContainer: {
		marginBottom: 20,
	},
})

export { EditProfileStyles }
