import React from 'react'
import { View } from 'react-native'
import { Text, withTheme } from 'react-native-paper'
import Config from '../../Includes/Config'
import Types from '../../Includes/Types/Types'
import NotificationTypes from '../../Includes/Types/NotificationTypes'
import styles from './styles'
import FastImage from 'react-native-fast-image'
import Feather from 'react-native-vector-icons/Feather'

interface Props {
	theme: Types.Theme
	notification: NotificationTypes.Notification
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
			<View style={{ flexDirection: 'row', padding: 10 }}>
				<FastImage source={{ uri: notification.user.profilePhoto }} style={{ width: 50, height: 50, borderRadius: 50 }} />
				<View style={{ marginLeft: 10, flex: 1, justifyContent: 'center' }}>
					<Text style={{}} numberOfLines={1}>
						<Text style={{ fontFamily: Config.fonts.semi }}>{notification.user.username}</Text>
						{'   '}
						<Text style={{}}>
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
					<Text style={{}}>
						<Feather name='clock' style={{}} /> <Text style={{}}>{notification.time}</Text>
					</Text>
				</View>
			</View>
		)
	}
}

export default withTheme(Notification)
