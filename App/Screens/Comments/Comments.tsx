import React from 'react'
import { View, FlatList, SafeAreaView, TextInput, RefreshControl } from 'react-native'
import { Divider, withTheme } from 'react-native-paper'
import Header from '../../Components/Header/Header'
import TextButton from '../../Components/TextButton/TextButton'
import EmptyList from '../../Components/EmptyList/EmptyList'
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
	loading: boolean
	refreshing: boolean
	comments: CommentTypes.Comment[]
	currentTime: number
	commentInput: string
}

class Comments extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			loading: false,
			refreshing: false,
			comments: [],
			currentTime: 0,
			commentInput: '',
		}
	}

	private postId: number = this.props.navigation.getParam('post')
	private newPageActive: boolean = false

	componentDidMount() {
		this.init()
	}

	init = async (refresh?: boolean, nextPage?: boolean) => {
		if (!refresh && !this.state.loading) {
			this.setState({ loading: true })
		}
		let isOk = false
		let comments = await Api.getComments({
			token: this.props.navigation.getScreenProps().user.token,
			post: this.postId,
			last: nextPage ? this.state.comments[this.state.comments.length - 1].time : 0,
		})
		if (comments) {
			if (comments.status) {
				isOk = true
				this.setState({
					comments: nextPage ? [...this.state.comments, ...comments.comments] : comments.comments,
					currentTime: comments.currentTime,
				})
			} else {
				if (comments.error === 'no_login') {
					this.props.navigation.getScreenProps().logout(true)
				} else {
					this.props.navigation
						.getScreenProps()
						.error(
							comments.error === 'noPostData'
								? 'Gönderi bilgisi gönderilemedi. Lütfen daha sonra tekrar deneyiniz.'
								: 'Maalesef, Bilinmeyen bir hata ile karşılaştık. ' + comments.error
						)
				}
			}
		} else {
			this.props.navigation.getScreenProps().unknown_error()
		}

		if (isOk) {
			this.setState({ loading: false, refreshing: false })
		}
	}

	refresh = () => {
		this.setState({ refreshing: true }, () => {
			this.init(true)
		})
	}

	getNextPage = async () => {
		if (!this.newPageActive) {
			this.newPageActive = true

			this.init(true, true)

			this.newPageActive = false
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
	_emptyComponent = () => <EmptyList image={require('../../Assets/Images/no-comments.png')} title='Bu gönderiye hiç yorum yapılmamış.' />

	render() {
		let { theme } = this.props
		return (
			<View style={[styles.container, { backgroundColor: theme.colors.background }]}>
				<Header title='Yorumlar' />

				<FlatList
					data={this.state.comments}
					keyExtractor={this._keyExtractor}
					ItemSeparatorComponent={this._itemSeperator}
					renderItem={this._renderItem}
					refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.refresh} />}
					ListEmptyComponent={this._emptyComponent}
					onEndReached={this.getNextPage}
				/>

				<SafeAreaView style={[styles.writeCommentContainer, { backgroundColor: theme.colors.primary }]}>
					<TextInput
						value={this.state.commentInput}
						onChangeText={this.handleCommentChange}
						placeholder={'Yorumunuz...'}
						placeholderTextColor={theme.colors.halfContrast}
						style={[styles.writeCommentInput, { color: theme.colors.contrast }]}
						keyboardAppearance={this.props.theme.dark ? 'dark' : 'default'}
					/>

					<TextButton label='Gönder' loadable onPress={this.sendComment} />
				</SafeAreaView>
			</View>
		)
	}
}

export default withTheme(Comments)
