import React from 'react'
import { View, FlatList } from 'react-native'
import { withTheme } from 'react-native-paper'
import Post from '../Post/Post'
import Types from '../../Includes/Types/Types'
import PostTypes from '../../Includes/Types/PostTypes'
import styles from './styles'

interface Props {
	navigation: Types.Navigation
	theme: Types.Theme
	posts: PostTypes.Post[]
	_flatListRef: any
}

interface State {
	visibleItem: string
}

class Posts extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			visibleItem: ""
		}
	}
	
	private _viewabilityConfig = {
		viewAreaCoveragePercentThreshold: 60,
	}

	_renderItem = ({ item }: {item: PostTypes.Post}) => {
	return <Post key={item.id} post={item} navigation={this.props.navigation} isVisible={this.state.visibleItem === item.id.toString()} />
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
			/>
		)
	}
}

export default withTheme(Posts)
