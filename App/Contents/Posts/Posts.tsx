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

interface State {}

class Posts extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {}
	}

	_renderItem = ({ item }) => <Post key={item.id} post={item} navigation={this.props.navigation} />

	_itemSeperatorComponent = () => <View style={styles.itemSeperator}></View>

	_keyExtractor = (item: PostTypes.Post) => item.id

	render() {
		return <FlatList ref={this.props._flatListRef} data={this.props.posts} keyExtractor={this._keyExtractor} ItemSeparatorComponent={this._itemSeperatorComponent} renderItem={this._renderItem} />
	}
}

export default withTheme(Posts)
