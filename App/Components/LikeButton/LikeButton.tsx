import React, { useState } from 'react'
import { View, StyleProp, ViewStyle } from 'react-native'
import { Text, IconButton, ActivityIndicator, useTheme } from 'react-native-paper'
import Types from '../../Includes/Types/Types'
import styles from './styles'

interface Props {
	type: 'like' | 'dislike' | 'resib'
	active: boolean
	count: number

	onPress: () => Promise<void>

	containerStyle?: StyleProp<ViewStyle>
}

const LikeButton = (props: Props) => {
	const theme: Types.Theme = useTheme() as any
	const [loading, setLoading] = useState(false)

	const _onPress = async () => {
		if (!loading) {
			setLoading(true)
			await props.onPress()
			setLoading(false)
		}
	}

	return (
		<View style={[styles.container, props.containerStyle]}>
			{loading ? (
				<ActivityIndicator size={22} color={theme.colors.main} style={styles.loading} />
			) : (
				<IconButton
					icon={props.type == 'like' ? 'thumbs-up' : props.type == 'dislike' ? 'thumbs-down' : 'git-pull-request'}
					color={props.active ? (props.type == 'dislike' ? theme.colors.error : theme.colors.success) : theme.colors.contrast}
					onPress={_onPress}
					size={22}
				/>
			)}
			<Text style={styles.count}>{props.count}</Text>
		</View>
	)
}

export default React.memo(LikeButton)
