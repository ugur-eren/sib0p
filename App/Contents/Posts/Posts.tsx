import React from 'react'
import { View, RefreshControl, Share, Platform, FlatList, StyleProp, ViewStyle } from 'react-native'
import { List, withTheme } from 'react-native-paper'
import { Modalize } from 'react-native-modalize'
import Post from '../Post/Post'

import Config from '../../Includes/Config'
import Types from '../../Includes/Types/Types'
import PostTypes from '../../Includes/Types/PostTypes'
import styles from './styles'

interface Props {
	navigation: Types.Navigation
	theme: Types.Theme
	posts: PostTypes.Post[]
	currentTime: number
	refresh: () => Promise<any>
	getNextPage: () => Promise<any>
	noUserTouchable?: boolean
	ListHeaderComponent?: () => JSX.Element
	ListEmptyComponent?: () => JSX.Element
	style?: StyleProp<ViewStyle>
	contentContainerStyle?: StyleProp<ViewStyle>
}

interface State {
	visibleItem: string
	refreshing: boolean
	focused: boolean
	activePost: PostTypes.Post
}

class Posts extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			visibleItem: '',
			refreshing: false,
			focused: true,
			activePost: null,
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

	_renderItem = ({ item }: { item: PostTypes.Post }) => {
		console.log(this.state.focused && this.state.visibleItem === item.id.toString())
		return (
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
	}
	_itemSeperatorComponent = () => <View style={styles.itemSeperator}></View>
	_keyExtractor = (item: PostTypes.Post) => item.id

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
		this.setState({ activePost: post })
		this.modalRef?.open()
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
		this.modalRef?.close()
	}

	deletePost = () => {
		this.modalRef?.close()
	}

	render() {
		console.log(this.state.visibleItem)
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
			</>
		)
	}
}

export default withTheme(Posts)
