import React from 'react'
import { withTheme } from 'react-native-paper'
import Post from '../../Contents/Post/Post'
import Types from '../../Includes/Types/Types'
import { ScrollView } from 'react-native-gesture-handler'
import PostTypes from '../../Includes/Types/PostTypes'
import { RefreshControl } from 'react-native'

interface Props {
	navigation: Types.Navigation
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

	refresh = () => {}

	openModal = () => {}

	render() {
		return (
			<ScrollView refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.refresh} />}>
				{this.state.loading ? (
					<></>
				) : (
					<Post
						post={this.state.post}
						currentTime={this.state.currentTime}
						isVisible={true}
						navigation={this.props.navigation}
						openModal={this.openModal}
						commentsVisible
					/>
				)}
			</ScrollView>
		)
	}
}

export default withTheme(SinglePost)
