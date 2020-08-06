import React from 'react'
import { View, ScrollView, Alert } from 'react-native'
import { Text, Divider, Surface, TouchableRipple, withTheme, Snackbar, IconButton, Portal, Dialog, Paragraph, Button } from 'react-native-paper'
import Feather from 'react-native-vector-icons/Feather'
import ImagePicker from 'react-native-image-crop-picker'
import FastImage from 'react-native-fast-image'
import RNFS from 'react-native-fs'
import Header from '../../Components/Header/Header'
import Input from '../../Components/Input/Input'
import Config from '../../Includes/Config'
import Permissions from '../../Includes/Permissions'
import Types from '../../Includes/Types/Types'
import styles from './styles'

interface Props {
	navigation: Types.Navigation
	theme: Types.Theme
}

interface State {
	loading: boolean
	filePermission: boolean | 'unavailable' | 'blocked'
	error: false | string
	sharePostDialog: boolean
	message: string
	tagsText: string
	tags: string[]
	images: string[]
}

class Share extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			loading: true,
			filePermission: null,
			error: false,
			sharePostDialog: false,
			message: '',
			tagsText: '',
			tags: [],
			images: [],
		}
	}

	// await RNFS.readFile(images.path, 'base64')

	async componentDidMount() {
		let filePerm = await Permissions.requestFile()

		if (filePerm === true) {
		}
		this.setState({ loading: false, filePermission: filePerm })
	}

	addNewMedia = () => {
		ImagePicker.openPicker({
			multiple: false,
			width: 600,
			height: 800,
			cropping: true,
			forceJpg: true,
			freeStyleCropEnabled: true,
			compressImageMaxWidth: 1080,
			compressImageMaxHeight: 1080,
			compressImageQuality: 0.75,
			cropperToolbarTitle: 'Resim Boyutunu Ayarlayınız',
			loadingLabelText: 'Yükleniyor...',
			cropperChooseText: 'Seç',
			cropperCancelText: 'İptal',
		}).then(async (images) => {
			if (images) {
				if (images instanceof Array) {
					let imagePaths = images.map((im) => im.path)
					this.setState({ images: [...imagePaths, ...this.state.images] })
				} else {
					this.setState({ images: [images.path, ...this.state.images] })
				}
			}
		})
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
		text = text.replace('#', '').replace(/[^a-zA-Z0-9ğüşçıİ]/g, '')
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
		console.log(index)
		let tags = [...this.state.tags]
		tags.splice(index, 1)
		this.setState({ tags: tags })
	}

	onSubmit = () => {
		if (this.state.message || this.state.images.length > 0) {
			this.setState({ sharePostDialog: true })
			return

			Alert.alert(
				'Paylaş',
				'Gönderinizi paylaşmak istediğinize emin misiniz?',
				[
					{ text: 'İptal', style: 'cancel' },
					{
						text: 'Paylaş',
						onPress: async () => {
							await new Promise((resolve) => {
								setTimeout(() => {
									resolve()
								}, 2500)
							})
						},
					},
				],
				{ cancelable: false }
			)
		} else {
			this.setState({ error: 'En az bir medya seçmeli ya da mesaj yazmalısınız.' })
		}
	}

	hidePostDialog = () => {
		this.setState({ sharePostDialog: false })
	}

	sharePost = () => {
		this.props.navigation.getScreenProps().sharePost(this.state.message, this.state.tags, this.state.images)
	}

	_renderImages = () => this.state.images.map(this._renderImage)
	_renderImage = (image: string, index: number) => (
		<Surface style={[styles.imageContainer, index % 2 === 1 && { marginRight: 20 }]}>
			<View style={styles.imageContainerInner}>
				<View style={styles.imageFix} />

				<FastImage source={{ uri: image }} style={styles.imageInner} />
			</View>
			<IconButton
				onPress={() => this.removeImage(index)}
				icon='x'
				style={[styles.removeIcon, { backgroundColor: this.props.theme.colors.surface }]}
			/>
		</Surface>
	)

	render() {
		let { theme } = this.props
		return (
			<View style={[styles.container, { backgroundColor: theme.colors.background }]}>
				<Header title='Gönderi Paylaş' />
				<ScrollView>
					<View style={[styles.content, { backgroundColor: theme.colors.surface }]}>
						<View style={styles.topContainer}>
							<View style={styles.topInner}>
								<Feather name='edit-3' size={24} style={styles.topIcon} />
								<Text style={styles.topTitle}>Detay</Text>
							</View>
							<Divider style={styles.divider} />
						</View>

						<View>
							<Input
								value={this.state.message}
								onChangeText={this.onMessageChange}
								placeholder='Mesaj'
								leftIcon='message-square'
								multiline
							/>
							<Input
								value={this.state.tagsText}
								onChangeText={this.onTagsTextChange}
								onSubmitEditing={this.onTagsSubmit}
								placeholder='Etiketler'
								leftIcon='hash'
							/>
							<View style={styles.tags}>
								{this.state.tags.map((tag, index) => (
									<Text
										style={[
											styles.tag,
											{
												backgroundColor: this.props.theme.colors.inputBackground,
												borderColor: this.props.theme.colors.inputBorder,
											},
										]}
										onPress={() => this.removeTag(index)}
									>
										<Text style={styles.tagHash}># </Text>
										{tag}
									</Text>
								))}
							</View>
						</View>
					</View>

					<View style={[styles.content, styles.noBottomContent, { backgroundColor: theme.colors.surface }]}>
						<View style={styles.topContainer}>
							<View style={styles.topInner}>
								<Feather name='image' size={24} style={styles.topIcon} />
								<Text style={styles.topTitle}>Medya</Text>
							</View>
							<Divider style={styles.divider} />
						</View>

						<View style={styles.images}>
							<Surface style={[styles.imageContainer, { marginRight: 20 }]}>
								<View style={styles.imageContainerInner}>
									<View style={styles.imageFix} />

									<TouchableRipple style={styles.imageInner} onPress={this.addNewMedia}>
										<>
											<Feather name='plus' size={64} />
											<View style={styles.imageTouchableFix} />
										</>
									</TouchableRipple>
								</View>
							</Surface>

							{this._renderImages()}
						</View>
					</View>
				</ScrollView>

				<TouchableRipple onPress={this.onSubmit} style={[styles.submitButton, { backgroundColor: theme.colors.primary }]}>
					<>
						<Feather name='upload' size={24} color={this.props.theme.colors.main} style={styles.submitIcon} />
						<Text style={[styles.submitText, { color: this.props.theme.colors.main }]}>Paylaş</Text>
					</>
				</TouchableRipple>

				<Portal>
					<Dialog visible={this.state.sharePostDialog} onDismiss={this.hidePostDialog}>
						<Dialog.Title>Paylaş</Dialog.Title>
						<Dialog.Content>
							<Paragraph>Gönderinizi paylaşmak istediğinize emin misiniz?</Paragraph>
						</Dialog.Content>
						<Dialog.Actions>
							<Button onPress={this.sharePost} color={theme.colors.main} style={{ marginRight: 15 }}>
								Paylaş
							</Button>
							<Button onPress={this.hidePostDialog} color={theme.colors.contrast}>
								İptal
							</Button>
						</Dialog.Actions>
					</Dialog>
				</Portal>

				<Snackbar visible={!!this.state.error} onDismiss={this.onErrorDismiss}>
					<Text style={{ color: theme.colors.contrast }}>{this.state.error}</Text>
				</Snackbar>
			</View>
		)
	}
}

export default withTheme(Share)
