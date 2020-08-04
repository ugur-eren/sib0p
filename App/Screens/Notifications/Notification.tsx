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

interface Props {
	theme: Types.Theme
	notification: NotificationTypes.Notification
	currentTime: number
	goToPost: (post: string) => void
}

interface State {}

class Notification extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {}
	}
	render() {
		let { notification, theme } = this.props

		return (
			<View style={[styles.notification, { backgroundColor: theme.colors.surface }]}>
				<FastImage source={{ uri: notification.user.profilePhoto }} style={styles.userPhoto} />
				<View style={styles.inner}>
					<Text numberOfLines={1}>
						<Text style={{ fontFamily: Config.fonts.semi }}>{notification.user.username}</Text>
						{'   '}
						<Text>
							{notification.type === 'comment'
								? 'Senin gönderine yorum yaptı'
								: notification.type === 'commentlike'
								? 'Senin yorumunu beğendi'
								: notification.type === 'follow'
								? 'Seni takip etmeye başladı'
								: notification.type === 'like'
								? 'Senin gönderini beğendi'
								: notification.type === 'commenttag'
								? 'Seni bir yorumda etiketledi'
								: notification.type === 'posttag'
								? 'Seni bir gönderide etiketledi'
								: ''}
						</Text>
					</Text>
					{notification.content ? <Text>{notification.content}</Text> : <></>}
					<Text>
						<Feather name='clock' /> <Text>{Functions.convertTime(notification.time, this.props.currentTime)}</Text>
					</Text>
				</View>
			</View>
		)
	}
}

export default withTheme(Notification)
