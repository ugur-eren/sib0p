import React from 'react'
import { View } from 'react-native'
import { withTheme } from 'react-native-paper'
import MainHeader from '../../Components/MainHeader/MainHeader'
import Posts from '../../Contents/Posts/Posts'
import Types from '../../Includes/Types/Types'
import PostTypes from '../../Includes/Types/PostTypes'
import Api from '../../Includes/Api'
import styles from './styles'
import Loader from './Loader'
import Header from '../../Components/Header/Header'

interface Props {
	navigation: Types.Navigation<{
		type: 'explore' | 'follows' | 'tags'
		tag?: PostTypes.Tag
	}>
	theme: Types.Theme
}

interface State {
	loading: boolean
	posts: PostTypes.Post[]
	currentTime: number
}

class Explore extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			loading: true,
			posts: [],
			currentTime: 0,
		}
	}

	private newPageActive: boolean = false
	private pageType = this.props.navigation.getParam('type')

	async componentDidMount() {
		this.init()
	}

	init = async (refresh?: boolean, nextPage?: boolean) => {
		if (!refresh && !this.state.loading) {
			this.setState({ loading: true })
		}
		let tag = this.props.navigation.getParam('tag')
		let posts = await Api.getExplore({
			token: this.props.navigation.getScreenProps().user.token,
			last: nextPage ? this.state.posts[this.state.posts.length - 1].time : 0,
			type: this.pageType,
			...(tag ? { tag: tag.id } : {}),
		})

		let stateObject = {}

		if (posts) {
			if (posts.status) {
				stateObject = { posts: nextPage ? [...this.state.posts, ...posts.posts] : posts.posts, currentTime: posts.currentTime }
				this.props.navigation.getScreenProps().setCurrentTime(posts.currentTime)
			} else {
				if (posts.error === 'no_login') {
					this.props.navigation.getScreenProps().logout(true)
				} else {
					this.props.navigation.getScreenProps().unknown_error(posts.error)
				}
			}
		} else {
			return this.props.navigation.getScreenProps().unknown_error()
		}

		stateObject = { ...stateObject, loading: false }

		this.setState(stateObject)
	}

	refresh = () => {
		return this.init(true)
	}

	getNextPage = () => {
		return this.init(true, true)
	}

	render() {
		return (
			<View style={[styles.container, { backgroundColor: this.props.theme.colors.background }]}>
				{this.state.loading ? (
					<Loader theme={this.props.theme} />
				) : (
					<>
						{this.pageType === 'tags' ? (
							<Header title={'Tag: #' + (this.props.navigation.getParam('tag')?.name || 'Bilinmiyor')} />
						) : (
							<MainHeader />
						)}
						<Posts
							navigation={this.props.navigation}
							refresh={this.refresh}
							getNextPage={this.getNextPage}
							posts={this.state.posts}
							currentTime={this.state.currentTime}
						/>
					</>
				)}
			</View>
		)
	}
}

export default withTheme(Explore)
