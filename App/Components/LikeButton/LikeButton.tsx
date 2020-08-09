import React from 'react'
import { View, StyleProp, ViewStyle } from 'react-native'
import { Text, IconButton, useTheme } from 'react-native-paper'
import Types from '../../Includes/Types/Types'
import styles from './styles'

interface Props {
	type: 'like' | 'dislike' | 'resib'
	active: boolean
	count: number

	onPress: () => any

	containerStyle?: StyleProp<ViewStyle>
}

const LikeButton = (props: Props) => {
	const theme: Types.Theme = useTheme() as any

	const _onPress = () => {
		props.onPress()
	}
	
	return (
		<View style={[styles.container, props.containerStyle]}>
			<IconButton
				icon={props.type == 'like' ? 'thumbs-up' : props.type == 'dislike' ? 'thumbs-down' : 'git-pull-request'}
				color={props.active ? theme.colors.success : theme.colors.contrast}
				onPress={_onPress}
				size={22}
			/>
			<Text style={styles.count}>{props.count}</Text>
		</View>
	)
}

export default React.memo(LikeButton)
