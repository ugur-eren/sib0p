import React from 'react'
import { ActivityIndicator as Spinner, StyleProp, ViewStyle } from 'react-native'
import { withTheme } from 'react-native-paper'
import Types from '../../Includes/Types/Types'

interface Props {
	theme: Types.Theme

	animating?: boolean
	color?: string
	size?: number | 'small' | 'large'
	style?: StyleProp<ViewStyle>
}

class ActivityIndicator extends React.PureComponent<Props, {}> {
	render() {
		return (
			<Spinner
				style={this.props.style}
				size={this.props.size || 'small'}
				color={this.props.color || this.props.theme.colors.main}
				animating={typeof this.props.animating === 'boolean' ? this.props.animating : true}
			/>
		)
	}
}

export default withTheme(ActivityIndicator)