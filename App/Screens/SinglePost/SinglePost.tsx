import React from 'react'
import { View, RefreshControl } from 'react-native'
import { withTheme, ActivityIndicator, Divider } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler'
import Post from '../../Contents/Post/Post'
import Types from '../../Includes/Types/Types'
import PostTypes from '../../Includes/Types/PostTypes'
import Api from '../../Includes/Api'
import Comments from '../Comments/Comments'
import Header from '../../Components/Header/Header'
import Loader from './Loader'

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

	componentDidMount() {
		this.init()
	}

	init = async () => {
		let post = await Api.getExplore({
			token: this.props.navigation.getScreenProps().user.token,
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
				this.props.navigation.getScreenProps().setCurrentTime(post.currentTime)
			} else {
				if (post.error === 'no_login') {
					this.props.navigation.getScreenProps().logout(true)
				} else {
					this.props.navigation.getScreenProps().unknown_error(post.error)
				}
			}
		} else {
			this.props.navigation.getScreenProps().unknown_error()
		}

		stateObject = { ...stateObject, loading: false }

		this.setState(stateObject)
	}

	render() {
		return (
			<>
				<Header title={this.state.post?.user?.username ? this.state.post.user.username + "'s Post" : 'Post'} />

				{this.state.loading ? (
					<Loader theme={this.props.theme} />
				) : (
					<Comments
						navigation={this.props.navigation}
						customHeader={() => (
							<>
								<Post
									post={this.state.post}
									currentTime={this.state.currentTime}
									isVisible={true}
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
