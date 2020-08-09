import React from 'react'
import { View } from 'react-native'
import { Text, withTheme, Divider } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler'
import FastImage from 'react-native-fast-image'
import Feather from 'react-native-vector-icons/Feather'
import TextButton from '../../Components/TextButton/TextButton'
import TransparentHeader from '../../Components/TransparentHeader/TransparentHeader'
import Types from '../../Includes/Types/Types'
import UserTypes from '../../Includes/Types/UserTypes'
import styles from './styles'
import Posts from '../../Contents/Posts/Posts'
import Api from '../../Includes/Api'
import PostTypes from '../../Includes/Types/PostTypes'
import Loader from './Loader'
import EmptyList from '../../Components/EmptyList/EmptyList'

interface Props {
	navigation: Types.Navigation<{
		scrollToTop: boolean
		username: string
	}>
	theme: Types.Theme
}

interface State {
	loading: boolean
	user: UserTypes.Profile
	posts: PostTypes.Post[]
	currentTime: number
	noUser: boolean
}

class UserProfile extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			loading: true,
			user: null,
			posts: [],
			currentTime: 0,
			noUser: false,
		}
	}

	componentDidMount() {
		this.init()
	}

	init = async (refresh?: boolean, nextPage?: boolean) => {
		let username = this.props.navigation.getParam('username') || this.props.navigation.getScreenProps().user.username

		if (!refresh && !this.state.loading) {
			this.setState({ loading: true })
		}

		let isOkToContinue = false
		let stateObject = {}

		if (!nextPage) {
			let user = await Api.getProfile({
				token: this.props.navigation.getScreenProps().user.token,
				username: username,
			})
			if (user) {
				if (user.status) {
					stateObject = { ...stateObject, user: user.user }
				} else {
					if (user.error === 'no_login') {
						this.props.navigation.getScreenProps().logout(true)
					} else {
						if (user.error === 'no_user') {
							stateObject = { ...stateObject, noUser: true }
						} else if (user.error === 'wrong_username') {
							this.props.navigation
								.getScreenProps()
								.error('Hatalı bir kullanıcı adı ile işlem yapmaya çalışıyorsunuz. Lütfen daha sonra tekrar deneyiniz.')
						}
					}
				}
			} else {
				this.props.navigation.getScreenProps().unknown_error()
			}
		}

		let posts = await Api.getExplore({
			token: this.props.navigation.getScreenProps().user.token,
			last: nextPage ? this.state.posts[this.state.posts.length - 1].time : 0,
			username: username,
		})
		if (posts) {
			if (posts.status) {
				stateObject = {
					...stateObject,
					posts: nextPage ? [...this.state.posts, ...posts.posts] : posts.posts,
					currentTime: posts.currentTime,
				}
			} else {
				if (posts.error === 'no_login') {
					this.props.navigation.getScreenProps().logout(true)
				} else {
					this.props.navigation.getScreenProps().unknown_error(posts.error)
				}
			}
		} else {
			this.props.navigation.getScreenProps().unknown_error()
		}

		stateObject = { ...stateObject, loading: false }
		this.setState(stateObject)
	}

	getNextPage = () => {
		return this.init(true, true)
	}

	refresh = () => {
		return this.init(true)
	}

	handleFollowsPress = () => {
		this.props.navigation.navigate('FollowsList', {
			follows: [
				{
					username: 'demirbas',
					profilePhoto: 'https://sib0p.com/inc/imgs/pps/1590017493-1057.jpg',
					fullName: 'Ömer Demirbaş',
					isFollowed: false,
				},
				{
					username: 'TrueTiem',
					profilePhoto: 'https://sib0p.com/inc/imgs/pps/1590195009-1048.jpg',
					fullName: 'Uğur Eren',
					isFollowed: false,
				},
				{
					username: 'berat',
					profilePhoto: 'https://sib0p.com/inc/imgs/pps/1589744671-940.jpg',
					fullName: 'berat kaya',
					isFollowed: true,
				},
			] as UserTypes.Follows[],
			type: 'follows',
		})
	}

	handleFollowersPress = () => {
		this.props.navigation.navigate('FollowsList', {
			follows: [
				{
					username: 'demirbas',
					profilePhoto: 'https://sib0p.com/inc/imgs/pps/1590017493-1057.jpg',
					fullName: 'Ömer Demirbaş',
					isFollowed: false,
				},
				{
					username: 'TrueTiem',
					profilePhoto: 'https://sib0p.com/inc/imgs/pps/1590195009-1048.jpg',
					fullName: 'Uğur Eren',
					isFollowed: false,
				},
				{
					username: 'berat',
					profilePhoto: 'https://sib0p.com/inc/imgs/pps/1589744671-940.jpg',
					fullName: 'berat kaya',
					isFollowed: true,
				},
			] as UserTypes.Follows[],
			type: 'followers',
		})
	}

	onSettingsPress = () => {
		this.props.navigation.navigate('Settings')
	}

	_renderUserTagsContainer = () =>
		this.state.user.tags.length > 0 ? (
			<View style={[styles.userTagsContainer, { backgroundColor: this.props.theme.colors.surface }]}>{this._renderUserTags()}</View>
		) : (
			<></>
		)
	_renderUserTags = () => this.state.user.tags.map(this._renderUserTag)
	_renderUserTag = (tag) => (
		<View key={tag.id.toString()} style={styles.userTag}>
			<Feather name={tag.icon} color={tag.color} style={styles.userTagIcon} size={16} />
			<Text>{tag.name}</Text>
		</View>
	)

	_renderHeader = () => {
		let { theme, navigation } = this.props
		let myself = navigation.getScreenProps().user
		let isMyself = this.state.loading === false && myself.username === this.state.user.username
		let user = this.state.user

		return (
			<>
				<View style={styles.backgroundContainer}>
					<FastImage source={{ uri: user.backgroundPhoto }} resizeMode='cover' style={styles.backgroundImage} />
					<TransparentHeader title={user.username} onSettings={isMyself ? this.onSettingsPress : undefined} />
				</View>
				<View style={[styles.topInfoContainer, { backgroundColor: theme.colors.surface }]}>
					<FastImage source={{ uri: user.profilePhoto }} style={[styles.profilePhoto, { borderColor: this.props.theme.colors.main }]} />

					<View style={styles.userInfo}>
						<Text style={styles.username}>{user.username}</Text>
						<Text>{user.fullName}</Text>
					</View>

					{isMyself ? <></> : <TextButton label={'Takip Et'} onPress={() => {}} />}
				</View>

				{user.bio ? (
					<View style={[styles.bio, { backgroundColor: theme.colors.surface }]}>
						<Text>{user.bio}</Text>
					</View>
				) : (
					<></>
				)}

				{this._renderUserTagsContainer()}

				<View style={[styles.centerContainer, { backgroundColor: theme.colors.surface }]}>
					<View style={styles.postsCount}>
						<Text>Gönderiler</Text>
						<Text style={styles.centerText}>{user.postsCount}</Text>
					</View>

					<Divider style={styles.centerDivider} />

					<TouchableOpacity
						onPress={this.handleFollowsPress}
						style={styles.centerTouchable}
						containerStyle={styles.centerTouchableContainer}
					>
						<Text>Takip</Text>
						<Text style={styles.centerText}>{user.followsCount}</Text>
					</TouchableOpacity>

					<Divider style={styles.centerDivider} />

					<TouchableOpacity
						onPress={this.handleFollowersPress}
						style={styles.centerTouchable}
						containerStyle={styles.centerTouchableContainer}
					>
						<Text>Takipçi</Text>
						<Text style={styles.centerText}>{user.followersCount}</Text>
					</TouchableOpacity>
				</View>
			</>
		)
	}

	_emptyComponent = () => <EmptyList image={require('../../Assets/Images/no-posts.png')} title='Hiç post bulunamadı' />

	render() {
		let { theme } = this.props

		return (
			<View style={[styles.container, { backgroundColor: theme.colors.background }]}>
				{this.state.loading ? (
					<Loader theme={theme} />
				) : (
					<Posts
						style={styles.scrollView}
						contentContainerStyle={styles.scrollViewContainer}
						posts={this.state.posts}
						currentTime={this.state.currentTime}
						getNextPage={this.getNextPage}
						navigation={this.props.navigation}
						refresh={this.refresh}
						ListHeaderComponent={this._renderHeader}
						ListEmptyComponent={this._emptyComponent}
						noUserTouchable
					/>
				)}
			</View>
		)
	}
}

export default withTheme(UserProfile)
