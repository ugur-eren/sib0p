import React from 'react'
import { View, TouchableOpacity, TouchableWithoutFeedback, ActivityIndicator } from 'react-native'
import { Text, IconButton, Divider, withTheme } from 'react-native-paper'
import FastImage from 'react-native-fast-image'
import Feather from 'react-native-vector-icons/Feather'
import TransparentHeader from '../../Components/TransparentHeader/TransparentHeader'
import TextButton from '../../Components/TextButton/TextButton'
import Api from '../../Includes/Api'
import Types from '../../Includes/Types/Types'
import UserTypes from '../../Includes/Types/UserTypes'
import UserTagTypes from '../../Includes/Types/UserTagTypes'
import styles from './styles'

interface Props {
	navigation: Types.Navigation
	theme: Types.Theme
	user: UserTypes.Profile
	refresh: () => Promise<void>
	openModalize: () => void
	onFollow: () => Promise<void>
}

interface State {
	ppLoading: boolean
	bgLoading: boolean
	error: boolean | string
}

class UserProfileHead extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			ppLoading: false,
			bgLoading: false,
			error: false,
		}
	}

	onSettingsPress = () => {
		this.props.navigation.navigate('Settings')
	}

	onSendMessage = () => {
		this.props.navigation.navigate('ChatMessage', { user: this.props.user })
	}

	_viewBG = () => {
		this.props.navigation.navigate('ImageViewer', {
			image: this.props.user.backgroundPhoto,
			title: this.props.user.username + ' ' + this.props.navigation.getScreenProps().language.background_photo,
		})
	}
	_viewPP = () => {
		this.props.navigation.navigate('ImageViewer', {
			image: this.props.user.profilePhoto,
			title: this.props.user.username + ' ' + this.props.navigation.getScreenProps().language.profile_photo,
		})
	}

	openShop = () => {
		this.props.navigation.navigate('UserShop')
	}

	handleFollowsPress = () => {
		this.props.navigation.push('Relations', { type: 'follows', username: this.props.user.username })
	}

	handleFollowersPress = () => {
		this.props.navigation.push('Relations', { type: 'followers', username: this.props.user.username })
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
								this.props.refresh()
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

	_renderUserTagsContainer = () =>
		this.props.user.tags.length > 0 ? (
			<View style={[styles.userTagsContainer, { backgroundColor: this.props.theme.colors.surface }]}>{this._renderUserTags()}</View>
		) : (
			<></>
		)
	_renderUserTags = () => this.props.user.tags.map(this._renderUserTag)
	_renderUserTag = (tag: UserTagTypes.Tag) => (
		<View key={tag.id.toString()} style={styles.userTag}>
			<Feather name={tag.icon} color={tag.color} style={styles.userTagIcon} size={16} />
			<Text>{tag.name}</Text>
		</View>
	)

	render() {
		let { theme, navigation, user } = this.props
		let screen = navigation.getScreenProps()
		let myself = screen.user
		let isMyself = myself.username === user.username

		return (
			<>
				<View style={styles.backgroundContainer}>
					<TouchableWithoutFeedback
						onPress={isMyself ? this._changeBG : this._viewBG}
						style={[styles.backgroundImage, { backgroundColor: 'red' }]}
					>
						<View style={styles.backgroundImage}>
							<FastImage source={{ uri: user.backgroundPhoto }} resizeMode='cover' style={styles.backgroundImage} />

							{this.state.bgLoading ? (
								<View style={[styles.ppbgLoading, { backgroundColor: 'rgba(' + theme.colors.surfaceRgb + ', .75)' }]}>
									<ActivityIndicator size='small' color={theme.colors.main} />
								</View>
							) : (
								<></>
							)}
						</View>
					</TouchableWithoutFeedback>
					<TransparentHeader
						title={user.username}
						onSettings={isMyself ? this.onSettingsPress : undefined}
						onMore={isMyself ? undefined : this.props.openModalize}
					/>

					{isMyself ? (
						<TouchableOpacity
							style={[styles.sevapPoints, { backgroundColor: 'rgba(' + theme.colors.surfaceRgb + ', .75)' }]}
							onPress={this.openShop}
						>
							<Text style={{ color: theme.colors.main }}>Sevap Points: {user.sevapPoints || 0}</Text>
							<IconButton icon='shopping-cart' color={theme.colors.main} size={16} />
						</TouchableOpacity>
					) : (
						<></>
					)}
				</View>
				<View style={[styles.topInfoContainer, { backgroundColor: theme.colors.surface }]}>
					<View style={[styles.profilePhotoContainer, { borderColor: this.props.theme.colors.main }]}>
						<TouchableWithoutFeedback
							onPress={isMyself ? this._changePP : this._viewPP}
							style={[styles.profilePhotoContainer, { borderColor: this.props.theme.colors.main }]}
						>
							<View>
								<FastImage source={{ uri: user.profilePhoto }} style={styles.profilePhoto} />

								{this.state.ppLoading ? (
									<View style={[styles.ppbgLoading, { backgroundColor: 'rgba(' + theme.colors.surfaceRgb + ', .75)' }]}>
										<ActivityIndicator size='small' color={theme.colors.main} />
									</View>
								) : (
									<></>
								)}
							</View>
						</TouchableWithoutFeedback>
					</View>

					<View style={styles.userInfo}>
						<Text style={styles.username}>{user.username}</Text>
						<Text>{user.fullName}</Text>
					</View>

					<View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
						<TextButton
							loadable
							containerStyle={{ flex: undefined }}
							label={isMyself ? screen.language.edit_profile : user.isFollowed ? screen.language.unfollow : screen.language.follow}
							onPress={this.props.onFollow}
							language={screen.language}
						/>
						{!isMyself ? (
							<TextButton
								label={screen.language.send_message}
								containerStyle={{ flex: undefined }}
								onPress={this.onSendMessage}
								language={screen.language}
							/>
						) : (
							<></>
						)}
					</View>
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
						<Text>{screen.language.posts}</Text>
						<Text style={styles.centerText}>{user.postsCount}</Text>
					</View>

					<Divider style={styles.centerDivider} />

					<TouchableOpacity onPress={this.handleFollowsPress} style={styles.centerTouchable}>
						<Text>{screen.language.follows}</Text>
						<Text style={styles.centerText}>{user.followsCount}</Text>
					</TouchableOpacity>

					<Divider style={styles.centerDivider} />

					<TouchableOpacity onPress={this.handleFollowersPress} style={styles.centerTouchable}>
						<Text>{screen.language.followers}</Text>
						<Text style={styles.centerText}>{user.followersCount}</Text>
					</TouchableOpacity>
				</View>
			</>
		)
	}
}

export default withTheme(UserProfileHead)
