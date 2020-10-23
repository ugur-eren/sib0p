import React from 'react'
import { View, TextInput, TouchableOpacity, Platform, UIManager, LayoutAnimation } from 'react-native'
import { IconButton, Text, withTheme } from 'react-native-paper'
import Types from '../../Includes/Types/Types'

interface Props {
	theme: Types.Theme
	sendMessage: (message: string) => void
	language: Types.Language
}

interface State {
	messageValue: string
}

class WriteMessage extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			messageValue: '',
		}

		if (Platform.OS === 'android') {
			if (UIManager.setLayoutAnimationEnabledExperimental) {
				UIManager.setLayoutAnimationEnabledExperimental(true)
			}
		}
	}
	private inputRef: TextInput = null

	_onChangeText = (text: string) => {
		LayoutAnimation.configureNext(LayoutAnimation.create(150, 'easeInEaseOut', 'opacity'))
		this.setState({ messageValue: text })
	}

	sendMessage = () => {
		this.setState(
			(state) => {
				this.props.sendMessage(state.messageValue)
				return { messageValue: '' }
			},
			() => {
				setTimeout(() => this.inputRef && this.inputRef.focus(), 50)
			}
		)
	}

	sendImage = () => {}

	render() {
		let { theme, language } = this.props

		return (
			<View style={{ backgroundColor: theme.colors.surface, flexDirection: 'row' }}>
				{false && this.state.messageValue.length < 1 ? <IconButton icon='image' onPress={this.sendImage} /> : <></>}
				<TextInput
					ref={(ref) => (this.inputRef = ref)}
					style={{ flex: 1, color: theme.colors.contrast, paddingHorizontal: 10 }}
					placeholder={language.your_message}
					placeholderTextColor={theme.colors.placeholder}
					value={this.state.messageValue}
					onChangeText={this._onChangeText}
					onSubmitEditing={this.sendMessage}
					blurOnSubmit={false}
				/>
				<IconButton icon='send' onPress={this.sendMessage} />
			</View>
		)
	}
}

export default withTheme(WriteMessage)
