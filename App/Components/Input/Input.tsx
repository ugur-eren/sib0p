import React from 'react'
import { View, TextInput, StyleProp, ViewStyle, TextStyle, TextInputProps } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import Feather from 'react-native-vector-icons/Feather'

import styles from './styles'
import { withTheme } from 'react-native-paper'
import Types from '../../Includes/Types/Types'

interface Props extends TextInputProps {
	theme: Types.Theme

	containerStyle?: StyleProp<ViewStyle>
	style?: StyleProp<ViewStyle>
	inputStyle?: StyleProp<TextStyle>
	leftIconStyle?: StyleProp<TextStyle>
	rightIconStyle?: StyleProp<TextStyle>

	placeholder: string
	value: string
	error?: string
	leftIcon?: string
	rightIcon?: string

	multiline?: boolean
	password?: boolean
	number?: boolean
	email?: boolean

	onChangeText?: (text: string) => void
	leftIconOnPress?: () => void
	rightIconOnPress?: () => void
}

interface State {
	passwordShown: boolean
}

class Input extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			passwordShown: false,
		}
	}

	onPasswordPress = () => {
		this.setState({ passwordShown: !this.state.passwordShown })
	}

	render() {
		let { containerStyle, style, inputStyle, onChangeText, placeholder, rightIcon, leftIcon, theme, multiline, ...inputProps } = this.props
		return (
			<View style={[styles.container, this.props.containerStyle]}>
				<View
					style={[
						styles.inner,
						{
							backgroundColor: theme.colors.inputBackground,
							borderColor: this.props.error ? theme.colors.error : theme.colors.inputBorder,
						},
						multiline && { alignItems: 'flex-start' },
						this.props.style,
					]}
				>
					{leftIcon ? (
						<Feather
							name={leftIcon}
							size={23}
							color={theme.colors.halfContrast}
							style={[styles.leftIconStyle, this.props.leftIconStyle, multiline && { top: 10 }]}
							onPress={this.props.leftIconOnPress}
						/>
					) : (
						<></>
					)}

					<TextInput
						value={this.props.value}
						placeholder={this.props.placeholder}
						onChangeText={this.props.onChangeText}
						style={[
							styles.input,
							{ color: theme.colors.contrast },
							multiline && { minHeight: 100, textAlignVertical: 'top' },
							this.props.inputStyle,
						]}
						multiline={multiline}
						placeholderTextColor={theme.colors.halfContrast}
						keyboardAppearance={theme.dark ? 'dark' : 'default'}
						secureTextEntry={this.props.password && !this.state.passwordShown}
						keyboardType={this.props.number ? 'number-pad' : this.props.email ? 'email-address' : 'default'}
						{...inputProps}
					/>

					{this.props.password ? (
						<IconButton
							icon={this.state.passwordShown ? 'eye-off' : 'eye'}
							size={23}
							color={theme.colors.halfContrast}
							style={[styles.rightIconStyle, this.props.rightIconStyle, multiline && { top: 10 }]}
							onPress={this.onPasswordPress}
						/>
					) : rightIcon ? (
						<Feather
							name={rightIcon}
							size={23}
							color={theme.colors.halfContrast}
							style={[styles.rightIconStyle, this.props.rightIconStyle, multiline && { top: 10 }]}
							onPress={this.props.rightIconOnPress}
						/>
					) : (
						<></>
					)}
				</View>

				{this.props.error ? <Text style={[styles.errorText, { color: theme.colors.error }]}>{this.props.error}</Text> : <></>}
			</View>
		)
	}
}

export default withTheme(Input)
