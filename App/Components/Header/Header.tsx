import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Appbar, Surface } from 'react-native-paper'
import { withNavigation } from 'react-navigation'

import Config from '../../Includes/Config'
import Types from '../../Includes/Types/Types'

interface Props {
	title: string
	subtitle?: string
	avatar?: React.ComponentClass | React.FunctionComponent
	hideBack?: boolean
	navigation?: Types.Navigation
}

interface State {}

class Header extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {}
	}

	render() {
		return (
			<Appbar.Header>
				{!this.props.hideBack && <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />}
				{this.props.avatar ? <this.props.avatar /> : <></>}
				<Appbar.Content style={this.props.hideBack ? { left: 5 } : { left: -15 }} title={this.props.title} subtitle={this.props.subtitle} />
			</Appbar.Header>
		)
	}
}

export default withNavigation(Header as any) as React.ComponentType<Props>

const styles = StyleSheet.create({})
