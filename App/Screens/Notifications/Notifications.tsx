import React from 'react'
import { View } from 'react-native'
import { withTheme } from 'react-native-paper'
import { FlatList } from 'react-native-gesture-handler'
import Types from '../../Includes/Types/Types'
import NotificationTypes from '../../Includes/Types/NotificationTypes'
import styles from './styles'
import Notification from './Notification'

interface Props {
	navigation: Types.Navigation
	theme: Types.Theme
}

interface State {}

class Notifications extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {}

		this.notifications = [
			{
				id: '1',
				user: {
					username: 'dersas',
					profilePhoto: 'https://sib0p.com/inc/imgs/pps/1595005934-1514.jpg',
				},
				time: '8 Dakika önce',
				type: 'comment',
				post: '1',
				content:
					'Yeter Artık hicbir kuralınızı ihlal etmeyen bir postu niye kaldırıyorsunuz acaba ? Bide dalga geçiyorsunuz gönderi 1 like almış diye yazık valla yazık....',
			},
			{
				id: '2',
				user: {
					username: 'atilla',
					profilePhoto: 'https://sib0p.com/inc/imgs/pps/default.jpg',
				},
				time: '2 Saat önce',
				type: 'commentlike',
				post: '2',
			},
			{
				id: '3',
				user: {
					username: 'edavcis',
					profilePhoto: 'https://sib0p.com/inc/imgs/pps/1593635668-1461.jpg',
				},
				time: '4 Saat önce',
				type: 'commentlike',
				post: '2',
			},
		]
	}

	private notifications: NotificationTypes.Notification[]

	goToPost = (post: string) => {
		this.props.navigation.navigate("Post", {post})
	}
	_renderItem = ({ item }: { item: NotificationTypes.Notification }) => (
		<Notification notification={item} goToPost={this.goToPost} />
	)
	_keyExtractor = (item: NotificationTypes.Notification) => item.id

	render() {
		return (
			<View style={[styles.container, { backgroundColor: this.props.theme.colors.background }]}>
				<FlatList data={this.notifications} renderItem={this._renderItem} keyExtractor={this._keyExtractor} />
			</View>
		)
	}
}

export default withTheme(Notifications)
