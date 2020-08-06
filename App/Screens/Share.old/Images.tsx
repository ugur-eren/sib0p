import React from 'react'
import { withTheme } from 'react-native-paper'
import CameraRoll from '@react-native-community/cameraroll'
import { FlatGrid } from 'react-native-super-grid'
import Image from './Image'
import Video from './Video'
import Types from '../../Includes/Types/Types'
import styles from './styles'

interface Props {
    theme: Types.Theme
    images: CameraRoll.PhotoIdentifier[]
    onImagePress: (image: CameraRoll.PhotoIdentifier) => void
}

interface State {
}

class Images extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
		}
	}

	_renderItem = ({ item }: { item: CameraRoll.PhotoIdentifier }) => {
        if (item.node.type.startsWith('video/')){
            return (
                <Video video={item} onVideoPress={this.props.onImagePress} />
            )
        } else {
            return (
                <Image image={item} onImagePress={this.props.onImagePress} />
            )
        }
    }
    _keyExtractor = (item: CameraRoll.PhotoIdentifier) => item.node.image.uri

	render() {
		return (
            <FlatGrid
                spacing={5}
                data={this.props.images}
                itemDimension={100}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
            />
		)
	}
}

export default withTheme(Images)
