import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Text, withTheme, Divider, ActivityIndicator, Portal, Snackbar } from 'react-native-paper'
import FastImage from 'react-native-fast-image'
import Feather from 'react-native-vector-icons/Feather'
import ImagePicker, { Image as ImageType } from 'react-native-image-crop-picker'
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
import Header from '../../Components/Header/Header'
import UserTagTypes from '../../Includes/Types/UserTagTypes'

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
	hasPage: boolean
	error: false | string
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
			hasPage: false,
			error: false,
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

		let stateObject: any = {}

		let totalCache = this.props.navigation.getScreenProps().DataCache()
		let cache = totalCache.profiles[username]
		if (!refresh && !nextPage && cache && cache.data) {
			await new Promise((resolve) => setTimeout(() => resolve(), 10))
			stateObject = { ...stateObject, user: cache.data, loading: false }
		}
		if (!refresh && !nextPage && cache && cache.posts) {
			await new Promise((resolve) => setTimeout(() => resolve(), 10))
			stateObject = { ...stateObject, posts: cache.posts, loading: false }
		}
		if (!refresh && !nextPage && cache && totalCache.currentTime) {
			stateObject = { ...stateObject, currentTime: totalCache.currentTime }
		}
		if (refresh || nextPage || !cache || !cache.data || !cache.posts || !totalCache.currentTime) {
			if (refresh || (!nextPage && (!cache || !cache.data))) {
				let user = await Api.getProfile({
					token: this.props.navigation.getScreenProps().user.token,
					username: username,
				})
				if (user) {
					if (user.status) {
						stateObject = { ...stateObject, user: user.user }
						this.props.navigation.getScreenProps().setProfileDataCache(user.user)
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
					if (posts.posts.length < 1) {
						this.setState({ hasPage: false, currentTime: posts.currentTime })
					} else {
						stateObject = {
							...stateObject,
							posts: nextPage ? [...this.state.posts, ...posts.posts] : posts.posts,
							currentTime: posts.currentTime,
						}
						this.props.navigation.getScreenProps().setProfileDataCache(stateObject.user, posts.posts)
						this.props.navigation.getScreenProps().setCurrentTime(posts.currentTime)
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
		}

		stateObject = { ...stateObject, loading: false }
		this.setState(stateObject)
	}

	getNextPage = () => {
		if (this.state.hasPage) {
			return this.init(true, true)
		}
	}

	refresh = () => {
		return this.init(true)
	}

	handleFollowsPress = () => {
		this.props.navigation.push('Relations', { type: 'follows', username: this.state.user.username })
	}

	handleFollowersPress = () => {
		this.props.navigation.push('Relations', { type: 'followers', username: this.state.user.username })
	}

	onSettingsPress = () => {
		this.props.navigation.navigate('Settings')
	}

	onFollow = async () => {
		let screen = this.props.navigation.getScreenProps()
		if (screen.user.username === this.state.user.username) {
			return this.onSettingsPress()
		}

		let response = await Api.doAction({
			token: screen.user.token,
			type: 'follow',
			username: this.state.user.username,
		})
		if (response) {
			if (response.status) {
				this.setState(
					{
						user: {
							...this.state.user,
							isFollowed: response.isFollowed,
							followersCount: response.followersCount,
						},
					},
					() => {
						this.props.navigation.getScreenProps().setProfileDataCache(this.state.user)
					}
				)
			} else {
				if (response.error === 'no_login') {
					screen.logout(true)
				} else if (response.error === 'wrong_username') {
					screen.error('Hatalı bir kullanıcı adı ile işlem yapmaya çalışıyorsunuz. Lütfen daha sonra tekrar deneyiniz.')
				} else if (response.error === 'no_user') {
					screen.error('Bu kullanıcı bulunamadı. Kullanıcı adı değişmiş olabilir.')
				} else {
					screen.unknown_error(response.error)
				}
			}
		} else {
			screen.unknown_error()
		}
	}

	_renderUserTagsContainer = () =>
		this.state.user.tags.length > 0 ? (
			<View style={[styles.userTagsContainer, { backgroundColor: this.props.theme.colors.surface }]}>{this._renderUserTags()}</View>
		) : (
			<></>
		)
	_renderUserTags = () => this.state.user.tags.map(this._renderUserTag)
	_renderUserTag = (tag: UserTagTypes.Tag) => (
		<View key={tag.id.toString()} style={styles.userTag}>
			<Feather name={tag.icon} color={tag.color} style={styles.userTagIcon} size={16} />
			<Text>{tag.name}</Text>
		</View>
	)

	_changePP = () => {
		this._changePhoto('pp')
	}
	_changeBG = () => {
		this._changePhoto('bg')
	}
	_changePhoto = (type: 'pp' | 'bg') => {
		ImagePicker.openPicker({
			mediaType: 'photo',
			multiple: false,
			width: 500,
			height: type === 'pp' ? 500 : 250,
			cropping: true,
			forceJpg: true,
			freeStyleCropEnabled: false,
			includeBase64: true,
			compressImageMaxWidth: 1080,
			compressImageMaxHeight: 1080,
			compressImageQuality: 0.75,
			cropperToolbarTitle: 'Resim Boyutunu Ayarlayınız',
			loadingLabelText: 'Yükleniyor...',
			cropperChooseText: 'Seç',
			cropperCancelText: 'İptal',
		})
			.then(async (images) => {
				if (images) {
					let im: ImageType = null
					if (images instanceof Array) {
						if (images.length > 0) {
							im = images[0]
						}
					} else {
						if (images.size > 20971520) {
							return this.setState({ error: "Seçilen dosya boyutu 20MB'dan fazla olamaz." })
						}
						im = images
					}

					if (im && im.data) {
						let screen = this.props.navigation.getScreenProps()

						let response = await Api.changePhoto({
							token: screen.user.token,
							type: type,
							image: im.data,
						})

						if (response) {
							if (response.status) {
								this.setState({ error: (type == 'pp' ? 'Profil fotoğrafı' : 'Arkaplan fotoğrafı') + ' başarıyla güncellendi.' })
								this.refresh()
							} else {
								if (response.error === 'no_image') {
									screen.error('Fotoğraf seçilmedi. Lütfen tekrar deneyiniz.')
								} else if (response.error === 'not_supported') {
									screen.error('Yüklediğiniz dosya formatı desteklenmemektedir. Lütfen farklı bir dosya ile tekrar deneyiniz.')
								} else {
									screen.unknown_error(response.error)
								}
							}
						} else {
							screen.unknown_error()
						}
					} else {
						return this.setState({
							error: 'Dosya açılırken bir sorun oluştu. Lütfen dosya izinlerini kontol ediniz ve tekrar deneyiniz.',
						})
					}
				}
			})
			.catch(() => {})
	}

	_renderHeader = () => {
		let { theme, navigation } = this.props
		let myself = navigation.getScreenProps().user
		let isMyself = this.state.loading === false && myself.username === this.state.user.username
		let user = this.state.user

		return (
			<>
				<View style={styles.backgroundContainer}>
					<TouchableOpacity onPress={this._changeBG} style={[styles.backgroundImage, { backgroundColor: 'red' }]}>
						<FastImage source={{ uri: user.backgroundPhoto }} resizeMode='cover' style={styles.backgroundImage} />
					</TouchableOpacity>
					<TransparentHeader title={user.username} onSettings={isMyself ? this.onSettingsPress : undefined} />
				</View>
				<View style={[styles.topInfoContainer, { backgroundColor: theme.colors.surface }]}>
					<TouchableOpacity onPress={this._changePP} style={[styles.profilePhotoContainer, { borderColor: this.props.theme.colors.main }]}>
						<FastImage source={{ uri: user.profilePhoto }} style={styles.profilePhoto} />
					</TouchableOpacity>

					<View style={styles.userInfo}>
						<Text style={styles.username}>{user.username}</Text>
						<Text>{user.fullName}</Text>
					</View>

					<TextButton
						loadable
						label={isMyself ? 'Profili Düzenle' : user.isFollowed ? 'Takipten Çık' : 'Takip Et'}
						onPress={this.onFollow}
					/>
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

					<TouchableOpacity onPress={this.handleFollowsPress} style={styles.centerTouchable}>
						<Text>Takip</Text>
						<Text style={styles.centerText}>{user.followsCount}</Text>
					</TouchableOpacity>

					<Divider style={styles.centerDivider} />

					<TouchableOpacity onPress={this.handleFollowersPress} style={styles.centerTouchable}>
						<Text>Takipçi</Text>
						<Text style={styles.centerText}>{user.followersCount}</Text>
					</TouchableOpacity>
				</View>
			</>
		)
	}

	_emptyComponent = () => <EmptyList image={require('../../Assets/Images/no-posts.png')} title='Hiç post bulunamadı' />
	_footerComponent = () =>
		!this.state.hasPage ? (
			<></>
		) : (
			<View style={styles.bottomLoader}>
				<ActivityIndicator size={24} color={this.props.theme.colors.main} />
			</View>
		)

	dismissError = () => {
		this.setState({ error: false })
	}

	render() {
		let { theme } = this.props

		return (
			<View style={[styles.container, { backgroundColor: theme.colors.background }]}>
				{this.state.loading ? (
					<Loader theme={theme} />
				) : this.state.noUser ? (
					<>
						<Header title='Bulunamadı' />
						<EmptyList image={require('../../Assets/Images/no-comments.png')} title='Bu kullanıcı bulunamadı.' />
					</>
				) : (
					<Posts
						style={styles.scrollView}
						contentContainerStyle={styles.scrollViewContainer}
						posts={this.state.posts}
						currentTime={this.state.currentTime}
						getNextPage={this.getNextPage}
						navigation={this.props.navigation}
						refresh={this.refresh}
						ListHeaderComponent={React.memo(() => (
							<this._renderHeader />
						))}
						ListFooterComponent={this._footerComponent}
						ListEmptyComponent={this._emptyComponent}
						noUserTouchable
					/>
				)}
				<Portal>
					<Snackbar visible={!!this.state.error} onDismiss={this.dismissError}>
						<Text style={{ color: theme.colors.contrast }}>{this.state.error}</Text>
					</Snackbar>
				</Portal>
			</View>
		)
	}
}

export default withTheme(UserProfile)
