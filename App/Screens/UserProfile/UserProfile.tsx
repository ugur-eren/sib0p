import React from 'react'
import { View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { Text, withTheme, Divider, ActivityIndicator, Portal, Snackbar, Dialog, Button, Paragraph, List, IconButton } from 'react-native-paper'
import FastImage from 'react-native-fast-image'
import Feather from 'react-native-vector-icons/Feather'
import { Modalize } from 'react-native-modalize'
import TextButton from '../../Components/TextButton/TextButton'
import TransparentHeader from '../../Components/TransparentHeader/TransparentHeader'
import EmptyList from '../../Components/EmptyList/EmptyList'
import Header from '../../Components/Header/Header'
import Posts from '../../Contents/Posts/Posts'
import Loader from './Loader'
import Api from '../../Includes/Api'
import Types from '../../Includes/Types/Types'
import UserTypes from '../../Includes/Types/UserTypes'
import UserTagTypes from '../../Includes/Types/UserTagTypes'
import PostTypes from '../../Includes/Types/PostTypes'
import styles from './styles'
import UserProfileHead from './UserProfileHead'

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
	blockUserActive: boolean
	blockUserLoading: boolean
	reportUserActive: boolean
	reportUserLoading: boolean
	ppLoading: boolean
	bgLoading: boolean
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
			hasPage: true,
			error: false,
			blockUserActive: false,
			blockUserLoading: false,
			reportUserActive: false,
			reportUserLoading: false,
			ppLoading: false,
			bgLoading: false,
		}
	}

	private newPageActive = false
	private modalizeRef: any = null

	componentDidMount() {
		this.init()
	}

	init = async (refresh?: boolean, nextPage?: boolean) => {
		let screen = this.props.navigation.getScreenProps()
		let username = this.props.navigation.getParam('username') || screen.user.username

		if (!refresh && !this.state.loading) {
			this.setState({ loading: true })
		}

		let stateObject: any = {}

		let totalCache = screen.DataCache()
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
					token: screen.user.token,
					username: username,
				})
				if (user) {
					if (user.status) {
						stateObject = { ...stateObject, user: user.user }
						screen.setProfileDataCache(user.user)
					} else {
						if (user.error === 'no_login') {
							screen.logout(true)
						} else if (user.error === 'too_fast_action') {
							screen.error(screen.language.too_fast_action)
						} else {
							if (user.error === 'no_user') {
								stateObject = { ...stateObject, noUser: true }
							} else if (user.error === 'wrong_username') {
								this.props.navigation.getScreenProps().error(screen.language.wrong_username)
							}
						}
					}
				} else {
					screen.unknown_error()
				}
			}

			let posts = await Api.getExplore({
				token: screen.user.token,
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
						if (!nextPage) {
							screen.setProfileDataCache(stateObject.user, posts.posts)
						}
						screen.setCurrentTime(posts.currentTime)
					}
				} else {
					if (posts.error === 'no_login') {
						screen.logout(true)
					} else if (posts.error === 'too_fast_action') {
						screen.error(screen.language.too_fast_action)
					} else {
						screen.unknown_error(posts.error)
					}
				}
			} else {
				screen.unknown_error()
			}
		}

		stateObject = { ...stateObject, loading: false }
		this.setState(stateObject, () => {
			if (nextPage) this.newPageActive = false
		})
	}

	getNextPage = () => {
		if (this.state.hasPage) {
			if (this.newPageActive) return
			this.newPageActive = true
			return this.init(true, true)
		}
	}

	refresh = () => {
		return this.init(true)
	}

	onSettingsPress = () => {
		this.props.navigation.navigate('Settings')
	}

	onBlockPress = () => {
		this.setState({ blockUserActive: true })
	}

	onReportPress = () => {
		this.setState({ reportUserActive: true })
	}

	hideBlockDialog = () => {
		this.setState({ blockUserActive: false })
	}

	hideReportDialog = () => {
		this.setState({ reportUserActive: false })
	}

	blockUser = async () => {
		this.setState({ blockUserLoading: true })

		let screen = this.props.navigation.getScreenProps()

		let response = await Api.doAction({
			token: screen.user.token,
			type: 'block',
			username: this.state.user.username,
		})
		if (response) {
			if (response.status) {
				this.modalizeRef?.close()
				this.props.navigation.getScreenProps().removeProfileDataCache(this.state.user.username)
				this.setState({ blockUserLoading: false })
				this.props.navigation.goBack()
				screen.error(screen.language.user_block_success)
			} else {
				if (response.error === 'no_login') {
					screen.logout(true)
				} else if (response.error === 'too_fast_action') {
					screen.error(screen.language.too_fast_action)
				} else if (response.error === 'wrong_username') {
					screen.error(screen.language.wrong_username)
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
				} else if (response.error === 'too_fast_action') {
					screen.error(screen.language.too_fast_action)
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

	reportUser = async () => {
		this.setState({ blockUserLoading: true })

		let screen = this.props.navigation.getScreenProps()

		let response = await Api.doAction({
			token: screen.user.token,
			type: 'report_user',
			username: this.state.user.username,
		})
		if (response) {
			if (response.status) {
				this.modalizeRef?.close()
				this.props.navigation.getScreenProps().removeProfileDataCache(this.state.user.username)
				this.setState({ blockUserLoading: false })
				this.props.navigation.goBack()
				screen.error(screen.language.user_report_success)
			} else {
				if (response.error === 'no_login') {
					screen.logout(true)
				} else if (response.error === 'too_fast_action') {
					screen.error(screen.language.too_fast_action)
				} else if (response.error === 'wrong_username') {
					screen.error(screen.language.wrong_username)
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

	_viewBG = () => {
		this.props.navigation.navigate('ImageViewer', {
			image: this.state.user.backgroundPhoto,
			title: this.state.user.username + ' ' + this.props.navigation.getScreenProps().language.background_photo,
		})
	}
	_viewPP = () => {
		this.props.navigation.navigate('ImageViewer', {
			image: this.state.user.profilePhoto,
			title: this.state.user.username + ' ' + this.props.navigation.getScreenProps().language.profile_photo,
		})
	}

	_changePP = () => {
		this._changePhoto('pp')
	}
	_changeBG = () => {
		this._changePhoto('bg')
	}
	_changePhoto = (type: 'pp' | 'bg') => {
		let screen = this.props.navigation.getScreenProps()

		const ImagePicker = require('react-native-image-crop-picker')

		ImagePicker.default
			.openPicker({
				mediaType: 'photo',
				multiple: false,
				width: type === 'pp' ? 500 : 2520,
				height: type === 'pp' ? 500 : 1080,
				cropping: true,
				forceJpg: true,
				freeStyleCropEnabled: false,
				includeBase64: true,
				compressImageMaxWidth: 1080,
				compressImageMaxHeight: 1080,
				compressImageQuality: 0.75,
				cropperToolbarTitle: screen.language.cropper_title,
				loadingLabelText: screen.language.loading,
				cropperChooseText: screen.language.choose,
				cropperCancelText: screen.language.cancel,
			})
			.then(async (images) => {
				if (images) {
					let im: any = null
					if (images instanceof Array) {
						if (images.length > 0) {
							im = images[0]
						}
					} else {
						if (images.size > 20971520) {
							return this.setState({ error: screen.language.image_size_more })
						}
						im = images
					}

					if (im && im.data) {
						let screen = this.props.navigation.getScreenProps()

						if (type === 'pp') {
							this.setState({ ppLoading: true })
						} else {
							this.setState({ bgLoading: true })
						}

						let response = await Api.changePhoto({
							token: screen.user.token,
							type: type,
							image: im.data,
						})

						if (type === 'pp') {
							this.setState({ ppLoading: false })
						} else {
							this.setState({ bgLoading: false })
						}

						if (response) {
							if (response.status) {
								this.setState({ error: type == 'pp' ? screen.language.pp_photo_success : screen.language.bg_photo_success })
								this.refresh()
							} else {
								if (response.error === 'no_image') {
									screen.error(screen.language.no_image)
								} else if (response.error === 'not_supported') {
									screen.error(screen.language.file_not_supported)
								} else {
									screen.unknown_error(response.error)
								}
							}
						} else {
							screen.unknown_error()
						}
					} else {
						return this.setState({
							error: screen.language.file_open_error,
						})
					}
				}
			})
			.catch(() => {})
	}

	_renderHeader = () => {
		return (
			<UserProfileHead
				navigation={this.props.navigation}
				onFollow={this.onFollow}
				openModalize={this.openModalize}
				refresh={this.refresh}
				user={this.state.user}
			/>
		)
	}

	_emptyComponent = () => (
		<EmptyList image={require('../../Assets/Images/no-posts.png')} title={this.props.navigation.getScreenProps().language.no_posts} />
	)
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

	_setModalizeRef = (ref: any) => {
		this.modalizeRef = ref
	}

	openModalize = () => {
		this.modalizeRef?.open()
	}
	openShop = () => {
		this.props.navigation.navigate('UserShop')
	}

	// <Loader theme={theme} />
	render() {
		let { theme } = this.props
		let screen = this.props.navigation.getScreenProps()

		return (
			<View style={[styles.container, { backgroundColor: theme.colors.background }]}>
				{this.state.loading ? (
					<View style={styles.loading}>
						<ActivityIndicator color={theme.colors.main} size='large' />
					</View>
				) : this.state.noUser ? (
					<>
						<Header title={screen.language.not_found} />
						<EmptyList image={require('../../Assets/Images/no-comments.png')} title={screen.language.user_not_found} />
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
				<Portal>
					<Dialog visible={this.state.blockUserActive} onDismiss={this.hideBlockDialog}>
						<Dialog.Title>{screen.language.block}</Dialog.Title>
						<Dialog.Content>
							<Paragraph>{screen.language.block_user_dialog}</Paragraph>
						</Dialog.Content>
						<Dialog.Actions>
							<Button
								onPress={this.state.blockUserLoading ? undefined : this.blockUser}
								color={theme.colors.main}
								loading={this.state.blockUserLoading}
								style={{ marginRight: 15 }}
							>
								{screen.language.block}
							</Button>
							<Button onPress={this.hideBlockDialog} color={theme.colors.contrast}>
								{screen.language.cancel}
							</Button>
						</Dialog.Actions>
					</Dialog>
				</Portal>

				<Portal>
					<Dialog visible={this.state.reportUserActive} onDismiss={this.hideReportDialog}>
						<Dialog.Title>{screen.language.report}</Dialog.Title>
						<Dialog.Content>
							<Paragraph>{screen.language.report_user_dialog}</Paragraph>
						</Dialog.Content>
						<Dialog.Actions>
							<Button
								onPress={this.state.reportUserLoading ? undefined : this.reportUser}
								color={theme.colors.main}
								loading={this.state.reportUserLoading}
								style={{ marginRight: 15 }}
							>
								{screen.language.report}
							</Button>
							<Button onPress={this.hideReportDialog} color={theme.colors.contrast}>
								{screen.language.cancel}
							</Button>
						</Dialog.Actions>
					</Dialog>
				</Portal>

				<Modalize ref={this._setModalizeRef} adjustToContentHeight modalStyle={{ backgroundColor: this.props.theme.colors.surface }}>
					<List.Section>
						<List.Item
							title={screen.language.block}
							onPress={this.onBlockPress}
							left={(props) => <List.Icon {...props} style={{}} icon='slash' />}
						/>
						<List.Item
							title={screen.language.report}
							onPress={this.onReportPress}
							left={(props) => <List.Icon {...props} style={{}} icon='alert-circle' />}
						/>
					</List.Section>
				</Modalize>
			</View>
		)
	}
}

export default withTheme(UserProfile)
