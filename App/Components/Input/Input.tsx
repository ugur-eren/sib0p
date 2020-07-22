import React from 'react'
import { View, TextInput, StyleProp, ViewStyle, TextStyle } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'

import styles from './styles'
import { withTheme } from 'react-native-paper'
import Types from '../../Includes/Types/Types'

interface Props {
	theme: Types.Theme

	containerStyle?: StyleProp<ViewStyle>
	style?: StyleProp<ViewStyle>
	inputStyle?: StyleProp<TextStyle>
	leftIconStyle?: StyleProp<TextStyle>
	rightIconStyle?: StyleProp<TextStyle>

	placeholder: string
	value: string
	leftIcon?: string
	rightIcon?: string

	password?: boolean
	number?: boolean
	email?: boolean
	
	onChangeText?: (text: string) => void
	leftIconOnPress?: () => void
	rightIconOnPress?: () => void
}

interface State {

}

class Input extends React.PureComponent<Props, State> {
	render(){
		let { containerStyle, style, inputStyle, onChangeText, placeholder, rightIcon, leftIcon, theme, ...inputProps } = this.props
		return (
			<View style={[styles.container, this.props.containerStyle]}>
				<View style={[styles.inner, {backgroundColor: theme.colors.inputBackground, borderColor: theme.colors.inputBorder}, this.props.style]}>
					{leftIcon ? (
						<Feather
							name={leftIcon}
							size={23}
							color={theme.colors.halfContrast}
							style={this.props.leftIconStyle}
							onPress={this.props.leftIconOnPress}
						/>
					) : (
						<></>
					)}

					<TextInput
						value={this.props.value}
						placeholder={this.props.placeholder}
						onChangeText={this.props.onChangeText}
						style={[styles.input, {color: theme.colors.contrast}, this.props.inputStyle]}
						placeholderTextColor={theme.colors.halfContrast}
						keyboardAppearance={theme.dark ? 'dark' : 'default'}

						secureTextEntry={this.props.password}
						keyboardType={this.props.number ? 'number-pad' : (this.props.email ? 'email-address' : 'default')}

						{...inputProps}
					/>

					{rightIcon ? (
						<Feather
							name={rightIcon}
							size={23}
							color={theme.colors.halfContrast}
							style={this.props.rightIconStyle}
							onPress={this.props.rightIconOnPress}
						/>
					) : (
						<></>
					)}
				</View>
			</View>
		)
	}
}

export default withTheme(Input)