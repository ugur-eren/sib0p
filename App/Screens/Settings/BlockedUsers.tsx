import React from 'react'
import { View, FlatList } from 'react-native'
import { withTheme, Divider } from 'react-native-paper'
import EmptyList from '../../Components/EmptyList/EmptyList'
import Relation from '../Relations/Relation'
import Loader from '../Relations/Loader'
import Types from '../../Includes/Types/Types'
import UserTypes from '../../Includes/Types/UserTypes'
import styles from './styles'
import Api from '../../Includes/Api'
import Header from '../../Components/Header/Header'

interface Props {
	navigation: Types.Navigation
	theme: Types.Theme
}

interface State {
	loading: boolean
	searchValue: string
	users: UserTypes.Relations[]
}

class BlockedUsers extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			loading: true,
			searchValue: '',
			users: [],
		}
	}

	componentDidMount() {
		this.init()
	}

	init = async () => {
		if (!this.state.loading) this.setState({ loading: true })
		let screen = this.props.navigation.getScreenProps()
		let response = await Api.getBlockedUsers({
			token: screen.user.token,
		})

		if (response) {
			if (response.status) {
				this.setState({ loading: false, users: response.users })
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

	unblock = async (username: string) => {
		let screen = this.props.navigation.getScreenProps()

		let response = await Api.doAction({
			token: screen.user.token,
			type: 'unblock',
			username: username,
		})
		if (response) {
			if (response.status) {
				let users = this.state.users
				users = users.filter((val) => val.username !== username)
				this.setState({ users: users })
				this.props.navigation.getScreenProps().removeProfileDataCache(username)
				screen.error(screen.language.user_unblock_success)
			} else {
				if (response.error === 'no_login') {
					screen.logout(true)
				} else if (response.error === 'too_fast_action') {
					screen.error(screen.language.too_fast_action)
				} else if (response.error === 'wrong_username') {
					screen.error(screen.language.wrong_username)
				} else if (response.error === 'no_user') {
					screen.error(screen.language.no_user_error)
				} else {
					screen.unknown_error(response.error)
				}
			}
		} else {
			screen.unknown_error()
		}
	}

	_renderItem = ({ item }: { item: UserTypes.Relations }) => <Relation navigation={this.props.navigation} user={item} unblock={this.unblock} />
	_keyExtractor = (item: UserTypes.Relations) => item.username
	_itemSeperator = () => <Divider />
	_emptyComponent = () => (
		<EmptyList image={require('../../Assets/Images/no-comments.png')} title={this.props.navigation.getScreenProps().language.no_blocked_users} />
	)

	render() {
		let { theme } = this.props
		return (
			<View style={[styles.container, { backgroundColor: theme.colors.background }]}>
				<Header title={this.props.navigation.getScreenProps().language.blocked_users} />

				{this.state.loading ? (
					<Loader theme={theme} />
				) : (
					<FlatList
						data={this.state.users}
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

export default withTheme(BlockedUsers)
