import React from 'react'
import { View, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import { Text, withTheme } from 'react-native-paper'
import IO from 'socket.io-client'
import Header from '../../Components/Header/Header'
import Types from '../../Includes/Types/Types'

interface Props {
	navigation: Types.Navigation
	theme: Types.Theme
}

interface State {
	connected: boolean
	messages: string[]
	messageValue: string
}

class Chat extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			connected: false,
			messages: [],
			messageValue: '',
		}
	}

	private socket: any = null

	componentDidMount() {
		console.log('connecting')

		this.socket = IO('http://34.65.221.236:3750', {
			path: '/socket.io',
			transports: ['websocket'],
		})
		this.socket.on('connect', () => {
			this.setState({ connected: true })
		})
		this.socket.on('disconnect', function () {
			this.setState({ connected: false })
		})

		this.socket.on('message', (msg: string) => {
			this.setState({ messages: [...this.state.messages, msg] })
		})
	}

	sendMessage = () => {
		this.socket.emit('message', this.state.messageValue)
		this.setState({ messages: [...this.state.messages, this.state.messageValue], messageValue: '' })
	}

	_renderChats = () => this.state.messages.map(this._renderChat)
	_renderChat = (message: string) => <Text>{message}</Text>

	render() {
		return (
			<View style={{ flex: 1 }}>
				<Header title='Mesajlar' />
				{this.state.connected ? <></> : <Text style={{ fontSize: 24, textAlign: 'center' }}>Bağlanılıyor...</Text>}
				<ScrollView style={{ flex: 1 }}>{this._renderChats()}</ScrollView>
				<View style={{ flexDirection: 'row', borderTopColor: 'red', borderTopWidth: 1 }}>
					<TextInput
						style={{ height: 59, flex: 1, borderRightColor: 'red', borderRightWidth: 1 }}
						value={this.state.messageValue}
						onChangeText={(text) => this.setState({ messageValue: text })}
						placeholder='mesaj'
					/>
					<TouchableOpacity onPress={this.sendMessage}>
						<Text>gönder</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}

export default withTheme(Chat)
