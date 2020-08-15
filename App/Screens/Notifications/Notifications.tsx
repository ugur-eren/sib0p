import React from 'react'
import { View, RefreshControl, FlatList } from 'react-native'
import { Divider, withTheme } from 'react-native-paper'
import EmptyList from '../../Components/EmptyList/EmptyList'
import MainHeader from '../../Components/MainHeader/MainHeader'
import Api from '../../Includes/Api'
import Notification from './Notification'
import Loader from './Loader'
import Types from '../../Includes/Types/Types'
import NotificationTypes from '../../Includes/Types/NotificationTypes'
import styles from './styles'

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
		let screen = this.props.navigation.getScreenProps()
		if (!refresh && !this.state.loading) {
			this.setState({ loading: true })
		}
		let notifs = await Api.getNotifications({
			token: screen.user.token,
			last: nextPage ? this.state.notifications[this.state.notifications.length - 1].id : 0,
		})
		let stateObject = {}

		if (notifs) {
			if (notifs.status) {
				stateObject = {
					notifications: nextPage ? [...this.state.notifications, ...notifs.notifications] : notifs.notifications,
					currentTime: notifs.currentTime,
				}
				screen.setCurrentTime(notifs.currentTime)

				screen.setUserData({
					...screen.user,
					notifCount: 0,
				})
			} else {
				if (notifs.error === 'no_login') {
					screen.logout(true)
				} else {
					screen.unknown_error(notifs.error)
				}
			}
		} else {
			screen.unknown_error()
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

	_renderItem = ({ item }: { item: NotificationTypes.Notification }) => (
		<Notification notification={item} navigation={this.props.navigation} currentTime={this.state.currentTime} />
	)
	_keyExtractor = (item: NotificationTypes.Notification, index: number) => index.toString()
	_itemSeperatorComponent = () => <Divider />
	_emptyComponent = () => (
		<EmptyList image={require('../../Assets/Images/no-notifications.png')} title={this.props.navigation.getScreenProps().language.no_notifs} />
	)

	render() {
		let { theme } = this.props

		return (
			<View style={[styles.container, { backgroundColor: this.props.theme.colors.background }]}>
				<MainHeader />

				{this.state.loading ? (
					<Loader theme={theme} />
				) : (
					<FlatList
						data={this.state.notifications}
						renderItem={this._renderItem}
						keyExtractor={this._keyExtractor}
						ItemSeparatorComponent={this._itemSeperatorComponent}
						refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.refresh} />}
						onEndReached={this.getNextPage}
						ListEmptyComponent={this._emptyComponent}
					/>
				)}
			</View>
		)
	}
}

export default withTheme(Notifications)
