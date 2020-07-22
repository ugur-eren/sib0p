import React from 'react'
import { View } from 'react-native'
import { Text, withTheme } from 'react-native-paper'
import Feather from 'react-native-vector-icons/Feather'
import Types from '../../Includes/Types/Types'
import styles from './styles'

interface Props {
	theme: Types.Theme
	time: string
}

class Timer extends React.PureComponent<Props> {
	render() {
		return (
			<View style={styles.container}>
				<Feather name='clock' size={15} style={styles.icon} color={this.props.theme.colors.contrast} />
				<Text>{this.props.time}</Text>
			</View>
		)
	}
}

export default withTheme(Timer)
