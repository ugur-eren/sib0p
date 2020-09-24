import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Text, withTheme } from 'react-native-paper'
import FastImage from 'react-native-fast-image'
import Timer from '../../Components/Timer/Timer'
import Functions from '../../Includes/Functions'
import MessageTypes from '../../Includes/Types/MessageTypes'
import Types from '../../Includes/Types/Types'
import styles from './styles'

interface Props {
	navigation: Types.Navigation
	theme: Types.Theme
	user: MessageTypes.MessageUser
}

class ChatUser extends React.PureComponent<Props, {}> {
	navigateToMessage = () => {
		this.props.navigation.navigate('ChatMessage', { user: this.props.user })
	}

	render() {
		let { theme, navigation, user } = this.props
		let screen = navigation.getScreenProps()

		return (
			<TouchableOpacity onPress={this.navigateToMessage} style={styles.userContainer}>
				<View style={styles.imageContainer}>
					<FastImage source={{ uri: user.profilePhoto }} style={styles.image} />
					{user.lastMessageSeen ? <></> : <View style={[styles.notSeen, { borderColor: theme.colors.background }]} />}
				</View>

				<View style={styles.content}>
					<Text style={styles.username}>{user.username}</Text>

					<Text numberOfLines={1}>{user.lastMessage}</Text>
				</View>

				<Timer time={Functions.convertTimeNoAgo(user.time, screen.DataCache().currentTime, screen.language)} />
			</TouchableOpacity>
		)
	}
}

export default withTheme(ChatUser)
