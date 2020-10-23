import React, { useState } from 'react'
import { View, StyleProp, ViewStyle } from 'react-native'
import { Text, IconButton, ActivityIndicator, useTheme, withTheme } from 'react-native-paper'
import Types from '../../Includes/Types/Types'
import styles from './styles'

interface Props {
	theme: Types.Theme
	type: 'like' | 'dislike' | 'resib'
	active: boolean
	count: number

	onPress: () => Promise<void>

	containerStyle?: StyleProp<ViewStyle>
	small?: boolean
}

interface State {
	loading: boolean
}

class LikeButton extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			loading: false,
		}
	}

	_onPress = async () => {
		if (!this.state.loading) {
			this.setState({ loading: true })
			await this.props.onPress()
			this.setState({ loading: false })
		}
	}

	render() {
		let { theme, type, small } = this.props
		return (
			<View style={[styles.container, this.props.containerStyle]}>
				{this.state.loading ? (
					<ActivityIndicator size={22} color={theme.colors.main} style={styles.loading} />
				) : (
					<IconButton
						icon={type == 'like' ? 'thumbs-up' : type == 'dislike' ? 'thumbs-down' : 'repeat'}
						color={
							this.props.active
								? type == 'dislike'
									? theme.colors.error
									: type == 'resib'
									? theme.colors.main
									: theme.colors.success
								: theme.colors.contrast
						}
						onPress={this._onPress}
						size={small ? 18 : 22}
					/>
				)}
				<Text style={small ? styles.smallCount : styles.count}>{this.props.count}</Text>
			</View>
		)
	}
}

export default withTheme(LikeButton)
