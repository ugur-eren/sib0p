import React from 'react'
import { Dimensions, View, SafeAreaView, ViewBase } from 'react-native'
import { withTheme } from 'react-native-paper'
import { Bar as ProgressBar } from 'react-native-progress'
import RNFS from 'react-native-fs'
import Types from './Types/Types'
import { all } from 'core-js/fn/promise'

interface Props {
	theme: Types.Theme
	sharePost: (props: any) => void
}

interface State {
	active: boolean
	progress: number
}

class PostSharer extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			active: false,
			progress: 0,
		}

		props.sharePost({
			sharePost: this.sharePost,
		})
	}

	sharePost = async (message: string, tags: string[], images: string[]) => {
		this.setState({ active: true, progress: 0 })

		let allImages = []
		if (images && images.length > 0) {
			for (let image of images) {
				try {
					let imageFile = await RNFS.readFile(image, 'base64')

					allImages.push(imageFile)
				} catch (e) {
					if (__DEV__) console.log('image read error', e)
				}
			}
		}
	}

	render() {
		let { theme } = this.props

		if (this.state.active) {
			return (
				<SafeAreaView style={{ backgroundColor: theme.colors.primary }}>
					<View style={{ width: '100%', height: 3 }}>
						<View style={{ height: '100%', width: '10%', backgroundColor: theme.colors.main }}></View>
					</View>
				</SafeAreaView>
			)
		} else {
			return <></>
		}
	}
}

export default withTheme(PostSharer)
