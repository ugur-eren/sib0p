import React from 'react'
import { View } from 'react-native'
import { Text, withTheme, Divider } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler'
import FastImage from 'react-native-fast-image'
import TextButton from '../../Components/TextButton/TextButton'
import TransparentHeader from '../../Components/TransparentHeader/TransparentHeader'
import Types from '../../Includes/Types/Types'
import UserTypes from '../../Includes/Types/UserTypes'
import styles from './styles'
import Posts from '../../Contents/Posts/Posts'
import Api from '../../Includes/Api'
import PostTypes from '../../Includes/Types/PostTypes'

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
}

class UserProfile extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			loading: true,
			user: null,
			posts: [],
			currentTime: 0,
		}
	}

	private _flatListRef: any = null

	async componentDidMount() {
		let username = this.props.navigation.getParam('username') || this.props.navigation.getScreenProps().user.username
		let user = await Api.getProfile({ username: username })
		if (user && user.status) {
			let posts = await Api.getExplore({ last: 0, username: username })
			if (posts && posts.status) {
				this.setState({ loading: false, user: user.user, posts: posts.posts, currentTime: posts.currentTime })
			} else {
			}
		} else {
		}
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

	_renderHeader = () => {
		let { theme, navigation } = this.props
		let myself = navigation.getScreenProps().user
		let isMyself = this.state.loading !== false && myself.username === this.state.user.username
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

					<TextButton label={isMyself ? 'Profili Düzenle' : 'Takip Et'} onPress={() => {}} />
				</View>

				{user.bio ? (
					<View style={[styles.bio, { backgroundColor: theme.colors.surface }]}>
						<Text>{user.bio}</Text>
					</View>
				) : (
					<></>
				)}

				<View style={[styles.centerContainer, { backgroundColor: theme.colors.surface }]}>
					<View style={styles.postsCount}>
						<Text>Postlar</Text>
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

	_setFlatListRef = (ref: any) => {
		this._flatListRef = ref
	}

	getNextPage = async () => {
		let username = this.props.navigation.getParam('username') || this.props.navigation.getScreenProps().user.username
		let posts = await Api.getExplore({ last: this.state.posts[this.state.posts.length - 1].time, username: username })
		if (posts && posts.status) {
			this.setState({
				user: this.state.user,
				posts: [...this.state.posts, ...posts.posts],
				currentTime: posts.currentTime,
			})
		} else {
		}
	}

	refresh = async () => {
		let username = this.props.navigation.getParam('username') || this.props.navigation.getScreenProps().user.username
		let user = await Api.getProfile({ username: username })
		if (user && user.status) {
			let posts = await Api.getExplore({ last: 0, username: username })
			if (posts && posts.status) {
				this.setState({ loading: false, user: user.user, posts: posts.posts, currentTime: posts.currentTime })
			} else {
			}
		} else {
		}
	}

	render() {
		if (this.props.navigation.getParam('scrollToTop')) {
			this.props.navigation.setParams({ scrollToTop: false })
			if (this._flatListRef) {
				this._flatListRef.scrollToOffset({ animated: true, offset: 0 })
			}
		}
		let { theme } = this.props

		return (
			<View style={[styles.container, { backgroundColor: theme.colors.background }]}>
				{this.state.loading ? (
					<></>
				) : (
					<Posts
						_flatListRef={this._setFlatListRef}
						style={styles.scrollView}
						contentContainerStyle={styles.scrollViewContainer}
						posts={this.state.posts}
						currentTime={this.state.currentTime}
						getNextPage={this.getNextPage}
						navigation={this.props.navigation}
						refresh={this.refresh}
						ListHeaderComponent={this._renderHeader}
						noUserTouchable
					/>
				)}
			</View>
		)
	}
}

export default withTheme(UserProfile)
