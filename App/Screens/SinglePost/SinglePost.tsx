import React from 'react'
import { Dimensions } from 'react-native'
import { withTheme, Divider } from 'react-native-paper'
import Post from '../../Contents/Post/Post'
import Types from '../../Includes/Types/Types'
import PostTypes from '../../Includes/Types/PostTypes'
import Api from '../../Includes/Api'
import Comments from '../Comments/Comments'
import Header from '../../Components/Header/Header'
import Loader from './Loader'
import EmptyList from '../../Components/EmptyList/EmptyList'

interface Props {
	navigation: Types.Navigation<{
		post: number
	}>
	theme: Types.Theme
}

interface State {
	loading: boolean
	refreshing: boolean
	post: PostTypes.Post
	currentTime: number
}

class SinglePost extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			loading: true,
			refreshing: false,
			post: null,
			currentTime: 0,
		}
	}

	private PostRef: { setVisible: (visible: boolean) => void; key: number } = null
	private _viewabilityConfig = {
		viewAreaCoveragePercentThreshold: 60,
	}
	private width = Dimensions.get('window').width

	componentDidMount() {
		this.init()
	}

	init = async () => {
		let screen = this.props.navigation.getScreenProps()
		let post = await Api.getExplore({
			token: screen.user.token,
			type: 'single',
			post: this.props.navigation.getParam('post'),
		})
		let stateObject = {}

		if (post) {
			if (post.status) {
				stateObject = {
					post: post.posts.length > 0 ? post.posts[0] : null,
					currentTime: post.currentTime,
				}
				screen.setCurrentTime(post.currentTime)
			} else {
				if (post.error === 'no_login') {
					screen.logout(true)
				} else if (post.error === 'too_fast_action') {
					screen.error(screen.language.too_fast_action)
				} else {
					screen.unknown_error(post.error)
				}
			}
		} else {
			screen.unknown_error()
		}

		stateObject = { ...stateObject, loading: false }

		this.setState(stateObject)
	}

	_setVisibleRef = (ref: any) => {
		this.PostRef = ref
	}

	_viewableItemsChanged = ({ viewableItems }: { viewableItems: Array<{ index: number; isViewable: boolean; item: PostTypes.Post; key: any }> }) => {
		if (viewableItems.length > 0) {
			this.PostRef.setVisible(false)
		} else {
			this.PostRef.setVisible(true)
		}
	}

	_onLayout = () => {
		this.PostRef.setVisible(true)
	}

	render() {
		return (
			<>
				<Header title={this.state.post?.user?.username ? this.state.post.user.username + "'s Post" : 'Post'} />

				{this.state.loading ? (
					<Loader theme={this.props.theme} />
				) : !this.state.post ? (
					<EmptyList image={require('../../Assets/Images/no-posts.png')} title={this.props.navigation.getScreenProps().language.no_posts} />
				) : (
					<Comments
						navigation={this.props.navigation}
						viewabilityConfig={this._viewabilityConfig}
						onViewableItemsChanged={this._viewableItemsChanged}
						onLayout={this._onLayout}
						ListHeaderComponent={() => (
							<>
								<Post
									width={this.width}
									post={this.state.post}
									currentTime={this.state.currentTime}
									setVisibleRef={this._setVisibleRef}
									navigation={this.props.navigation}
									commentsVisible
								/>
								<Divider />
							</>
						)}
						customPost={this.props.navigation.getParam('post')}
					/>
				)}
			</>
		)
	}
}

export default withTheme(SinglePost)
