import React, { useState } from 'react'
import { ViewStyle, TextStyle } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Types from '../../Includes/Types/Types'
import styles from './styles'

interface Props {
	label: string
	loadable?: boolean
	containerStyle?: ViewStyle
	style?: TextStyle
	onPress: () => any
	language: Types.Language
}

const TextButton = (props: Props) => {
	const theme: Types.Theme = useTheme() as any
	const [loading, setLoading] = useState(false)

	const onPress = async () => {
		if (!loading && props.loadable) {
			setLoading(true)
			await props.onPress()
			setLoading(false)
		} else if (props.loadable) {
			props.onPress()
		}
	}

	return (
		<TouchableOpacity onPress={onPress} style={[styles.container, props.containerStyle]}>
			<Text style={[{ color: loading ? theme.colors.halfContrast : theme.colors.main }, props.style]}>
				{loading ? props.language.loading : props.label}
			</Text>
		</TouchableOpacity>
	)
}

export default React.memo(TextButton)
