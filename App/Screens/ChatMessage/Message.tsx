import React from 'react'
import { View } from 'react-native'
import { Text, withTheme } from 'react-native-paper'
import FastImage from 'react-native-fast-image'
import Feather from 'react-native-vector-icons/Feather'
import Types from '../../Includes/Types/Types'
import MessageTypes from '../../Includes/Types/MessageTypes'
import styles from './styles'

interface Props {
	theme: Types.Theme
	message: MessageTypes.Message
	user: MessageTypes.MessageUser
}

class MyMessageComp extends React.PureComponent<Props, { sending: boolean }> {
	render() {
		let { message, theme } = this.props

		return (
			<View style={styles.myMessageContainer}>
				<View style={styles.myMessage}>
					<Text style={[styles.myMessageText, { backgroundColor: theme.colors.main, color: theme.colors.surface }]}>{message.message}</Text>
					{message.sending ? <Feather name='send' color={theme.colors.contrast} size={14} style={styles.sendingIcon} /> : <></>}
				</View>
			</View>
		)
	}
}
const MyMessage = withTheme(MyMessageComp)

class HisMessageComp extends React.PureComponent<Props> {
	render() {
		let { message, user, theme } = this.props

		return (
			<View style={styles.hisMessageContainer}>
				<FastImage source={{ uri: user.profilePhoto }} style={styles.hisAvatar} />
				<View style={styles.hisMessage}>
					<Text style={[styles.hisMessageText, { backgroundColor: theme.colors.primary }]}>{message.message}</Text>
				</View>
			</View>
		)
	}
}
const HisMessage = withTheme(HisMessageComp)

class Message extends React.PureComponent<Props> {
	render() {
		if (this.props.message.isMine) {
			return <MyMessage {...this.props} />
		} else {
			return <HisMessage {...this.props} />
		}
	}
}

export default withTheme(Message)
