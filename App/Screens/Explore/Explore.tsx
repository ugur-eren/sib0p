import React from 'react'
import { View } from 'react-native'
import { Text, withTheme } from 'react-native-paper'
import Posts from '../../Contents/Posts/Posts'
import Types from '../../Includes/Types/Types'
import PostTypes from '../../Includes/Types/PostTypes'
import styles from './styles'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Api from '../../Includes/Api'

interface Props {
	navigation: Types.Navigation
	theme: Types.Theme
}

interface State {
	posts: PostTypes.Post[]
}

class Explore extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			posts: [],
		}
	}

	private _flatListRef: any = null

	async componentDidMount() {
		let posts = await Api.getExplore({})
		if (posts && posts.status){
			this.setState({posts: posts.posts})
		} else {
		}
	}

	_setFlatListRef = (ref: any) => (this._flatListRef = ref)

	render() {
		if (this.props.navigation.getParam('scrollToTop')) {
			this.props.navigation.setParams({ scrollToTop: false })
			if (this._flatListRef) {
				this._flatListRef.scrollToOffset({ animated: true, offset: 0 })
			}
		}
		return (
			<View style={[styles.container, { backgroundColor: this.props.theme.colors.background }]}>
				<Posts _flatListRef={this._setFlatListRef} navigation={this.props.navigation} posts={this.state.posts} />
			</View>
		)
	}
}

export default withTheme(Explore)
