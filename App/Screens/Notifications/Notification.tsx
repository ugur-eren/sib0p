import React from 'react'
import { View } from 'react-native'
import { Text, withTheme } from 'react-native-paper'
import FastImage from 'react-native-fast-image'
import Feather from 'react-native-vector-icons/Feather'
import Config from '../../Includes/Config'
import Functions from '../../Includes/Functions'
import Types from '../../Includes/Types/Types'
import NotificationTypes from '../../Includes/Types/NotificationTypes'
import styles from './styles'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface Props {
	navigation: Types.Navigation
	theme: Types.Theme
	notification: NotificationTypes.Notification
	currentTime: number
}

interface State {}

class Notification extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {}
	}
	private goToUserActive: boolean = false

	goToPost = () => {
		if (!this.goToUserActive) {
			if (this.props.notification.post) {
				this.props.navigation.navigate('SinglePost', { post: this.props.notification.post })
			} else {
				this.goToUser()
			}
		} else {
			this.goToUserActive = false
		}
	}

	goToUser = () => {
		this.goToUserActive = true
		this.props.navigation.push('UserProfile', { username: this.props.notification.user.username })
	}

	render() {
		let { notification, theme } = this.props

		return (
			<TouchableOpacity onPress={this.goToPost} style={[styles.notification, { backgroundColor: theme.colors.surface }]}>
				<TouchableOpacity onPress={this.goToUser}>
					{notification.type === 'warning' ? (
						<Feather name='alert-circle' size={46} color={theme.colors.main} />
					) : (
						<FastImage source={{ uri: notification.user.profilePhoto }} style={styles.userPhoto} />
					)}
				</TouchableOpacity>
				<View style={styles.inner}>
					<Text numberOfLines={1}>
						<Text style={{ fontFamily: Config.fonts.semi }}>{notification.user.username}</Text>
						{'   '}
						<Text>
							{notification.type === 'comment'
								? 'senin gönderine yorum yaptı'
								: notification.type === 'comment_like'
								? 'senin yorumunu beğendi'
								: notification.type === 'follow'
								? 'seni takip etmeye başladı'
								: notification.type === 'like'
								? 'senin gönderini beğendi'
								: notification.type === 'commtag'
								? 'seni bir yorumda etiketledi'
								: notification.type === 'posttag'
								? 'seni bir gönderide etiketledi'
								: notification.type === 'unfollow'
								? 'seni takipten çıkardı'
								: notification.type === 'warning'
								? 'Bir uyarı aldınız: '
								: 'senin gönderini beğendi'}
						</Text>
					</Text>
					{notification.content ? <Text>{notification.content}</Text> : <></>}
					<Text>
						<Feather name='clock' /> <Text>{Functions.convertTime(notification.time, this.props.currentTime)}</Text>
					</Text>
				</View>
			</TouchableOpacity>
		)
	}
}

export default withTheme(Notification)
