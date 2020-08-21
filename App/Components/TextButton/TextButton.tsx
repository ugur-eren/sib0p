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
	containerStyle?: ViewStyle
	style?: TextStyle
	onPress: () => any
	language: Types.Language
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

	onPress = async () => {
		if (!this.state.loading && this.props.loadable) {
			this.setState({ loading: true })
			await this.props.onPress()
			this.setState({ loading: false })
		} else if (this.props.loadable) {
			this.props.onPress()
		}
	}

	render() {
		return (
			<TouchableOpacity onPress={this.onPress} style={[styles.container, this.props.containerStyle]}>
				<Text style={[{ color: this.state.loading ? this.props.theme.colors.halfContrast : this.props.theme.colors.main }, this.props.style]}>
					{this.state.loading ? this.props.language.loading : this.props.label}
				</Text>
			</TouchableOpacity>
		)
	}
}

export default withTheme(TextButton)
