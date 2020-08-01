import React from 'react'
import { View, FlatList, RefreshControl, StyleProp, ViewStyle } from 'react-native'
import { withTheme } from 'react-native-paper'
import Post from '../Post/Post'
import Types from '../../Includes/Types/Types'
import PostTypes from '../../Includes/Types/PostTypes'
import styles from './styles'

interface Props {
	navigation: Types.Navigation
	theme: Types.Theme
	posts: PostTypes.Post[]
	currentTime: number
	_flatListRef: any
	refresh: () => Promise<any>
	getNextPage: () => Promise<any>
	noUserTouchable?: boolean
	ListHeaderComponent?: () => JSX.Element
	style?: StyleProp<ViewStyle>
	contentContainerStyle?: StyleProp<ViewStyle>
}

interface State {
	visibleItem: string
	refreshing: boolean
	focused: boolean
}

class Posts extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			visibleItem: '',
			refreshing: false,
			focused: true,
		}
	}

	private _viewabilityConfig = {
		viewAreaCoveragePercentThreshold: 60,
	}

	private focusListener: any = null
	private blurListener: any = null

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
		return (
			<Post
				key={item.id}
				post={item}
				navigation={this.props.navigation}
				isVisible={this.state.focused && this.state.visibleItem === item.id.toString()}
				currentTime={this.props.currentTime}
				noUserTouchable={this.props.noUserTouchable}
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

	render() {
		return (
			<FlatList
				ref={this.props._flatListRef}
				data={this.props.posts}
				keyExtractor={this._keyExtractor}
				ItemSeparatorComponent={this._itemSeperatorComponent}
				renderItem={this._renderItem}
				extraData={this.state.visibleItem}
				onViewableItemsChanged={this._viewableItemsChanged}
				viewabilityConfig={this._viewabilityConfig}
				removeClippedSubviews={false}
				refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.refresh} />}
				onEndReached={this.props.getNextPage}
				ListHeaderComponent={this.props.ListHeaderComponent}
				style={this.props.style}
				contentContainerStyle={this.props.contentContainerStyle}
			/>
		)
	}
}

export default withTheme(Posts)
