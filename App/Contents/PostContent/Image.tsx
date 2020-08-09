import React, { useState } from 'react'
import { View, Dimensions, StyleProp, ImageStyle } from 'react-native'
import { useTheme } from 'react-native-paper'
import FastImage, { OnProgressEvent } from 'react-native-fast-image'
import { Circle as CircleProgress } from 'react-native-progress'
import Types from '../../Includes/Types/Types'
import PostTypes from '../../Includes/Types/PostTypes'
import styles from './styles'

interface Props {
	navigation: Types.Navigation
	post: PostTypes.PostData
	isVisible: boolean
	style?: StyleProp<ImageStyle>
}

const Image = (props: Props) => {
	const theme: Types.Theme = useTheme() as any
	const [imageProgress, setImageProgress] = useState(0)

	const width = Dimensions.get('window').width

	const _ImageLoading = (event: OnProgressEvent) => {
		if (event.nativeEvent.loaded / event.nativeEvent.total > imageProgress + 0.1) {
			setImageProgress(event.nativeEvent.loaded / event.nativeEvent.total)
		}
	}

	const _formatImageLoadingText = () => {
		return Math.round(imageProgress * 100) + ' %'
	}

	const _ImageLoadEnd = () => {
		setImageProgress(1)
	}

	return (
		<View>
			<FastImage
				source={{ uri: props.post.uri }}
				style={[props.style, { height: width / props.post.ratio }]}
				onProgress={_ImageLoading}
				onLoadEnd={_ImageLoadEnd}
			/>
			{imageProgress == 1 ? (
				<></>
			) : (
				<View style={[styles.loader, { backgroundColor: 'rgba(' + theme.colors.surfaceRgb + ', .8)' }]}>
					<FastImage style={styles.loader} source={{ uri: props.post.thumbnail }} />
					<CircleProgress
						size={120}
						progress={imageProgress}
						color={theme.colors.main}
						formatText={_formatImageLoadingText}
						showsText
						animated
					/>
				</View>
			)}
		</View>
	)
}

export default React.memo(Image)
