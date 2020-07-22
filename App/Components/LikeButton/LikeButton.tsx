import React from 'react'
import { View, StyleProp, ViewStyle } from 'react-native'
import { Text, IconButton, withTheme } from 'react-native-paper'
import Types from '../../Includes/Types/Types'
import styles from './styles'

interface Props {
	theme: Types.Theme
	type: 'like' | 'dislike'
	active: boolean
	count: number

	onPress: () => any

	containerStyle?: StyleProp<ViewStyle>
}

interface State {}

class LikeButton extends React.PureComponent<Props, State> {
	render() {
		return (
			<View style={[styles.container, this.props.containerStyle]}>
				<IconButton
					icon={this.props.type == 'like' ? 'thumbs-up' : 'thumbs-down'}
					color={this.props.active ? this.props.theme.colors.success : this.props.theme.colors.contrast}
					onPress={() => {}}
					size={22}
				/>
				<Text style={styles.count}>{this.props.count}</Text>
			</View>
		)
	}
}

export default withTheme(LikeButton)
