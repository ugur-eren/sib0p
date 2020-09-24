import React from 'react'
import { View, TextInput, TouchableOpacity, Platform, UIManager, LayoutAnimation } from 'react-native'
import { IconButton, Text, withTheme } from 'react-native-paper'
import Types from '../../Includes/Types/Types'

interface Props {
	theme: Types.Theme
	sendMessage: (message: string) => void
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

	_onChangeText = (text: string) => {
		LayoutAnimation.configureNext(LayoutAnimation.create(150, 'easeInEaseOut', 'opacity'))
		this.setState({ messageValue: text })
	}

	sendMessage = () => {
		this.props.sendMessage(this.state.messageValue)
		this.setState({ messageValue: '' })
	}

	sendImage = () => {}

	render() {
		let { theme } = this.props

		return (
			<View style={{ backgroundColor: theme.colors.surface, flexDirection: 'row' }}>
				{this.state.messageValue.length < 1 ? <IconButton icon='image' onPress={this.sendImage} /> : <></>}
				<TextInput
					style={{ flex: 1, color: theme.colors.contrast, paddingHorizontal: 10 }}
					placeholder='Mesajınız..'
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
