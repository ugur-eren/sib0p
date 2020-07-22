import React from 'react'
import { View, FlatList, SafeAreaView, TextInput } from 'react-native'
import { Text, Divider, withTheme } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Header from '../../Components/Header/Header'
import Comment from './Comment'
import Types from '../../Includes/Types/Types'
import CommentTypes from '../../Includes/Types/CommentTypes'
import TextButton from '../../Components/TextButton/TextButton'
import { CommentsStyles as styles } from './styles'

interface Props {
	navigation: Types.Navigation<{
		comments: CommentTypes.Comment[]
	}>
	theme: Types.Theme
}

interface State {
	commentInput: string
}

class Comments extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			commentInput: '',
		}
	}

	comments = this.props.navigation.getParam('comments')

	handleCommentChange = (text: string) => {
		this.setState({ commentInput: text })
	}

	sendComment = () => {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve()
			}, 1000)
		})
	}

	_renderItem = ({ item }) => <Comment navigation={this.props.navigation} comment={item} />
	_itemSeperator = () => <Divider style={styles.itemSeperator} />
	_keyExtractor = (item: CommentTypes.Comment) => item.id

	render() {
		let { theme } = this.props
		return (
			<View style={[styles.container, { backgroundColor: theme.colors.background }]}>
				<Header title='Yorumlar' />

				<FlatList data={this.comments} keyExtractor={this._keyExtractor} ItemSeparatorComponent={this._itemSeperator} renderItem={this._renderItem} />

				<SafeAreaView style={[styles.writeCommentContainer, { backgroundColor: theme.colors.primary }]}>
					<TextInput
						value={this.state.commentInput}
						onChangeText={this.handleCommentChange}
						placeholder={'Yorumunuz...'}
						placeholderTextColor={theme.colors.halfContrast}
						style={[styles.writeCommentInput, { color: theme.colors.contrast }]}
					/>

					<TextButton label='Gönder' loadable onPress={this.sendComment} />
				</SafeAreaView>
			</View>
		)
	}
}

export default withTheme(Comments)
