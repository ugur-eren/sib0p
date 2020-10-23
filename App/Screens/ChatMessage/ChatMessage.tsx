import React from 'react'
import { View, FlatList, RefreshControl, ActivityIndicator } from 'react-native'
import { withTheme } from 'react-native-paper'
import FastImage from 'react-native-fast-image'
import Message from './Message'
import WriteMessage from './WriteMessage'
import Header from '../../Components/Header/Header'
import Api from '../../Includes/Api'
import Types from '../../Includes/Types/Types'
import MessageTypes from '../../Includes/Types/MessageTypes'
import styles from './styles'

interface Props {
	navigation: Types.Navigation<{
		user: MessageTypes.MessageUser
	}>
	theme: Types.Theme
}

interface State {
	loading: boolean
	refreshing: boolean
	messages: MessageTypes.Message[]
	socketConnected: boolean
}

class ChatMessage extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			loading: true,
			refreshing: false,
			messages: [],
			socketConnected: props.navigation.getScreenProps().isSocketConnected(),
		}
	}

	private newPageActive: boolean = false
	private hasNewPage: boolean = true
	private user = this.props.navigation.getParam('user')

	componentDidMount() {
		this.init()

		let screen = this.props.navigation.getScreenProps()
		let socket = screen.getSocket()
		socket.on('disconnect', this.onDisconnect)
		socket.on('message_status', this.onMessageStatus)
		socket.on('new_message', this.onNewMessage)
	}

	componentWillUnmount() {
		let screen = this.props.navigation.getScreenProps()
		let socket = screen.getSocket()

		socket.off('disconnect', this.onDisconnect)
		socket.off('message_status', this.onMessageStatus)
		socket.off('new_message', this.onNewMessage)
	}

	init = async (refresh?: boolean, nextPage?: boolean) => {
		let screen = this.props.navigation.getScreenProps()
		if (refresh && !this.state.refreshing) {
			this.setState({ refreshing: true })
		}
		if (!refresh && !this.state.loading) {
			this.setState({ loading: true })
		}

		let messages = await Api.getMessages({
			token: screen.user.token,
			last: nextPage ? this.state.messages[this.state.messages.length - 1].id : 0,
			user_id: this.user.user_id,
		})

		let stateObject = {}

		if (messages) {
			if (messages.status) {
				this.hasNewPage = messages.messages.length >= 20
				stateObject = {
					messages: nextPage ? [...this.state.messages, ...messages.messages] : messages.messages,
					currentTime: messages.currentTime,
				}
				screen.setCurrentTime(messages.currentTime)
			} else {
				if (messages.error === 'no_login') {
					screen.logout(true)
				} else if (messages.error === 'too_fast_action') {
					screen.error(screen.language.too_fast_action)
				} else {
					screen.unknown_error(messages.error)
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

	_renderItem = ({ item }: { item: MessageTypes.Message }) => <Message user={this.user} message={item} />
	_keyExtractor = (item: MessageTypes.Message) => item.id.toString()
	_renderHeaderAvatar = () => <FastImage source={{ uri: this.user.profilePhoto }} style={styles.headerAvatar} />
	_renderFooterComponent = () => <View style={styles.listHeaderStyle} />

	onRefresh = () => {
		this.hasNewPage = true
		return this.init(true)
	}
	getNewPage = () => {
		if (this.newPageActive || !this.hasNewPage) return
		this.newPageActive = true
		return this.init(false, true)
	}

	sendMessage = (message: string) => {
		if (!this.user.user_id) return false // error
		let screen = this.props.navigation.getScreenProps()
		let socket = screen.getSocket()

		let messageId = Math.random().toString(36).substring(7) + Math.random().toString(36).substring(7)

		socket.emit('message', {
			token: screen.user.token,
			to_user: this.user.user_id,
			message: message,
			message_id: messageId,
		})
		let messages: MessageTypes.Message[] = [
			{
				id: messageId as any,
				isMine: true,
				message: message,
				seen: false,
				time: screen.DataCache().currentTime,
				sending: true,
				error: false,
			},
			...this.state.messages,
		]
		this.setState({ messages: messages })
	}

	onDisconnect = () => {
		this.setState({ socketConnected: false })
	}

	onMessageStatus = (data: MessageTypes.MessageStatus) => {
		let messages: MessageTypes.Message[] = this.state.messages.map((message) => {
			if (data.message_id === (message.id as any)) {
				message.id = data.new_message_id
				message.sending = false
				message.error = !data.status
			}
			return message
		})
		this.setState({ messages: messages })
	}

	onNewMessage = (data: MessageTypes.NewMessage) => {
		if (data.from_user === this.user.user_id) {
			let messages: MessageTypes.Message[] = [
				{
					id: data.message_id,
					isMine: false,
					message: data.message,
					seen: true,
					time: data.time,
				},
				...this.state.messages,
			]
			this.setState({ messages: messages })
		}
	}

	render() {
		let { theme } = this.props
		let screen = this.props.navigation.getScreenProps()

		return (
			<View style={[styles.container, { backgroundColor: theme.colors.background }]}>
				<Header
					title={this.user.username}
					subtitle={this.state.socketConnected ? undefined : screen.language.could_not_connect_to_message_socket}
					avatar={this._renderHeaderAvatar}
				/>

				{this.state.loading ? (
					<View style={styles.loader}>
						<ActivityIndicator size='large' color={theme.colors.main} />
					</View>
				) : (
					<>
						<FlatList
							inverted
							data={this.state.messages}
							keyExtractor={this._keyExtractor}
							renderItem={this._renderItem}
							ListHeaderComponent={this._renderFooterComponent}
							refreshing={this.state.refreshing || this.state.loading}
							refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />}
							onEndReached={this.getNewPage}
						/>

						<WriteMessage sendMessage={this.sendMessage} language={screen.language} />
					</>
				)}
			</View>
		)
	}
}

export default withTheme(ChatMessage)
