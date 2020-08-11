import React from 'react'
import { View, FlatList, SafeAreaView, TextInput, RefreshControl } from 'react-native'
import { Divider, withTheme, List, Dialog, Button, Paragraph } from 'react-native-paper'
import { Modalize } from 'react-native-modalize'
import Header from '../../Components/Header/Header'
import TextButton from '../../Components/TextButton/TextButton'
import EmptyList from '../../Components/EmptyList/EmptyList'
import Types from '../../Includes/Types/Types'
import CommentTypes from '../../Includes/Types/CommentTypes'
import Api from '../../Includes/Api'
import Comment from './Comment'
import Loader from './Loader'
import { CommentsStyles as styles } from './styles'

interface Props {
	navigation: Types.Navigation<{
		post: number
	}>
	theme: Types.Theme
	customHeader?: React.ComponentType
	customPost?: number
}

interface State {
	loading: boolean
	refreshing: boolean
	comments: CommentTypes.Comment[]
	currentTime: number
	commentInput: string
	activeComment: CommentTypes.Comment
	deleteCommentActive: boolean
	deleteCommentLoading: boolean
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
			activeComment: null,
			deleteCommentActive: false,
			deleteCommentLoading: false,
		}
	}

	private modalRef: any = null
	private postId: number = this.props.customPost || this.props.navigation.getParam('post')
	private newPageActive: boolean = false

	componentDidMount() {
		this.init()
	}

	init = async (refresh?: boolean, nextPage?: boolean) => {
		let screen = this.props.navigation.getScreenProps()

		if (!refresh && !this.state.loading) {
			this.setState({ loading: true })
		}
		let isOk = false
		let comments = await Api.getComments({
			token: screen.user.token,
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
				screen.setCurrentTime(comments.currentTime)
			} else {
				if (comments.error === 'no_login') {
					screen.logout(true)
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
			screen.unknown_error()
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

	sendComment = async () => {
		let screen = this.props.navigation.getScreenProps()

		let response = await Api.doAction({
			post: this.postId,
			token: screen.user.token,
			type: 'comment',
			comment: this.state.commentInput,
		})

		if (response) {
			if (response.status) {
				this.setState({ commentInput: '' })
				this.refresh()
			} else {
				if (response.error === 'no_login') {
					screen.logout(true)
				} else if (response.error === 'no_post') {
					screen.error('Post bulunamadı. Silinmiş olabilir..')
				} else if (response.error === 'same_comment') {
					screen.error('Bu post için aynı yorumu daha önce yapmışsınız.')
				} else {
					screen.unknown_error(response.error)
				}
			}
		} else {
			screen.unknown_error()
		}
	}

	_setModalizeRef = (ref: any) => {
		this.modalRef = ref
	}

	openModal = (comment: CommentTypes.Comment) => {
		this.setState({ activeComment: comment }, () => {
			this.modalRef?.open()
		})
	}

	deleteComment = () => {
		this.modalRef?.close()
		this.setState({ deleteCommentActive: true })
	}

	hideDeleteComment = () => {
		this.setState({ deleteCommentActive: false })
	}

	_deleteComment = async () => {
		this.setState({ deleteCommentLoading: true })
		let screen = this.props.navigation.getScreenProps()

		let response = await Api.doAction({
			type: 'delete_comment',
			token: screen.user.token,
			commentId: this.state.activeComment.id,
		})

		if (response) {
			if (response.status) {
				this.setState({ deleteCommentLoading: false, deleteCommentActive: false })
				this.refresh()
			} else {
				if (response.error === 'no_login') {
					screen.logout(true)
				} else if (response.error === 'no_comment') {
					screen.error('Yorum bulunamadı. Silinmiş olabilir..')
				} else if (response.error === 'no_auth') {
					screen.error('Bu yorumu sadece yorumu paylaşan kullanıcı silebilir.')
				} else {
					screen.unknown_error(response.error)
				}
			}
		} else {
			screen.unknown_error()
		}
	}

	_renderItem = ({ item }) => (
		<Comment navigation={this.props.navigation} openModal={this.openModal} comment={item} currentTime={this.state.currentTime} />
	)
	_itemSeperator = () => <Divider style={styles.itemSeperator} />
	_keyExtractor = (item: CommentTypes.Comment) => item.id.toString()
	_emptyComponent = () => <EmptyList image={require('../../Assets/Images/no-comments.png')} title='Bu gönderiye hiç yorum yapılmamış.' />

	render() {
		let { theme } = this.props
		return (
			<View style={[styles.container, { backgroundColor: theme.colors.background }]}>
				{this.props.customHeader ? <></> : <Header title='Yorumlar' />}

				{this.state.loading ? (
					<Loader theme={theme} />
				) : (
					<>
						<FlatList
							data={this.state.comments}
							keyExtractor={this._keyExtractor}
							ItemSeparatorComponent={this._itemSeperator}
							renderItem={this._renderItem}
							refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.refresh} />}
							ListEmptyComponent={this._emptyComponent}
							onEndReached={this.getNextPage}
							ListHeaderComponent={this.props.customHeader}
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

						<Modalize ref={this._setModalizeRef} adjustToContentHeight modalStyle={{ backgroundColor: this.props.theme.colors.surface }}>
							<List.Section>
								{this.state.activeComment?.isMine ? (
									<List.Item
										title='Sil'
										onPress={this.deleteComment}
										left={(props) => <List.Icon {...props} style={{}} icon='trash-2' />}
									/>
								) : (
									<></>
								)}
							</List.Section>
						</Modalize>

						<Dialog visible={this.state.deleteCommentActive} onDismiss={this.hideDeleteComment}>
							<Dialog.Title>Yorumu Sil</Dialog.Title>
							<Dialog.Content>
								<Paragraph>Bu yorumu silmek istediğinize emin misiniz? Bu işlem geri alınamaz.</Paragraph>
							</Dialog.Content>
							<Dialog.Actions>
								<Button
									onPress={this.state.deleteCommentLoading ? undefined : this._deleteComment}
									color={this.props.theme.colors.main}
									loading={this.state.deleteCommentLoading}
									style={{ marginRight: 15 }}
								>
									Sil
								</Button>
								<Button onPress={this.hideDeleteComment} color={this.props.theme.colors.contrast}>
									İptal
								</Button>
							</Dialog.Actions>
						</Dialog>
					</>
				)}
			</View>
		)
	}
}

export default withTheme(Comments)
