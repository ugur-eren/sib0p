import React from 'react'
import { View, RefreshControl, Share, Platform, FlatList, StyleProp, ViewStyle } from 'react-native'
import { List, withTheme, Dialog, Paragraph, Button } from 'react-native-paper'
import { Modalize } from 'react-native-modalize'
import Post from '../Post/Post'

import Config from '../../Includes/Config'
import Types from '../../Includes/Types/Types'
import PostTypes from '../../Includes/Types/PostTypes'
import styles from './styles'
import Api from '../../Includes/Api'

interface Props {
	navigation: Types.Navigation
	theme: Types.Theme
	posts: PostTypes.Post[]
	currentTime: number
	refresh: () => Promise<any>
	getNextPage: () => Promise<any>
	noUserTouchable?: boolean
	ListHeaderComponent?: React.ComponentType
	ListEmptyComponent?: React.ComponentType
	style?: StyleProp<ViewStyle>
	contentContainerStyle?: StyleProp<ViewStyle>
}

interface State {
	visibleItem: string
	refreshing: boolean
	focused: boolean
	activePost: PostTypes.Post
	reportPostActive: boolean
	deletePostActive: boolean
	deletePostLoading: boolean
}

class Posts extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			visibleItem: '',
			refreshing: false,
			focused: true,
			activePost: null,
			reportPostActive: false,
			deletePostActive: false,
			deletePostLoading: false,
		}
	}

	private _viewabilityConfig = {
		viewAreaCoveragePercentThreshold: 60,
	}

	private focusListener: any = null
	private blurListener: any = null
	private modalRef: any = null

	componentDidMount() {
		this.focusListener = this.props.navigation.addListener('didFocus', () => {
			if (!this.state.focused) this.setState({ focused: true })
		})
		this.blurListener = this.props.navigation.addListener('didBlur', () => {
			if (this.state.focused) this.setState({ focused: false })
		})
	}

	componentWillUnmount() {
		if (this.focusListener) this.focusListener.remove()
		if (this.blurListener) this.blurListener.remove()
	}

	_renderItem = ({ item }: { item: PostTypes.Post }) => (
		<Post
			key={item.id.toString()}
			post={item}
			navigation={this.props.navigation}
			isVisible={this.state.focused && this.state.visibleItem === item.id.toString()}
			currentTime={this.props.currentTime}
			noUserTouchable={this.props.noUserTouchable}
			openModal={this.openModal}
		/>
	)
	_itemSeperatorComponent = () => <View style={styles.itemSeperator}></View>
	_keyExtractor = (item: PostTypes.Post) => item.id.toString()

	_viewableItemsChanged = ({ viewableItems }: { viewableItems: Array<{ index: number; isViewable: boolean; item: PostTypes.Post; key: any }> }) => {
		if (viewableItems.length > 0) {
			this.setState({ visibleItem: viewableItems[0].key })
		} else {
			this.setState({ visibleItem: '' })
		}
	}

	refresh = async () => {
		this.setState({ refreshing: true }, async () => {
			let refresh = await this.props.refresh()
			this.setState({ refreshing: false })
		})
	}

	_setModalizeRef = (ref: any) => {
		this.modalRef = ref
	}

	openModal = (post: PostTypes.Post) => {
		this.setState({ activePost: post }, () => {
			this.modalRef?.open()
		})
	}

	sharePost = () => {
		Share.share({
			message: "sib0p'da paylaşılan bu postu seveceğini düşünüyorum: " + Config.siteUri + 'post/' + this.state.activePost.id,
			url: Config.siteUri + 'post/' + this.state.activePost.id,
			title: Config.siteUri + 'post/' + this.state.activePost.id,
		})
		this.modalRef?.close()
	}

	reportPost = () => {
		this.setState({ reportPostActive: true })
		this.modalRef?.close()
	}

	hideReportPost = () => {
		this.setState({ reportPostActive: false })
	}

	deletePost = () => {
		this.setState({ deletePostActive: true })
		this.modalRef?.close()
	}

	hideDeletePost = () => {
		this.setState({ deletePostActive: false })
	}

	_deletePost = async () => {
		this.setState({ deletePostLoading: true })
		let screen = this.props.navigation.getScreenProps()

		let response = await Api.doAction({
			type: 'delete_post',
			token: screen.user.token,
			post: this.state.activePost.id,
		})

		if (response) {
			if (response.status) {
				this.setState({ deletePostLoading: false, deletePostActive: false })
				this.refresh()
			} else {
				if (response.error === 'no_login') {
					screen.logout(true)
				} else if (response.error === 'no_post') {
					screen.error('Post bulunamadı. Silinmiş olabilir..')
				} else if (response.error === 'no_auth') {
					screen.error('Bu postu sadece postu paylaşan kullanıcı silebilir.')
				} else {
					screen.unknown_error(response.error)
				}
			}
		} else {
			screen.unknown_error()
		}
	}

	render() {
		return (
			<>
				<FlatList
					data={this.props.posts}
					keyExtractor={this._keyExtractor}
					ItemSeparatorComponent={this._itemSeperatorComponent}
					renderItem={this._renderItem}
					extraData={this.state.visibleItem}
					onViewableItemsChanged={this._viewableItemsChanged}
					viewabilityConfig={this._viewabilityConfig}
					removeClippedSubviews={Platform.OS === 'android'}
					refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.refresh} />}
					onEndReached={this.props.getNextPage}
					ListHeaderComponent={this.props.ListHeaderComponent}
					ListEmptyComponent={this.props.ListEmptyComponent}
					style={this.props.style}
					contentContainerStyle={this.props.contentContainerStyle}
				/>

				<Modalize ref={this._setModalizeRef} adjustToContentHeight modalStyle={{ backgroundColor: this.props.theme.colors.surface }}>
					<List.Section>
						<List.Item title='Paylaş' onPress={this.sharePost} left={(props) => <List.Icon {...props} style={{}} icon='share-2' />} />
						<List.Item
							title='Şikayet Et'
							onPress={this.reportPost}
							left={(props) => <List.Icon {...props} style={{}} icon='alert-circle' />}
						/>
						{this.state.activePost?.isMine ? (
							<List.Item title='Sil' onPress={this.deletePost} left={(props) => <List.Icon {...props} style={{}} icon='trash-2' />} />
						) : (
							<></>
						)}
					</List.Section>
				</Modalize>

				<Dialog visible={this.state.reportPostActive} onDismiss={this.hideReportPost}>
					<Dialog.Title>Şikayet Et</Dialog.Title>
					<Dialog.Content>
						<Paragraph>Bu gönderiyi şikayet etmek istediğinize emin misiniz?</Paragraph>
					</Dialog.Content>
					<Dialog.Actions>
						<Button onPress={this.hideReportPost} color={this.props.theme.colors.main} style={{ marginRight: 15 }}>
							Şikayet Et
						</Button>
						<Button onPress={this.hideReportPost} color={this.props.theme.colors.contrast}>
							İptal
						</Button>
					</Dialog.Actions>
				</Dialog>

				<Dialog visible={this.state.deletePostActive} onDismiss={this.hideDeletePost}>
					<Dialog.Title>Gönderiyi Sil</Dialog.Title>
					<Dialog.Content>
						<Paragraph>Bu gönderiyi silmek istediğinize emin misiniz? Bu işlem geri alınamaz.</Paragraph>
					</Dialog.Content>
					<Dialog.Actions>
						<Button
							onPress={this.state.deletePostLoading ? undefined : this._deletePost}
							color={this.props.theme.colors.main}
							loading={this.state.deletePostLoading}
							style={{ marginRight: 15 }}
						>
							Sil
						</Button>
						<Button onPress={this.hideDeletePost} color={this.props.theme.colors.contrast}>
							İptal
						</Button>
					</Dialog.Actions>
				</Dialog>
			</>
		)
	}
}

export default withTheme(Posts)
