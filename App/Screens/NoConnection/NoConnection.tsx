import React from 'react'
import { View } from 'react-native'
import { Text, Button, withTheme } from 'react-native-paper'
import Types from '../../Includes/Types/Types'
import EmptyList from '../../Components/EmptyList/EmptyList'

interface Props {
	navigation: Types.Navigation
	theme: Types.Theme
}

interface State {
	loading: boolean
}

class NoConnection extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			loading: false,
		}
	}

	tryAgain = async () => {
		this.setState({ loading: true })
		await this.props.navigation.getScreenProps().restart()
		this.setState({ loading: false })
	}

	render() {
		let { theme } = this.props
		let screen = this.props.navigation.getScreenProps()

		return (
			<View style={{ flex: 1, backgroundColor: theme.colors.background }}>
				<EmptyList image={require('../../Assets/Images/no-connection.png')} title={screen.language.no_connection} />

				<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
					<Button mode='contained' onPress={this.tryAgain} loading={this.state.loading}>
						{screen.language.try_again}
					</Button>
				</View>
			</View>
		)
	}
}

export default withTheme(NoConnection)
