import React from 'react'
import { View, FlatList, RefreshControl } from 'react-native'
import { Divider, withTheme, List, Dialog, Button, Paragraph, Portal } from 'react-native-paper'
import { Modalize } from 'react-native-modalize'
import Header from '../../Components/Header/Header'
import EmptyList from '../../Components/EmptyList/EmptyList'
import Types from '../../Includes/Types/Types'
import CommentTypes from '../../Includes/Types/CommentTypes'
import Api from '../../Includes/Api'
import Comment from './Comment'
import Loader from './Loader'
import { CommentsStyles as styles } from './styles'
import WriteComment from './WriteComment'

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
		let comments = await Api.getComments({
			token: screen.user.token,
			post: this.postId,
			last: nextPage ? this.state.comments[this.state.comments.length - 1].time : 0,
		})
		let stateObject = {}

		if (comments) {
			if (comments.status) {
				stateObject = {
					comments: nextPage ? [...this.state.comments, ...comments.comments] : comments.comments,
					currentTime: comments.currentTime,
				}
				screen.setCurrentTime(comments.currentTime)
			} else {
				if (comments.error === 'no_login') {
					screen.logout(true)
				} else if (comments.error === 'too_fast_action') {
					screen.error(screen.language.too_fast_action)
				} else {
					this.props.navigation
						.getScreenProps()
						.error(comments.error === 'noPostData' ? screen.language.no_post_data : screen.language.unknown_error + comments.error)
				}
			}
		} else {
			screen.unknown_error()
		}

		stateObject = { ...stateObject, loading: false, refreshing: false }
		
		this.setState(stateObject, () => {
			if (nextPage) this.newPageActive = false
		})
	}

	refresh = () => {
		this.setState({ refreshing: true }, () => {
			this.init(true)
		})
	}

	getNextPage = async () => {
		if (this.newPageActive) return
		this.newPageActive = true
		return this.init(true, true)
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
				} else if (response.error === 'too_fast_action') {
					screen.error(screen.language.too_fast_action)
				} else if (response.error === 'no_comment') {
					screen.error(screen.language.no_comment_error)
				} else if (response.error === 'no_auth') {
					screen.error(screen.language.comment_auth_error)
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
	_emptyComponent = () => (
		<EmptyList image={require('../../Assets/Images/no-comments.png')} title={this.props.navigation.getScreenProps().language.no_comments_made} />
	)

	render() {
		let { theme } = this.props
		let screen = this.props.navigation.getScreenProps()
		return (
			<View style={[styles.container, { backgroundColor: theme.colors.background }]}>
				{this.props.customHeader ? <></> : <Header title={screen.language.comments} />}

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

						<WriteComment postId={this.postId} refresh={this.refresh} screen={screen} />

						<Portal>
							<Modalize
								ref={this._setModalizeRef}
								adjustToContentHeight
								modalStyle={{ backgroundColor: this.props.theme.colors.surface }}
							>
								<List.Section>
									{this.state.activeComment?.isMine ? (
										<List.Item
											title={screen.language.delete}
											onPress={this.deleteComment}
											left={(props) => <List.Icon {...props} style={{}} icon='trash-2' />}
										/>
									) : (
										<></>
									)}
								</List.Section>
							</Modalize>
						</Portal>

						<Dialog visible={this.state.deleteCommentActive} onDismiss={this.hideDeleteComment}>
							<Dialog.Title>{screen.language.delete_comment}</Dialog.Title>
							<Dialog.Content>
								<Paragraph>{screen.language.delete_comment_dialog}</Paragraph>
							</Dialog.Content>
							<Dialog.Actions>
								<Button
									onPress={this.state.deleteCommentLoading ? undefined : this._deleteComment}
									color={this.props.theme.colors.main}
									loading={this.state.deleteCommentLoading}
									style={{ marginRight: 15 }}
								>
									{screen.language.delete}
								</Button>
								<Button onPress={this.hideDeleteComment} color={this.props.theme.colors.contrast}>
									{screen.language.cancel}
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
