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

		return (
			<View style={{ flex: 1, backgroundColor: theme.colors.background }}>
				<EmptyList
					image={require('../../Assets/Images/no-connection.png')}
					title={'Sunucu ile iletişim kurulamadı. \n\n Lütfen internet bağlantığınızı kontrol ediniz ve tekrar deneyiniz.'}
				/>

				<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
					<Button mode='contained' onPress={this.tryAgain} loading={this.state.loading}>
						Tekrar Dene
					</Button>
				</View>
			</View>
		)
	}
}

export default withTheme(NoConnection)
