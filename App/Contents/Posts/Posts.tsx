import React from 'react'
import { View, FlatList, RefreshControl } from 'react-native'
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
}

interface State {
	visibleItem: string
	refreshing: boolean
}

class Posts extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			visibleItem: "",
			refreshing: false
		}
	}
	
	private _viewabilityConfig = {
		viewAreaCoveragePercentThreshold: 60,
	}

	_renderItem = ({ item }: {item: PostTypes.Post}) => {
	return <Post key={item.id} post={item} navigation={this.props.navigation} isVisible={this.state.visibleItem === item.id.toString()} currentTime={this.props.currentTime} />
	}

	_itemSeperatorComponent = () => <View style={styles.itemSeperator}></View>

	_keyExtractor = (item: PostTypes.Post) => item.id

	_viewableItemsChanged = ({ viewableItems }: {viewableItems: Array<{index: number, isViewable: boolean, item: PostTypes.Post, key: any}>}) => {
		if (viewableItems.length > 0){
			this.setState({visibleItem: viewableItems[0].key})
		} else {
			this.setState({visibleItem: ""})
		}
	}

	refresh = async () => {
		this.setState({refreshing: true}, async () => {
			let refresh = await this.props.refresh()
			this.setState({refreshing: false})
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
			/>
		)
	}
}

export default withTheme(Posts)
