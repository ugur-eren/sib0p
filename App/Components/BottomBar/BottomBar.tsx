import React from 'react'

import { NavigationState, ThemeContext } from 'react-navigation'
import { withTheme } from 'react-native-paper'

import TabBar from '../../Packages/react-native-fluidbottomnavigation'
import Types from '../../Includes/Types/Types'

interface Props {
	navigationState: NavigationState
	navigation: Types.Navigation
	theme: Types.Theme
}

class BottomBar extends React.Component<Props, { activeTab: number }> {
	constructor(props: Props) {
		super(props)

		this.change = null
	}

	static contextType = ThemeContext

	private change: null

	_onPress = (tabIndex: number) => {
		this.setState({ activeTab: tabIndex })
		this.props.navigation.navigate(this.props.navigationState.routes[tabIndex].routeName)
	}

	_change = (change: any) => (this.change = change)

	render() {
		let theme = this.props.theme

		let tabBarItems = this.props.navigationState.routes.map((route, key) => {
			return {
				title: route.params.tabBarName || route.routeName,
				icon: route.params.tabBarIcon,
				tintColor: this.props.navigationState.index === key ? theme.colors.bottomBarActive : theme.colors.bottomBarInactive,
				...(this.props.navigationState.index === key && { default: true }),
			}
		})

		if (this.change) {
			;(this.change as any)(this.props.navigationState.index)
		}

		return (
			<TabBar
				onPress={this._onPress}
				change={this._change}
				tintColor={theme.colors.bottomBarTint}
				containerBackgroundColor={theme.colors.primary}
				itemMaskBackgroundColor={theme.colors.primary}
				values={tabBarItems}
			/>
		)
	}
}

export default withTheme(BottomBar)
