import React from 'react'
import { View, SafeAreaView } from 'react-native'
import { Appbar, Surface, withTheme } from 'react-native-paper'
import { withNavigation } from 'react-navigation'
import styles from './styles'
import Types from '../../Includes/Types/Types'

interface Props {
    navigation?: Types.Navigation
    theme?: Types.Theme
    title?: string
    subtitle?: string
	hideBack?: boolean
	onSettings?: () => any
}

interface State {}

class TransparentHeader extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {}
	}

	_goBack = () => {
		this.props.navigation.goBack()
	}

	render() {
		return (
			<Surface style={styles.container}>
				<SafeAreaView style={styles.inner}>
					{this.props.hideBack ? <></> : <Appbar.BackAction size={22} color={this.props.theme.colors.contrast} onPress={this._goBack} style={{marginRight: 20}} />}
					<Appbar.Content style={this.props.hideBack ? { left: 5 } : { left: -15 }} color={this.props.theme.colors.contrast} title={this.props.title} subtitle={this.props.subtitle} />

					{this.props.onSettings ? <Appbar.Action size={22} icon='settings' color={this.props.theme.colors.contrast} onPress={this.props.onSettings} /> : <></>}
				</SafeAreaView>
			</Surface>
		)
	}
}

export default withTheme(withNavigation(TransparentHeader as any) as any) as React.ComponentType<Props>
