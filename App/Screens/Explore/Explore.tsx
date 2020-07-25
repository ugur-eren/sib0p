import React from 'react'
import { View } from 'react-native'
import { Text, withTheme } from 'react-native-paper'
import Posts from '../../Contents/Posts/Posts'
import Types from '../../Includes/Types/Types'
import PostTypes from '../../Includes/Types/PostTypes'
import styles from './styles'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface Props {
	navigation: Types.Navigation
	theme: Types.Theme
}

interface State {}

class Explore extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {}

		this.content = [
			{
				id: '1',
				user: {
					username: 'edavcis',
					profilePhoto: 'https://sib0p.com/inc/imgs/pps/1593635668-1461.jpg',
				},
				time: '5 Dakika önce',
				description: 'canım sıkılınca internette buldugum kızlara şop yapıyorum',
				postData: [
					{
						uri: 'https://sib0p.com/inc/imgs/posts/1593982993-1461-94-1.jpg',
						type: 'image',
						ratio: 1,
					},
					{
						uri: 'https://sib0p.com/inc/imgs/posts/1593982053-1486-57-0.jpg',
						type: 'image',
						ratio: 0.888888888888889,
					},
				],
				likesCount: 3,
				dislikesCount: 0,
				hasLiked: true,
				hasDisliked: false,
				commentsCount: 3,
				comments: [
					{
						id: '1',
						user: {
							username: 'edavcis',
							profilePhoto: 'https://sib0p.com/inc/imgs/pps/1593635668-1461.jpg',
						},
						time: '3 Dakika önce',
						content: 'instası; m.aesy',
						likesCount: 1,
						dislikesCount: 0,
						hasLiked: true,
						hasDisliked: false,
					},
					{
						id: '2',
						user: {
							username: 'aids',
							profilePhoto: 'https://sib0p.com/inc/imgs/pps/1590216343-1130.jpg',
						},
						time: '3 Dakika önce',
						content: 'kralım eski hali daha güzelmiş',
						likesCount: 2,
						dislikesCount: 0,
						hasLiked: true,
						hasDisliked: false,
					},
					{
						id: '3',
						user: {
							username: 'edavcis',
							profilePhoto: 'https://sib0p.com/inc/imgs/pps/1593635668-1461.jpg',
						},
						time: '2 Dakika önce',
						content: '@aids dogru :D',
						likesCount: 1,
						dislikesCount: 0,
						hasLiked: false,
						hasDisliked: false,
					},
				],
			},
			{
				id: '2',
				user: {
					username: 'beratakin',
					profilePhoto: 'https://sib0p.com/inc/imgs/pps/1593974314-1486.jpg',
				},
				time: '20 Dakika önce',
				description: '',
				postData: [
					{
						uri: 'https://sib0p.com/inc/imgs/posts/1593982053-1486-57-0.jpg',
						type: 'image',
						ratio: 0.888888888888889,
					}
				],
				likesCount: 5,
				dislikesCount: 0,
				hasLiked: true,
				hasDisliked: false,
				commentsCount: 0,
				comments: [],
			},
		]
	}

	private content: PostTypes.Post[]
	private _flatListRef: any = null

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
				<Posts _flatListRef={this._setFlatListRef} navigation={this.props.navigation} posts={this.content} />
			</View>
		)
	}
}

export default withTheme(Explore)
