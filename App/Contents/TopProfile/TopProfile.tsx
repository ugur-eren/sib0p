import React from 'react'
import { View, Platform } from 'react-native'
import { Text, IconButton, withTheme } from 'react-native-paper'
import FastImage from 'react-native-fast-image'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import Feather from 'react-native-vector-icons/Feather'
import Types from '../../Includes/Types/Types'
import UserTypes from '../../Includes/Types/UserTypes'
import PostTypes from '../../Includes/Types/PostTypes'
import Timer from '../../Components/Timer/Timer'
import styles from './styles'
import UserTagTypes from '../../Includes/Types/UserTagTypes'
import Api from '../../Includes/Api'
import TextButton from '../../Components/TextButton/TextButton'

interface Props {
	navigation: Types.Navigation
	theme: Types.Theme
	user: UserTypes.TopInfo
	post?: PostTypes.Post
	openModal?: (post: PostTypes.Post) => void
	noUserTouchable?: boolean
}

interface State {
	user: UserTypes.TopInfo
}

class Post extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			user: props.user,
		}
	}

	UNSAFE_componentWillReceiveProps(nextProps: Props) {
		if (this.props.user.isFollowed !== nextProps.user.isFollowed) {
			this.state.user.isFollowed = nextProps.user.isFollowed
		}
	}

	handleProfilePress = () => {
		this.props.navigation.push('UserProfile', { username: this.state.user.username })
	}

	openModal = () => {
		this.props.openModal(this.props.post)
	}

	onFollow = async () => {
		let screen = this.props.navigation.getScreenProps()

		let response = await Api.doAction({
			token: screen.user.token,
			type: 'follow',
			username: this.state.user.username,
		})
		if (response) {
			if (response.status) {
				let cached = screen.DataCache()
				if (cached.profiles[this.state.user.username]){
					cached.profiles[this.state.user.username].data.isFollowed = true
					screen.setProfileDataCache(cached.profiles[this.state.user.username].data)
				}
				
				this.setState({
					user: {
						...this.state.user,
						isFollowed: response.isFollowed,
					},
				})
			} else {
				if (response.error === 'no_login') {
					screen.logout(true)
				} else if (response.error === 'wrong_username') {
					screen.error(screen.language.wrong_username_error)
				} else if (response.error === 'no_user') {
					screen.error(screen.language.no_user_error)
				} else {
					screen.unknown_error(response.error)
				}
			}
		} else {
			screen.unknown_error()
		}
	}

	_renderUserTags = () => this.props.user.tags.map(this._renderUserTag)
	_renderUserTag = (tag: UserTagTypes.Tag) => <Feather key={tag.id.toString()} name={tag.icon} size={16} color={tag.color} style={styles.usertag} />

	render() {
		let { theme, noUserTouchable } = this.props
		let { user } = this.state
		let ContainerComponent = noUserTouchable ? TouchableWithoutFeedback : TouchableOpacity
		let screen = this.props.navigation.getScreenProps()
		return (
			<View style={styles.container}>
				<ContainerComponent onPress={noUserTouchable ? undefined : this.handleProfilePress} style={styles.imageContainer}>
					<FastImage source={{ uri: user.profilePhoto }} style={styles.image} />
				</ContainerComponent>

				<View style={styles.outerContent}>
					<ContainerComponent onPress={noUserTouchable ? undefined : this.handleProfilePress} style={styles.innerContent}>
						<View style={styles.usernameContainer}>
							<Text style={styles.username}>{user.username}</Text>
							{this._renderUserTags()}
						</View>

						<Timer time={user.time} />
					</ContainerComponent>
					{noUserTouchable || user.username === this.props.navigation.getScreenProps().user.username || user.isFollowed ? (
						<></>
					) : (
						<TextButton label={screen.language.follow} loadable onPress={this.onFollow} language={screen.language} />
					)}
				</View>

				{this.props.openModal ? (
					<IconButton
						style={{ right: -10 }}
						icon={Platform.OS === 'ios' ? 'more-horizontal' : 'more-vertical'}
						size={21}
						onPress={this.openModal}
					/>
				) : (
					<></>
				)}
			</View>
		)
	}
}

export default withTheme(Post)
