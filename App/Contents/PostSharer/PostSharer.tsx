import React from 'react'
import { View, SafeAreaView, LayoutAnimation, Platform, UIManager, Alert } from 'react-native'
import { withTheme } from 'react-native-paper'
import RNFS from 'react-native-fs'
import Types from '../../Includes/Types/Types'
import Api from '../../Includes/Api'

interface Props {
	theme: Types.Theme
	language: Types.Language
	token: string
	sharePost: (props: any) => void
}

interface State {
	active: boolean
	progress: number
}

class PostSharer extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		if (Platform.OS === 'android') {
			if (UIManager.setLayoutAnimationEnabledExperimental) {
				UIManager.setLayoutAnimationEnabledExperimental(true)
			}
		}

		this.state = {
			active: false,
			progress: 0,
		}

		props.sharePost({
			sharePost: this.sharePost,
			isPostActive: this.isPostActive,
		})
	}
	private isActive = false

	sharePost = async (message: string, tags: string[], images: { type: 'image' | 'video'; content: string }[]) => {
		this.isActive = true

		LayoutAnimation.configureNext(LayoutAnimation.create(150, 'easeInEaseOut', 'opacity'))
		this.setState({ active: true, progress: 5 })

		let allImages = []
		if (images && images.length > 0) {
			let i = 0
			for (let image of images) {
				i++
				try {
					let imageFile = await RNFS.readFile(image.content, 'base64')
					allImages.push({ type: image.type, content: imageFile })
				} catch (e) {}

				LayoutAnimation.configureNext(LayoutAnimation.create(150, 'easeInEaseOut', 'opacity'))
				this.setState({ progress: 55 / (images.length / i) })
			}
		} else {
			LayoutAnimation.configureNext(LayoutAnimation.create(150, 'easeInEaseOut', 'opacity'))
			this.setState({ progress: 55 })
		}

		let onUploadProgress = async (progress: { loaded: number; total: number }) => {
			let percent = Math.round((progress.loaded * 100) / progress.total)

			LayoutAnimation.configureNext(LayoutAnimation.create(150, 'easeInEaseOut', 'opacity'))
			this.setState({ progress: 55 + percent * 0.4 })
		}

		let sharePost = await Api.sharePost(
			{
				message: message,
				tags: JSON.stringify(tags),
				images: JSON.stringify(allImages),
				token: this.props.token,
			},
			onUploadProgress
		)
		if (sharePost) {
			if (sharePost.status) {
				Alert.alert(this.props.language.success, this.props.language.post_share_success, [{ style: 'cancel', text: 'Tamam' }])
			} else {
				if (sharePost.error === 'file_too_big'){
					Alert.alert(this.props.language.error, this.props.language.image_size_more, [{ style: 'cancel', text: this.props.language.ok }])
				} else if (sharePost.error === 'no_data'){
					Alert.alert(this.props.language.error, this.props.language.no_post_data, [{ style: 'cancel', text: this.props.language.ok }])
				} else if (sharePost.error === 'video_not_supported') {
					Alert.alert(this.props.language.error, this.props.language.file_not_supported, [{ style: 'cancel', text: this.props.language.ok }])
				} else if (sharePost.error === 'file_too_thin') {
					Alert.alert(this.props.language.error, this.props.language.image_thin, [{ style: 'cancel', text: this.props.language.ok }])
				} else {
					Alert.alert(this.props.language.error, this.props.language.post_share_error, [{ style: 'cancel', text: this.props.language.ok }])
				}
			}
		} else {
			Alert.alert(this.props.language.error, this.props.language.post_share_error, [{ style: 'cancel', text: this.props.language.ok }])
		}

		LayoutAnimation.configureNext(LayoutAnimation.create(150, 'easeInEaseOut', 'opacity'))
		this.setState({ active: false, progress: 0 })
		this.isActive = false
	}

	isPostActive = () => this.isActive

	render() {
		let { theme } = this.props

		if (this.state.active) {
			return (
				<SafeAreaView style={{ backgroundColor: theme.colors.primary }}>
					<View style={{ width: '100%', height: 3 }}>
						<View style={{ height: '100%', width: this.state.progress + '%', backgroundColor: theme.colors.main }}></View>
					</View>
				</SafeAreaView>
			)
		} else {
			return <></>
		}
	}
}

export default withTheme(PostSharer)
