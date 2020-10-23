import React from 'react'

import { Text, View } from 'react-native'
import { withTheme } from 'react-native-paper'
import Header from '../../Components/Header/Header'
import Types from '../../Includes/Types/Types'

interface Props {
	navigation: Types.Navigation
	theme: Types.Theme
}

interface State {
	loading: boolean
}

class UserShop extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			loading: false,
		}
	}

	render() {
		return (
			<View style={{ flex: 1 }}>
				<Header title='Mağaza' />

				<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
					<Text style={{ fontSize: 24 }}>Çok Yakında!</Text>
				</View>
			</View>
		)
	}
}

export default withTheme(UserShop)
