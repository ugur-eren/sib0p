import React from 'react'
import { View } from 'react-native'
import { withTheme } from 'react-native-paper'
import MainHeader from '../../Components/MainHeader/MainHeader'
import Posts from '../../Contents/Posts/Posts'
import Types from '../../Includes/Types/Types'
import PostTypes from '../../Includes/Types/PostTypes'
import Api from '../../Includes/Api'
import styles from './styles'

interface Props {
	navigation: Types.Navigation
	theme: Types.Theme
}

interface State {
	posts: PostTypes.Post[]
	currentTime: number
}

class Explore extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			posts: [],
			currentTime: 0,
		}
	}

	private _flatListRef: any = null
	private newPageActive: boolean = false

	async componentDidMount() {
		let posts = await Api.getExplore({ last: 0 })
		if (posts && posts.status) {
			this.setState({ posts: posts.posts, currentTime: posts.currentTime })
		} else {
		}
	}

	refresh = async () => {
		let posts = await Api.getExplore({ last: 0 })
		if (posts && posts.status) {
			this.setState({ posts: posts.posts, currentTime: posts.currentTime })
		} else {
		}
	}

	getNextPage = async () => {
		if (!this.newPageActive) {
			this.newPageActive = true

			let posts = await Api.getExplore({ last: this.state.posts[this.state.posts.length - 1].time })
			if (posts && posts.status) {
				this.setState({ posts: [...this.state.posts, ...posts.posts], currentTime: posts.currentTime })
			} else {
			}

			this.newPageActive = false
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
				<MainHeader />
				<Posts
					_flatListRef={this._setFlatListRef}
					navigation={this.props.navigation}
					refresh={this.refresh}
					getNextPage={this.getNextPage}
					posts={this.state.posts}
					currentTime={this.state.currentTime}
				/>
			</View>
		)
	}
}

export default withTheme(Explore)
