import React from 'react'
import { View, RefreshControl, Share, Platform, FlatList, StyleProp, ViewStyle, FlatListProps } from 'react-native'
import { List, withTheme, Dialog, Paragraph, Button, Divider, RadioButton } from 'react-native-paper'
import { Modalize } from 'react-native-modalize'
import Post from '../Post/Post'
import Config from '../../Includes/Config'
import CustomButton from '../../Components/Button/Button'
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
	ListFooterComponent?: React.ComponentType
	style?: StyleProp<ViewStyle>
	contentContainerStyle?: StyleProp<ViewStyle>
}

interface State {
	visibleItem: string
	refreshing: boolean
	focused: boolean
	activePost: PostTypes.Post
	reportPostLoading: boolean
	selectedReportType: Types.ReportTypes
	reportDialog: false | Types.ReportTypes
	deletePostActive: boolean
	deletePostLoading: boolean
	hidePostLoading: boolean
}

class Posts extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			visibleItem: '',
			refreshing: false,
			focused: true,
			activePost: null,
			reportPostLoading: false,
			selectedReportType: 'spam',
			reportDialog: false,
			deletePostActive: false,
			deletePostLoading: false,
			hidePostLoading: false,
		}
	}

	private _viewabilityConfig = {
		viewAreaCoveragePercentThreshold: 60,
	}

	private focusListener: any = null
	private blurListener: any = null
	private modalRef: any = null
	private reportModalRef: any = null

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
			await this.props.refresh()
			this.setState({ refreshing: false })
		})
	}

	_setModalizeRef = (ref: any) => {
		this.modalRef = ref
	}

	_setReportModalizeRef = (ref: any) => {
		this.reportModalRef = ref
	}

	openModal = (post: PostTypes.Post) => {
		this.setState({ activePost: post }, () => {
			this.modalRef?.open()
		})
	}

	sharePost = () => {
		Share.share({
			message: this.props.navigation.getScreenProps().language.share_text + Config.siteUri + 'post/' + this.state.activePost.id,
			url: Config.siteUri + 'post/' + this.state.activePost.id,
			title: Config.siteUri + 'post/' + this.state.activePost.id,
		})
		this.modalRef?.close()
	}

	reportPost = () => {
		this.modalRef?.close()
		this.reportModalRef?.open()
	}

	reportPostSpam = () => {
		this.setState({ selectedReportType: 'spam' })
	}
	reportPostAbusive = () => {
		this.setState({ selectedReportType: 'abusive' })
	}
	reportPostObjectionable = () => {
		this.setState({ selectedReportType: 'objectionable' })
	}
	reportPostSexual = () => {
		this.setState({ selectedReportType: 'sexual' })
	}

	deletePost = () => {
		this.setState({ deletePostActive: true })
		this.modalRef?.close()
	}

	hideDeletePost = () => {
		this.setState({ deletePostActive: false })
	}

	hideReportPostDialog = () => {
		this.setState({ reportDialog: false })
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
					screen.error(screen.language.no_post_error)
				} else if (response.error === 'no_auth') {
					screen.error(screen.language.post_auth_error)
				} else {
					screen.unknown_error(response.error)
				}
			}
		} else {
			screen.unknown_error()
		}
	}

	_reportPost = async () => {
		this.setState({ reportPostLoading: true })
		let screen = this.props.navigation.getScreenProps()

		let response = await Api.doAction({
			token: screen.user.token,
			type: 'report',
			post: this.state.activePost.id,
			report_type: this.state.selectedReportType,
		})

		this.reportModalRef?.close()
		if (response) {
			if (response.status) {
				this.setState({ reportPostLoading: false, reportDialog: response.report_type })
			} else {
				if (response.error === 'no_login') {
					screen.logout(true)
				} else if (response.error === 'no_post') {
					screen.error(screen.language.no_post_error)
				} else if (response.error === 'already_reported') {
					screen.error(screen.language.already_reported)
				} else {
					screen.unknown_error(response.error)
				}
				this.setState({ reportPostLoading: false })
			}
		} else {
			screen.unknown_error()
			this.setState({ reportPostLoading: false })
		}
	}

	_hidePost = async () => {
		this.setState({ hidePostLoading: true })
		let screen = this.props.navigation.getScreenProps()

		let response = await Api.doAction({
			token: screen.user.token,
			type: 'hide_post',
			post: this.state.activePost.id,
		})

		if (response) {
			if (response.status) {
				this.setState({ hidePostLoading: false, reportDialog: false })
			} else {
				if (response.error === 'no_login') {
					screen.logout(true)
				} else if (response.error === 'no_post') {
					screen.error(screen.language.no_post_error)
				} else if (response.error === 'not_reported') {
					screen.error(screen.language.not_reported)
				} else if (response.error === 'already_hidden') {
					screen.error(screen.language.already_hidden)
				} else {
					screen.unknown_error(response.error)
				}
			}
		} else {
			screen.unknown_error()
		}
	}

	render() {
		let screen = this.props.navigation.getScreenProps()
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
					ListFooterComponent={this.props.ListFooterComponent}
					style={this.props.style}
					contentContainerStyle={this.props.contentContainerStyle}
				/>

				<Modalize ref={this._setModalizeRef} adjustToContentHeight modalStyle={{ backgroundColor: this.props.theme.colors.surface }}>
					<List.Section>
						<List.Item
							title={screen.language.share}
							onPress={this.sharePost}
							left={(props) => <List.Icon {...props} style={{}} icon='share-2' />}
						/>
						{!this.state.activePost?.isMine ? (
							<List.Item
								title={screen.language.report}
								onPress={this.reportPost}
								left={(props) => <List.Icon {...props} style={{}} icon='alert-circle' />}
							/>
						) : (
							<></>
						)}
						{this.state.activePost?.isMine ? (
							<List.Item
								title={screen.language.delete}
								onPress={this.deletePost}
								left={(props) => <List.Icon {...props} style={{}} icon='trash-2' />}
							/>
						) : (
							<></>
						)}
					</List.Section>
				</Modalize>

				<Modalize ref={this._setReportModalizeRef} adjustToContentHeight modalStyle={{ backgroundColor: this.props.theme.colors.surface }}>
					<Paragraph style={{ paddingHorizontal: 20, paddingVertical: 10, fontFamily: Config.fonts.semi }}>
						{screen.language.report_dialog}
					</Paragraph>
					<Divider />

					<List.Section>
						<List.Item
							title={screen.language.spam}
							onPress={this.reportPostSpam}
							left={(props) => (
								<RadioButton
									{...props}
									value={'spam'}
									status={this.state.selectedReportType === 'spam' ? 'checked' : 'unchecked'}
									onPress={this.reportPostSpam}
									color={this.props.theme.colors.main}
								/>
							)}
						/>
						<List.Item
							title={screen.language.abusive}
							onPress={this.reportPostAbusive}
							left={(props) => (
								<RadioButton
									{...props}
									value={'abusive'}
									status={this.state.selectedReportType === 'abusive' ? 'checked' : 'unchecked'}
									onPress={this.reportPostAbusive}
									color={this.props.theme.colors.main}
								/>
							)}
						/>
						<List.Item
							title={screen.language.objectionable}
							onPress={this.reportPostObjectionable}
							left={(props) => (
								<RadioButton
									{...props}
									value={'objectionable'}
									status={this.state.selectedReportType === 'objectionable' ? 'checked' : 'unchecked'}
									onPress={this.reportPostObjectionable}
									color={this.props.theme.colors.main}
								/>
							)}
						/>
						<List.Item
							title={screen.language.sexual}
							onPress={this.reportPostSexual}
							left={(props) => (
								<RadioButton
									{...props}
									value={'sexual'}
									status={this.state.selectedReportType === 'sexual' ? 'checked' : 'unchecked'}
									onPress={this.reportPostSexual}
									color={this.props.theme.colors.main}
								/>
							)}
						/>
					</List.Section>

					<CustomButton label={screen.language.report} onPress={this._reportPost} loading={this.state.reportPostLoading} />
				</Modalize>

				<Dialog visible={!!this.state.reportDialog} onDismiss={this.hideReportPostDialog}>
					<Dialog.Title>{screen.language.success}</Dialog.Title>
					<Dialog.Content>
						<Paragraph>
							{screen.language.report_success} {screen.language[this.state.reportDialog || 'spam']}
							{'\n'}
							{screen.language.report_success_hide}
						</Paragraph>
					</Dialog.Content>
					<Dialog.Actions>
						<Button
							onPress={this.state.hidePostLoading ? undefined : this._hidePost}
							color={this.props.theme.colors.main}
							loading={this.state.hidePostLoading}
							style={{ marginRight: 15 }}
						>
							{screen.language.hide}
						</Button>
						<Button onPress={this.hideReportPostDialog} color={this.props.theme.colors.contrast}>
							{screen.language.cancel}
						</Button>
					</Dialog.Actions>
				</Dialog>

				<Dialog visible={this.state.deletePostActive} onDismiss={this.hideDeletePost}>
					<Dialog.Title>{screen.language.delete_post}</Dialog.Title>
					<Dialog.Content>
						<Paragraph>{screen.language.delete_dialog}</Paragraph>
					</Dialog.Content>
					<Dialog.Actions>
						<Button
							onPress={this.state.deletePostLoading ? undefined : this._deletePost}
							color={this.props.theme.colors.main}
							loading={this.state.deletePostLoading}
							style={{ marginRight: 15 }}
						>
							{screen.language.delete}
						</Button>
						<Button onPress={this.hideDeletePost} color={this.props.theme.colors.contrast}>
							{screen.language.cancel}
						</Button>
					</Dialog.Actions>
				</Dialog>
			</>
		)
	}
}

export default withTheme(Posts)
