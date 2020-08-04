import React from 'react'
import { View, RefreshControl } from 'react-native'
import { withTheme, Divider } from 'react-native-paper'
import { FlatList } from 'react-native-gesture-handler'
import Types from '../../Includes/Types/Types'
import NotificationTypes from '../../Includes/Types/NotificationTypes'
import styles from './styles'
import Notification from './Notification'
import Api from '../../Includes/Api'

interface Props {
	navigation: Types.Navigation
	theme: Types.Theme
}

interface State {
	loading: boolean
	refreshing: boolean
	notifications: NotificationTypes.Notification[]
	currentTime: number
}

class Notifications extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			loading: true,
			refreshing: false,
			notifications: [],
			currentTime: 0,
		}
	}

	componentDidMount() {
		this.init()
	}

	init = async (refresh?: boolean, nextPage?: boolean) => {
		if (!refresh && !this.state.loading) {
			this.setState({ loading: true })
		}
		let notifs = await Api.getNotifications({
			token: this.props.navigation.getScreenProps().user.token,
			last: nextPage ? this.state.notifications[this.state.notifications.length - 1].time : 0,
		})
		let stateObject = {}

		if (notifs) {
			if (notifs.status) {
				stateObject = {
					notifications: nextPage ? [...this.state.notifications, ...notifs.notifications] : notifs.notifications,
					currentTime: notifs.currentTime,
				}
			} else {
				if (notifs.error === 'no_login') {
					this.props.navigation.getScreenProps().logout(true)
				} else {
					this.props.navigation.getScreenProps().unknown_error(notifs.error)
				}
			}
		} else {
			this.props.navigation.getScreenProps().unknown_error()
		}

		stateObject = { ...stateObject, loading: false }

		this.setState(stateObject)
	}

	refresh = async () => {
		return this.init(true)
	}

	getNextPage = async () => {
		return this.init(true, true)
	}

	goToPost = (post: string) => {
		this.props.navigation.navigate('Post', { post })
	}
	_renderItem = ({ item }: { item: NotificationTypes.Notification }) => (
		<Notification notification={item} goToPost={this.goToPost} currentTime={this.state.currentTime} />
	)
	_keyExtractor = (item: NotificationTypes.Notification) => item.id.toString()
	_itemSeperatorComponent = () => <Divider />

	render() {
		return (
			<View style={[styles.container, { backgroundColor: this.props.theme.colors.background }]}>
				<FlatList
					data={this.state.notifications}
					renderItem={this._renderItem}
					keyExtractor={this._keyExtractor}
					ItemSeparatorComponent={this._itemSeperatorComponent}
					refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.refresh} />}
					onEndReached={this.getNextPage}
				/>
			</View>
		)
	}
}

export default withTheme(Notifications)
