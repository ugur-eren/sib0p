import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Appbar, withTheme } from 'react-native-paper'
import { withNavigation } from 'react-navigation'
import FastImage from 'react-native-fast-image'
import styles from './styles'
import Types from '../../Includes/Types/Types'

interface Props {
	navigation?: Types.Navigation
	theme?: Types.Theme
	onLogoPress?: () => any
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
	onChatPress = () => {
		this.props.navigation.navigate('Chat')
	}

	render() {
		return (
			<Appbar.Header>
				<Appbar.Action size={22} icon='search' color={this.props.theme.colors.contrast} onPress={this.onSearchPress} />
				<TouchableOpacity onPress={this.props.onLogoPress} style={styles.logoContainer}>
					<FastImage source={require('../../Assets/Images/logo-wide.png')} style={styles.logo} resizeMode='contain' />
				</TouchableOpacity>
				<Appbar.Action size={22} icon='send' color={this.props.theme.colors.contrast} onPress={this.onChatPress} />
			</Appbar.Header>
		)
	}
}

export default withTheme(withNavigation(MainHeader as any) as any) as React.ComponentType<Props>
