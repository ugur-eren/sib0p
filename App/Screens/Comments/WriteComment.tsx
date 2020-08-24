import React from 'react'
import { KeyboardAvoidingView, SafeAreaView, TextInput, Platform } from 'react-native'
import { withTheme } from 'react-native-paper'
import TextButton from '../../Components/TextButton/TextButton'
import { CommentsStyles as styles } from './styles'
import Types from '../../Includes/Types/Types'
import Api from '../../Includes/Api'

interface Props {
	theme: Types.Theme
	screen: Types.ScreenProps
	postId: number
	refresh: any
}

interface State {
	commentInput: string
}

class WriteComment extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			commentInput: '',
		}
	}

	handleCommentChange = (text: string) => {
		this.setState({ commentInput: text })
	}

	sendComment = async () => {
		let { screen } = this.props

		if (!this.state.commentInput.trim()) return

		let response = await Api.doAction({
			post: this.props.postId,
			token: screen.user.token,
			type: 'comment',
			comment: this.state.commentInput,
		})

		if (response) {
			if (response.status) {
				this.setState({ commentInput: '' })
				this.props.refresh()
			} else {
				if (response.error === 'no_login') {
					screen.logout(true)
				} else if (response.error === 'too_fast_action') {
					screen.error(screen.language.too_fast_action)
				} else if (response.error === 'no_post') {
					screen.error(screen.language.no_post_error)
				} else if (response.error === 'same_comment') {
					screen.error(screen.language.same_comment_error)
				} else if (response.error === 'comment_empty') {
					screen.error(screen.language.comment_empty)
				} else {
					screen.unknown_error(response.error)
				}
			}
		} else {
			screen.unknown_error()
		}
	}

	render() {
		let { theme, screen } = this.props

		return (
			<KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior='position'>
				<SafeAreaView style={[styles.writeCommentContainer, { backgroundColor: theme.colors.primary }]}>
					<TextInput
						value={this.state.commentInput}
						onChangeText={this.handleCommentChange}
						placeholder={screen.language.your_comment}
						placeholderTextColor={theme.colors.halfContrast}
						style={[styles.writeCommentInput, { color: theme.colors.contrast }]}
						keyboardAppearance={theme.dark ? 'dark' : 'default'}
					/>

					<TextButton label={screen.language.send} loadable onPress={this.sendComment} language={screen.language} />
				</SafeAreaView>
			</KeyboardAvoidingView>
		)
	}
}

export default withTheme(WriteComment)
