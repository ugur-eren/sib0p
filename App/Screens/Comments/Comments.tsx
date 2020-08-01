import React from 'react'
import { View, FlatList, SafeAreaView, TextInput } from 'react-native'
import { Divider, withTheme } from 'react-native-paper'
import Header from '../../Components/Header/Header'
import TextButton from '../../Components/TextButton/TextButton'
import Types from '../../Includes/Types/Types'
import CommentTypes from '../../Includes/Types/CommentTypes'
import Api from '../../Includes/Api'
import Comment from './Comment'
import { CommentsStyles as styles } from './styles'

interface Props {
	navigation: Types.Navigation<{
		post: number
	}>
	theme: Types.Theme
}

interface State {
	comments: CommentTypes.Comment[]
	currentTime: number
	commentInput: string
}

class Comments extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			comments: [],
			currentTime: 0,
			commentInput: '',
		}
	}

	private postId = this.props.navigation.getParam('post')

	async componentDidMount(){
		let comments = await Api.getComments({ post: this.postId, last: 0 })
		if (comments && comments.status) {
			this.setState({ comments: comments.comments, currentTime: comments.currentTime })
		} else {
		}
	}

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

	_renderItem = ({ item }) => <Comment navigation={this.props.navigation} comment={item} currentTime={this.state.currentTime} />
	_itemSeperator = () => <Divider style={styles.itemSeperator} />
	_keyExtractor = (item: CommentTypes.Comment) => item.id

	render() {
		let { theme } = this.props
		return (
			<View style={[styles.container, { backgroundColor: theme.colors.background }]}>
				<Header title='Yorumlar' />

				<FlatList data={this.state.comments} keyExtractor={this._keyExtractor} ItemSeparatorComponent={this._itemSeperator} renderItem={this._renderItem} />

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
