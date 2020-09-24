import React from 'react'
import { View, Dimensions } from 'react-native'
import { withTheme, ActivityIndicator } from 'react-native-paper'
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
		type: 'explore' | 'follows' | 'tags' | 'memelord'
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
	private postsRef: any = null

	async componentDidMount() {
		this.init()
	}

	init = async (refresh?: boolean, nextPage?: boolean) => {
		let screen = this.props.navigation.getScreenProps()
		if (!refresh && !this.state.loading) {
			this.setState({ loading: true })
		}
		let tag = this.props.navigation.getParam('tag')
		let posts = await Api.getExplore({
			token: screen.user.token,
			last: nextPage ? this.state.posts[this.state.posts.length - 1].time : 0,
			points: nextPage && this.pageType === 'memelord' ? this.state.posts[this.state.posts.length - 1].points : 0,
			type: this.pageType,
			...(tag ? { tag: tag.id } : {}),
		})

		let stateObject = {}

		if (posts) {
			if (posts.status) {
				stateObject = { posts: nextPage ? [...this.state.posts, ...posts.posts] : posts.posts, currentTime: posts.currentTime }
				screen.setCurrentTime(posts.currentTime)
			} else {
				if (posts.error === 'no_login') {
					screen.logout(true)
				} else if (posts.error === 'too_fast_action') {
					screen.error(screen.language.too_fast_action)
				} else {
					screen.unknown_error(posts.error)
				}
			}
		} else {
			return screen.unknown_error()
		}

		stateObject = { ...stateObject, loading: false }

		this.setState(stateObject, () => {
			if (nextPage) this.newPageActive = false
		})
	}

	refresh = () => {
		return this.init(true)
	}

	getNextPage = () => {
		if (this.newPageActive) return
		this.newPageActive = true
		return this.init(true, true)
	}

	_footerComponent = () => (
		<View style={styles.bottomLoader}>
			<ActivityIndicator size={24} color={this.props.theme.colors.main} />
		</View>
	)

	setPostsRef = (ref: any) => {
		this.postsRef = ref
	}

	onLogoPress = () => {
		if (this.postsRef) {
			this.postsRef.scrollToOffset({
				animated: true,
				offset: 0,
			})
		}
	}

	render() {
		let screen = this.props.navigation.getScreenProps()
		return (
			<View style={[styles.container, { backgroundColor: this.props.theme.colors.background }]}>
				{this.pageType === 'tags' ? (
					<Header title={'Tag: #' + (this.props.navigation.getParam('tag')?.name || screen.language.unknown)} />
				) : (
					<MainHeader onLogoPress={this.onLogoPress} />
				)}

				{this.state.loading ? (
					<Loader theme={this.props.theme} />
				) : (
					<>
						<Posts
							flatlistRef={this.setPostsRef}
							navigation={this.props.navigation}
							refresh={this.refresh}
							getNextPage={this.getNextPage}
							posts={this.state.posts}
							currentTime={this.state.currentTime}
							ListFooterComponent={this._footerComponent}
						/>
					</>
				)}
			</View>
		)
	}
}

export default withTheme(Explore)
