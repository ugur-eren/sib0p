import React from 'react'
import { View, TextInput } from 'react-native'
import { Appbar, Surface } from 'react-native-paper'
import { withNavigation } from 'react-navigation'

import Config from '../../Includes/Config'
import Types from '../../Includes/Types/Types'

interface Props {
	customRef?: any
	
	title: string
	subtitle?: string
	hideBack?: boolean
	navigation?: Types.Navigation
	search?: (text: string) => any
}

interface State {
	searchTextOpen: boolean
	searchText: string
}

class Header extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			searchTextOpen: false,
			searchText: '',
		}
	}

	private searchTimeout = null

	componentDidMount(){
		if (this.props.customRef){
			this.props.customRef({
				getSearchText: this.getSearchText
			})
		}
	}

	private toggleSearch = () => {
		this.setState({ searchTextOpen: !this.state.searchTextOpen })
	}

	private onChangeText = (text: string) => {
		this.setState({ searchText: text })

		if (text.length > 2){
			clearTimeout(this.searchTimeout)
			this.searchTimeout = null
	
			this.searchTimeout = setTimeout(() => {
				this.props.search(text)
			}, 250)
		}

		if (text.length < 1){
			clearTimeout(this.searchTimeout)
			this.searchTimeout = null
			this.props.search(text)
		}
	}

	public getSearchText = () => {
		return this.state.searchText
	}

	render() {
		return (
			<Appbar.Header>
				{!this.props.hideBack && <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />}
				<Appbar.Content
					style={this.props.hideBack ? { left: 5 } : { left: -15 }}
					title={this.props.title}
					subtitle={this.props.subtitle}
				/>
			</Appbar.Header>
		)
	}
}

export default withNavigation(Header as any) as React.ComponentType<Props>
