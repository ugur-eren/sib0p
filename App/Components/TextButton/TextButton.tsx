import React from 'react'
import { ViewStyle, TextStyle } from 'react-native'
import { Text, withTheme } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Types from '../../Includes/Types/Types'
import styles from './styles'

interface Props {
    theme: Types.Theme
    label: string
	loadable?: boolean
	onPress: () => any
	containerStyle?: ViewStyle
	style?: TextStyle
}

interface State {
	loading: boolean
}

class TextButton extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			loading: false,
		}
	}

	render() {
		return (
			<TouchableOpacity style={[styles.container, this.props.containerStyle]}>
				<Text style={[{ color: this.props.theme.colors.main }, this.props.style]}>{this.props.label}</Text>
			</TouchableOpacity>
		)
	}
}

export default withTheme(TextButton)
