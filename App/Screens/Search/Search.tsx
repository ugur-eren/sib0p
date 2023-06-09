import React from 'react'
import { View, FlatList, SafeAreaView } from 'react-native'
import { IconButton, withTheme, Divider, Appbar } from 'react-native-paper'
import { TextInput } from 'react-native-gesture-handler'
import EmptyList from '../../Components/EmptyList/EmptyList'
import Relation from '../Relations/Relation'
import Loader from '../Relations/Loader'
import Types from '../../Includes/Types/Types'
import UserTypes from '../../Includes/Types/UserTypes'
import styles from './styles'
import Api from '../../Includes/Api'

interface Props {
	navigation: Types.Navigation
	theme: Types.Theme
}

interface State {
	loading: boolean
	searchValue: string
	result: UserTypes.Relations[]
}

class Search extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			loading: false,
			searchValue: '',
			result: [],
		}
	}
	private searchTimeout: any = null

	_onValueChange = (text: string) => {
		this.setState({ searchValue: text })
		clearTimeout(this.searchTimeout)
		this.searchTimeout = null
		this.searchTimeout = setTimeout(() => this.search(), 500)
	}

	search = async () => {
		this.setState({ loading: true })
		let screen = this.props.navigation.getScreenProps()
		let response = await Api.search({
			token: screen.user.token,
			search: this.state.searchValue,
		})

		if (response) {
			if (response.status) {
				this.setState({ loading: false, result: response.result })
			} else {
				if (response.error == 'no_login') {
					screen.logout(true)
				} else if (response.error === 'too_fast_action') {
					screen.error(screen.language.too_fast_action)
				} else {
					screen.unknown_error(response.error)
				}
			}
		} else {
			screen.unknown_error()
		}
	}

	_renderItem = ({ item }: { item: UserTypes.Relations }) => <Relation navigation={this.props.navigation} user={item} />
	_keyExtractor = (item: UserTypes.Relations) => item.username
	_itemSeperator = () => <Divider />
	_emptyComponent = () => (
		<EmptyList image={require('../../Assets/Images/no-comments.png')} title={this.props.navigation.getScreenProps().language.no_search_results} />
	)

	render() {
		let { theme } = this.props
		return (
			<View style={[styles.container, { backgroundColor: theme.colors.background }]}>
				<SafeAreaView style={[styles.topContainer, { backgroundColor: theme.colors.primary }]}>
					<Appbar.BackAction color={theme.colors.contrast} onPress={() => this.props.navigation.goBack()} />
					<TextInput
						value={this.state.searchValue}
						onChangeText={this._onValueChange}
						placeholder={this.props.navigation.getScreenProps().language.search}
						style={[styles.searchInput, { color: theme.colors.contrast }]}
						placeholderTextColor={theme.colors.halfContrast}
					/>

					<IconButton icon='search' onPress={this.search} />
				</SafeAreaView>

				{this.state.loading ? (
					<Loader theme={theme} />
				) : (
					<FlatList
						data={this.state.result}
						renderItem={this._renderItem}
						keyExtractor={this._keyExtractor}
						ItemSeparatorComponent={this._itemSeperator}
						ListEmptyComponent={this._emptyComponent}
					/>
				)}
			</View>
		)
	}
}

export default withTheme(Search)
