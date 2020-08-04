import React from 'react'
import { View, Dimensions, StyleProp, ImageStyle } from 'react-native'
import FastImage, { OnProgressEvent } from 'react-native-fast-image'
import { Circle as CircleProgress } from 'react-native-progress'
import Types from '../../Includes/Types/Types'
import PostTypes from '../../Includes/Types/PostTypes'
import { withTheme } from 'react-native-paper'

interface Props {
	theme: Types.Theme
	navigation: Types.Navigation
	post: PostTypes.PostData
	isVisible: boolean
	style?: StyleProp<ImageStyle>
}

interface State {
	imageProgress: number
}

class Image extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			imageProgress: 0,
		}
	}

	private width = Dimensions.get('window').width

	_ImageLoading = (event: OnProgressEvent) => {
		if (this.props.post.uri === 'https://sib0p.com/inc/imgs/posts/1596243706-1343-9-0.jpg') {
			console.log(event.nativeEvent.loaded / event.nativeEvent.total)
		}
		if (event.nativeEvent.loaded / event.nativeEvent.total > this.state.imageProgress) {
			this.setState({ imageProgress: event.nativeEvent.loaded / event.nativeEvent.total })
		}
	}

	_formatImageLoadingText = () => {
		return Math.round(this.state.imageProgress * 100) + ' %'
	}

	_ImageLoadEnd = () => {
		this.setState({ imageProgress: 1 })
	}

	render() {
		let { post, theme } = this.props
		return (
			<View>
				<FastImage
					source={{ uri: post.uri }}
					style={[this.props.style, { height: this.width / post.ratio }]}
					onProgress={this._ImageLoading}
					onLoadEnd={this._ImageLoadEnd}
				/>
				{this.state.imageProgress == 1 ? (
					<></>
				) : (
					<View
						style={{
							backgroundColor: 'rgba(' + theme.colors.surfaceRgb + ', .8)',
							position: 'absolute',
							left: 0,
							top: 0,
							width: '100%',
							height: '100%',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<FastImage
							style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
							source={{ uri: 'data:image/jpeg;base64,' + post.thumbnail }}
						/>
						<CircleProgress
							size={120}
							progress={this.state.imageProgress}
							color={theme.colors.main}
							showsText
							formatText={this._formatImageLoadingText}
						/>
					</View>
				)}
			</View>
		)
	}
}

export default withTheme(Image)
