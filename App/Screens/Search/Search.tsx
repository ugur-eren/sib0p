import React from 'react'
import { View } from 'react-native'
import { IconButton, withTheme } from 'react-native-paper'
import Types from '../../Includes/Types/Types'
import styles from './styles'
import { TextInput } from 'react-native-gesture-handler'
import Feather from 'react-native-vector-icons/Feather'

interface Props {
	navigation: Types.Navigation
	theme: Types.Theme
}

interface State {
	searchValue: string
}

class Search extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			searchValue: '',
		}
	}

	_onValueChange = (text: string) => {
		this.setState({ searchValue: text })
	}

	search = () => {}

	render() {
		let { theme } = this.props
		return (
			<View style={[styles.container, { backgroundColor: theme.colors.background }]}>
				<View style={[styles.topContainer, { backgroundColor: theme.colors.primary }]}>
					<TextInput
						value={this.state.searchValue}
						onChange={this._onValueChange}
						placeholder='Arama'
						style={[styles.searchInput, { color: theme.colors.contrast }]}
						placeholderTextColor={theme.colors.halfContrast}
					/>

					<IconButton icon='search' onPress={this.search} />
				</View>
			</View>
		)
	}
}

export default withTheme(Search)
