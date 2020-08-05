import React from 'react'
import { View } from 'react-native'
import { Text, withTheme } from 'react-native-paper'
import FastImage, { Source as ImageSource } from 'react-native-fast-image'
import Types from '../../Includes/Types/Types'
import styles from './styles'

interface Props {
	theme: Types.Theme
	image: ImageSource
	title: string
}

class EmptyList extends React.PureComponent<Props> {
	render() {
		return (
			<View style={styles.emptyContainer}>
				<View style={styles.emptyImageFix} />
				<FastImage source={this.props.image} style={styles.emptyImage} resizeMode='contain' />
				<Text style={styles.emptyText}>{this.props.title}</Text>
			</View>
		)
	}
}

export default withTheme(EmptyList)
