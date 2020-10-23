import React from 'react'
import { View } from 'react-native'
import { withTheme } from 'react-native-paper'
import FastImage from 'react-native-fast-image'
import Header from '../../Components/Header/Header'
import Types from '../../Includes/Types/Types'
import styles from './styles'

interface Props {
	navigation: Types.Navigation<{
		image: string
		title: string
	}>
	theme: Types.Theme
}

class ImageViewer extends React.PureComponent<Props> {
	render() {
		let { theme } = this.props

		return (
			<View style={[styles.container, { backgroundColor: theme.colors.background }]}>
				<Header title={this.props.navigation.getParam('title')} />
				<View style={styles.container}>
					<FastImage source={{ uri: this.props.navigation.getParam('image') }} style={styles.image} resizeMode='contain' />
				</View>
			</View>
		)
	}
}

export default withTheme(ImageViewer)
