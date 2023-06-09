import React from 'react'
import { View, ScrollView, Alert, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native'
import { Text, Divider, Surface, TouchableRipple, withTheme, Snackbar, IconButton, Portal, Dialog, Paragraph, Button, Chip } from 'react-native-paper'
import Feather from 'react-native-vector-icons/Feather'
import ImagePicker from 'react-native-image-crop-picker'
import FastImage from 'react-native-fast-image'
import Video from 'react-native-video'
import Header from '../../Components/Header/Header'
import Input from '../../Components/Input/Input'
import EmptyList from '../../Components/EmptyList/EmptyList'
import Permissions from '../../Includes/Permissions'
import Types from '../../Includes/Types/Types'
import styles from './styles'
import Config from '../../Includes/Config'

interface Props {
	navigation: Types.Navigation
	theme: Types.Theme
}

interface State {
	loading: boolean
	filePermission: boolean | 'unavailable' | 'blocked'
	error: false | string
	showTypeSelector: boolean
	sharePostDialog: boolean
	message: string
	tagsText: string
	tags: string[]
	images: { type: 'image' | 'video'; content: string }[]
}

class Share extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			loading: true,
			filePermission: null,
			error: false,
			showTypeSelector: false,
			sharePostDialog: false,
			message: '',
			tagsText: '',
			tags: [],
			images: [],
		}
	}
	private focusListener: any = null

	async componentDidMount() {
		let filePerm = await Permissions.requestFile()
		this.setState({ loading: false, filePermission: filePerm })

		this.focusListener = this.props.navigation.addListener('didFocus', async () => {
			let filePerm = await Permissions.requestFile()
			this.setState({ loading: false, filePermission: filePerm })
		})
	}

	componentWillUnmount() {
		if (this.focusListener) this.focusListener.remove()
	}

	hideTypeSelector = () => {
		this.setState({ showTypeSelector: false })
	}
	addNewMediaSelector = () => {
		this.setState({ showTypeSelector: true })
	}
	selectImage = () => {
		this.hideTypeSelector()
		this.addNewMedia('image')
	}
	selectVideo = () => {
		this.hideTypeSelector()
		this.addNewMedia('video')
	}

	addNewMedia = (type: 'image' | 'video') => {
		let screen = this.props.navigation.getScreenProps()

		ImagePicker.openPicker({
			mediaType: type === 'image' ? 'photo' : 'video',
			multiple: false,
			width: 400,
			height: 600,
			cropping: false,
			forceJpg: type === 'image',
			freeStyleCropEnabled: false,
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
					if (images instanceof Array) {
						if (images.filter((im) => im.size > 20971520).length > 0) {
							return this.setState({ error: screen.language.image_size_more })
						}
						let imagePaths = images.map((im) => ({ type: type, content: im.path }))
						this.setState({ images: [...this.state.images, ...imagePaths] })
					} else {
						if (images.size > 20971520) {
							return this.setState({ error: screen.language.image_size_more })
						}
						this.setState({ images: [...this.state.images, { type: type, content: images.path }] })
					}
				}
			})
			.catch(() => {})
	}

	onErrorDismiss = () => {
		this.setState({ error: false })
	}

	removeImage = (index: number) => {
		let images = [...this.state.images]
		images.splice(index, 1)
		this.setState({ images: images })
	}

	onMessageChange = (text: string) => {
		this.setState({ message: text })
	}
	onTagsTextChange = (text: string, submit?: boolean) => {
		text = text.replace('#', '').replace(/[^a-zA-Z0-9ğöüşçıİ ]/g, '')
		let tags = []
		let tagsText = ''

		if (text.indexOf(' ') !== -1) {
			text.split(' ').map((texts) => {
				if (texts) {
					tags.push(texts)
				}
			})
			tags = [...this.state.tags, ...tags]
			tagsText = ''
		} else {
			tags = submit && text ? [...this.state.tags, text] : this.state.tags
			tagsText = submit ? '' : text
		}

		let uniq = [...new Set(tags)]
		this.setState({ tagsText: tagsText, tags: uniq })
	}

	onTagsSubmit = () => {
		this.onTagsTextChange(this.state.tagsText, true)
	}

	removeTag = (index: number) => {
		let tags = [...this.state.tags]
		tags.splice(index, 1)
		this.setState({ tags: tags })
	}

	onSubmit = () => {
		this.onTagsSubmit()
		if (this.state.message || this.state.images.length > 0) {
			this.setState({ sharePostDialog: true })
		} else {
			this.setState({ error: this.props.navigation.getScreenProps().language.must_choose })
		}
	}

	hidePostDialog = () => {
		this.setState({ sharePostDialog: false })
	}

	sharePost = () => {
		let screen = this.props.navigation.getScreenProps()

		if (screen.isSharePostActive()) {
			return Alert.alert(screen.language.error, screen.language.waiting_to_post, [{ style: 'cancel', text: screen.language.ok }])
		}
		this.setState({ sharePostDialog: false })
		screen.sharePost(this.state.message, this.state.tags, this.state.images)
		this.props.navigation.goBack()
	}

	_renderImages = () => this.state.images.map(this._renderImage)
	_renderImage = (image: { type: 'image' | 'video'; content: string }, index: number) => (
		<Surface key={image.content} style={[styles.imageContainer, index % 2 === 1 && { marginRight: 20 }]}>
			<View style={styles.imageContainerInner}>
				<View style={styles.imageFix} />

				{image.type === 'image' ? (
					<FastImage source={{ uri: image.content }} style={styles.imageInner} />
				) : (
					<Video source={{ uri: image.content }} style={styles.imageInner} repeat={true} muted={true} resizeMode='cover' />
				)}
			</View>
			<IconButton
				onPress={() => this.removeImage(index)}
				icon='x'
				style={[styles.removeIcon, { backgroundColor: this.props.theme.colors.surface }]}
			/>
		</Surface>
	)

	_renderTags = () => this.state.tags.map(this._renderTag)
	_renderTag =  (tag: string, index: number) => (
		<Chip key={tag} onPress={() => this.removeTag(index)} style={styles.tagChip}>
			<Text style={styles.tagHash}># </Text> {tag}
		</Chip>
	)

	tryPermissionAgain = async () => {
		if (this.state.filePermission === 'blocked') {
			if (!(await Permissions.openSettings())) {
				this.setState({ error: this.props.navigation.getScreenProps().language.perm_settings_error })
			}
		} else {
			let filePerm = await Permissions.requestFile()
			this.setState({ filePermission: filePerm })
		}
	}

	render() {
		let { theme } = this.props
		let screen = this.props.navigation.getScreenProps()
		return (
			<View style={[styles.container, { backgroundColor: theme.colors.background }]}>
				<Header title={screen.language.share_post} />

				{this.state.filePermission === null ? (
					<View style={styles.loading}>
						<ActivityIndicator size='large' color={theme.colors.main} />
					</View>
				) : this.state.filePermission !== true ? (
					<ScrollView style={{ backgroundColor: theme.colors.background }}>
						<EmptyList
							image={require('../../Assets/Images/error.png')}
							title={
								this.state.filePermission === 'unavailable' ? screen.language.file_perm_unavailable : screen.language.file_perm_ask
							}
						/>

						{this.state.filePermission !== 'unavailable' ? (
							<View style={styles.buttonContainer}>
								<Button mode='contained' onPress={this.tryPermissionAgain} loading={this.state.loading}>
									{this.state.filePermission === 'blocked' ? screen.language.file_perm_open_settins : screen.language.try_again}
								</Button>
							</View>
						) : (
							<></>
						)}
					</ScrollView>
				) : (
					<>
						<ScrollView>
							<View style={[styles.content, { backgroundColor: theme.colors.surface }]}>
								<View style={styles.topContainer}>
									<View style={styles.topInner}>
										<Feather color={theme.colors.contrast} name='edit-3' size={24} style={styles.topIcon} />
										<Text style={styles.topTitle}>{screen.language.detail}</Text>
									</View>
									<Divider style={styles.divider} />
								</View>

								<View>
									<Input
										value={this.state.message}
										onChangeText={this.onMessageChange}
										placeholder={screen.language.message}
										leftIcon='message-square'
										multiline
									/>
									<Input
										value={this.state.tagsText}
										onChangeText={this.onTagsTextChange}
										onSubmitEditing={this.onTagsSubmit}
										onBlur={this.onTagsSubmit}
										placeholder={screen.language.tags}
										leftIcon='hash'
									/>
									<View style={styles.tags}>{this._renderTags()}</View>
								</View>
							</View>

							<View style={[styles.content, styles.noBottomContent, { backgroundColor: theme.colors.surface }]}>
								<View style={styles.topContainer}>
									<View style={styles.topInner}>
										<Feather color={theme.colors.contrast} name='image' size={24} style={styles.topIcon} />
										<Text style={styles.topTitle}>{screen.language.media}</Text>
									</View>
									<Divider style={styles.divider} />
								</View>

								<View style={styles.images}>
									<Surface style={[styles.imageContainer, { marginRight: 20 }]}>
										<View style={styles.imageContainerInner}>
											<View style={styles.imageFix} />

											<TouchableRipple style={styles.imageInner} onPress={this.addNewMediaSelector}>
												<>
													<Feather color={theme.colors.contrast} name='plus' size={64} />
													<View style={styles.imageTouchableFix} />
												</>
											</TouchableRipple>
										</View>
									</Surface>

									{this._renderImages()}
								</View>
							</View>
						</ScrollView>

						<SafeAreaView style={[styles.submitButton, { backgroundColor: theme.colors.primary }]}>
							<TouchableRipple onPress={this.onSubmit} style={styles.submitButtonTouchable}>
								<>
									<Feather name='upload' size={24} color={this.props.theme.colors.main} style={styles.submitIcon} />
									<Text style={[styles.submitText, { color: this.props.theme.colors.main }]}>{screen.language.share}</Text>
								</>
							</TouchableRipple>
						</SafeAreaView>

						{this.state.showTypeSelector ? (
							<View style={[styles.selectorContainer, { backgroundColor: 'rgba(' + theme.colors.surfaceRgb + ', .5)' }]}>
								<TouchableOpacity style={styles.selectorContainer} onPress={this.hideTypeSelector} />

								<View style={styles.selectorInner}>
									<TouchableRipple
										onPress={this.selectImage}
										style={[styles.selectorOption, { backgroundColor: theme.colors.primary, marginRight: 2 }]}
									>
										<>
											<Feather name='image' size={24} color={theme.colors.contrast} />
											<Text style={[styles.selectorOptionItem, { color: theme.colors.contrast }]}>
												{screen.language.picture}
											</Text>
										</>
									</TouchableRipple>

									<TouchableRipple
										onPress={this.selectVideo}
										style={[styles.selectorOption, { backgroundColor: theme.colors.primary }]}
									>
										<>
											<Feather name='video' size={24} color={theme.colors.contrast} />
											<Text style={[styles.selectorOptionItem, { color: theme.colors.contrast }]}>{screen.language.video}</Text>
										</>
									</TouchableRipple>
								</View>
							</View>
						) : (
							<></>
						)}

						<Portal>
							<Dialog visible={this.state.sharePostDialog} onDismiss={this.hidePostDialog}>
								<Dialog.Title>{screen.language.share}</Dialog.Title>
								<Dialog.Content>
									<Paragraph>{screen.language.share_dialog}</Paragraph>
								</Dialog.Content>
								<Dialog.Actions>
									<Button onPress={this.sharePost} color={theme.colors.main} style={{ marginRight: 15 }}>
										{screen.language.share}
									</Button>
									<Button onPress={this.hidePostDialog} color={theme.colors.contrast}>
										{screen.language.cancel}
									</Button>
								</Dialog.Actions>
							</Dialog>
						</Portal>

						<Snackbar visible={!!this.state.error} onDismiss={this.onErrorDismiss}>
							<Text style={{ color: theme.colors.contrast }}>{this.state.error}</Text>
						</Snackbar>
					</>
				)}
			</View>
		)
	}
}

export default withTheme(Share)
