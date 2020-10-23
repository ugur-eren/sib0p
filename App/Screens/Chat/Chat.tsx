import React from 'react'
import { View, RefreshControl } from 'react-native'
import { withTheme } from 'react-native-paper'
import { FlatList } from 'react-native-gesture-handler'
import ChatUser from './ChatUser'
import Header from '../../Components/Header/Header'
import Api from '../../Includes/Api'
import Types from '../../Includes/Types/Types'
import MessageTypes from '../../Includes/Types/MessageTypes'
import styles from './styles'

interface Props {
	navigation: Types.Navigation
	theme: Types.Theme
}

interface State {
	loading: boolean
	refreshing: boolean
	messageUsers: MessageTypes.MessageUser[]
}

class Chat extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			loading: true,
			refreshing: false,
			messageUsers: [],
		}
	}

	private newPageActive: boolean = false

	componentDidMount() {
		this.init()

		let screen = this.props.navigation.getScreenProps()

		let socket = screen.getSocket()
		
		socket.on('new_message', (data: { message: string; from_user: number; time: number }) => {
			this.state.messageUsers.map((user, index) => {
				if (data.from_user === user.user_id) {
					let messageUsers = [...this.state.messageUsers]
					messageUsers[index].lastMessage = data.message
					messageUsers[index].time = data.time
					messageUsers[index].lastMessageSeen = false
					this.setState({ messageUsers })
				}
			})
		})
	}

	init = async (refresh?: boolean, nextPage?: boolean) => {
		let screen = this.props.navigation.getScreenProps()
		if (refresh && !this.state.refreshing) {
			this.setState({ refreshing: true })
		}
		if (!refresh && !this.state.loading) {
			this.setState({ loading: true })
		}
		let messageUsers = await Api.getMessageUsers({
			token: screen.user.token,
			last: nextPage ? this.state.messageUsers[this.state.messageUsers.length - 1].time : 0,
		})

		let stateObject = {}

		if (messageUsers) {
			if (messageUsers.status) {
				stateObject = {
					messageUsers: nextPage ? [...this.state.messageUsers, ...messageUsers.users] : messageUsers.users,
					currentTime: messageUsers.currentTime,
				}
				screen.setCurrentTime(messageUsers.currentTime)
			} else {
				if (messageUsers.error === 'no_login') {
					screen.logout(true)
				} else if (messageUsers.error === 'too_fast_action') {
					screen.error(screen.language.too_fast_action)
				} else {
					screen.unknown_error(messageUsers.error)
				}
			}
		} else {
			return screen.unknown_error()
		}

		stateObject = { ...stateObject, loading: false, refreshing: false }

		this.setState(stateObject, () => {
			if (nextPage) this.newPageActive = false
		})
	}

	_renderItem = ({ item }: { item: MessageTypes.MessageUser }) => <ChatUser navigation={this.props.navigation} user={item} />
	_keyExtractor = (item: MessageTypes.MessageUser) => item.username

	onRefresh = () => {
		return this.init(true)
	}
	getNewPage = () => {
		if (this.newPageActive) return
		this.newPageActive = true
		return this.init(true, true)
	}

	render() {
		return (
			<View style={[styles.container, { backgroundColor: this.props.theme.colors.background }]}>
				<Header title='Mesajlar' />

				<FlatList
					data={this.state.messageUsers}
					renderItem={this._renderItem}
					keyExtractor={this._keyExtractor}
					refreshing={this.state.refreshing || this.state.loading}
					refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />}
					// onEndReached={this.getNewPage}
				/>
			</View>
		)
	}
}

export default withTheme(Chat)
