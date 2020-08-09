import React from 'react'
import { View } from 'react-native'
import { Text, Divider, withTheme } from 'react-native-paper'
import TopProfile from '../../Contents/TopProfile/TopProfile'
import LikeButton from '../../Components/LikeButton/LikeButton'
import Types from '../../Includes/Types/Types'
import CommentTypes from '../../Includes/Types/CommentTypes'
import UserTypes from '../../Includes/Types/UserTypes'
import Header from '../../Components/Header/Header'
import { FlatList } from 'react-native-gesture-handler'
import Relation from './Relation'
import { RelationsStyle as styles } from './styles'

interface Props {
	navigation: Types.Navigation<{
		follows: UserTypes.Follows[]
		type: 'follows' | 'followers'
	}>
	theme: Types.Theme
}

interface State {}

class Relations extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {}
	}

	private follows = this.props.navigation.getParam('follows')
	private type = this.props.navigation.getParam('type')

	_renderItem = ({ item }) => <Relation navigation={this.props.navigation} user={item} />
	_itemSeperator = () => <Divider />
	_keyExtractor = (item: UserTypes.Follows) => item.username

	render() {
		let { navigation } = this.props
		return (
			<View style={[styles.container, { backgroundColor: this.props.theme.colors.background }]}>
				<Header title={this.type == 'follows' ? 'Takipler' : 'Takipçiler'} />

				<View style={styles.listContainer}>
					<FlatList data={this.follows} keyExtractor={this._keyExtractor} ItemSeparatorComponent={this._itemSeperator} renderItem={this._renderItem} />
				</View>
			</View>
		)
	}
}

export default withTheme(Relations)
