import React from 'react'
import { View } from 'react-native'
import { Appbar, withTheme } from 'react-native-paper'
import { withNavigation } from 'react-navigation'
import FastImage from 'react-native-fast-image'
import styles from './styles'
import Types from '../../Includes/Types/Types'

interface Props {
	navigation?: Types.Navigation
	theme?: Types.Theme
}

interface State {}

class MainHeader extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {}
	}

	onSearchPress = () => {
		this.props.navigation.navigate('Search')
	}

	render() {
		return (
			<Appbar.Header>
				<Appbar.Action size={22} color={this.props.theme.colors.primary} icon='search' />
				<View style={styles.logoContainer}>
					<FastImage source={require('../../Assets/Images/logo-wide.png')} style={styles.logo} resizeMode='contain' />
				</View>
				<Appbar.Action size={22} icon='search' color={this.props.theme.colors.contrast} onPress={this.onSearchPress} />
			</Appbar.Header>
		)
	}
}

export default withTheme(withNavigation(MainHeader as any) as any) as React.ComponentType<Props>
