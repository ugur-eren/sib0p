import React from 'react'
import { View } from 'react-native'
import { TouchableRipple, withTheme } from 'react-native-paper'
import CameraRoll from '@react-native-community/cameraroll'
import { FlatGrid } from 'react-native-super-grid'
import FastImage from 'react-native-fast-image'
import ActivityIndicator from '../../Components/ActivityIndicator/ActivityIndicator'
import Permissions from '../../Includes/Permissions'
import Types from '../../Includes/Types/Types'
import styles from './styles'
import Images from './Images'

interface Props {
	navigation: Types.Navigation
	theme: Types.Theme
}

interface State {
	loading: boolean
	filePermission: boolean | 'unavailable' | 'blocked'
	images: CameraRoll.PhotoIdentifier[]
	selectedImage: CameraRoll.PhotoIdentifier
}

class Share extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			loading: true,
			filePermission: null,
			images: [],
			selectedImage: null,
		}
	}

	async componentDidMount() {
		let filePerm = await Permissions.requestFile()

		let images: CameraRoll.PhotoIdentifier[] = []
		if (filePerm === true) {
			let res = await CameraRoll.getPhotos({ first: 1000000 })

			console.log(res)
			images = res.edges
		}
		this.setState({ loading: false, filePermission: filePerm, images: images })
	}

	onImagePress = (image: CameraRoll.PhotoIdentifier) => {
		this.setState({
			selectedImage: image,
		})
	}

	render() {
		return (
			<View style={[styles.container, { backgroundColor: this.props.theme.colors.background }]}>
				{this.state.loading ? (
					<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
						<ActivityIndicator size='large' />
					</View>
				) : (
					<>
						{this.state.selectedImage ? (
							<View style={{ width: '100%', paddingVertical: 10 }}>
								<View style={{ paddingBottom: '50%' }} />
								<FastImage
									source={{ uri: this.state.selectedImage.node.image.uri }}
									style={{ position: 'absolute', left: 0, top: 10, width: '100%', height: '100%' }}
									resizeMode='contain'
								/>
							</View>
						) : (
							<></>
						)}

						<Images images={this.state.images} onImagePress={this.onImagePress} />
					</>
				)}
			</View>
		)
	}
}

export default withTheme(Share)
