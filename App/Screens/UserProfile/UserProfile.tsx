import React from 'react'
import { View } from 'react-native'
import { Text, withTheme, Divider } from 'react-native-paper'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import FastImage from 'react-native-fast-image'
import TextButton from '../../Components/TextButton/TextButton'
import TransparentHeader from '../../Components/TransparentHeader/TransparentHeader'
import Post from '../../Contents/Post/Post'
import Config from '../../Includes/Config'
import Types from '../../Includes/Types/Types'
import UserTypes from '../../Includes/Types/UserTypes'
import styles from './styles'
import PostTypes from '../../Includes/Types/PostTypes'

interface Props {
	navigation: Types.Navigation
	theme: Types.Theme
}

interface State {}

class UserProfile extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {}

		this.user = {
			username: 'berat',
			fullName: 'Berat Kaya',
			bio: '',
			profilePhoto: 'https://sib0p.com/inc/imgs/pps/1589744671-940.jpg',
			backgroundPhoto: 'https://sib0p.com/inc/imgs/bgs/1589744715-940.jpg',
			postsCount: 79,
			followsCount: 107,
			followersCount: 81,
			posts: [
				{
					id: '1',
					user: {
						username: 'berat',
						profilePhoto: 'https://sib0p.com/inc/imgs/pps/1589744671-940.jpg',
					},
					time: '2 Gün önce',
					description: '#badass',
					postData: [
						{
							uri: 'https://sib0p.com/inc/imgs/posts/1594550236-940-65-0.jpg',
							type: 'image',
							ratio: 0.837037037037037,
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
						profilePhoto: 'https://sib0p.com/inc/imgs/pps/1589744671-940.jpg',
					},
					time: '20 Dakika önce',
					description: '',
					postData: [
						{
							uri: 'https://sib0p.com/inc/imgs/posts/1593982053-1486-57-0.jpg',
							type: 'image',
							ratio: 0.888888888888889,
						},
					],
					likesCount: 5,
					dislikesCount: 0,
					hasLiked: true,
					hasDisliked: false,
					commentsCount: 0,
					comments: [],
				},
			],
		}
	}

	private user: UserTypes.Profile

	handleFollosPress = () => {
		this.props.navigation.navigate('FollowsList', {
			follows: [
				{
					username: 'demirbas',
					profilePhoto: 'https://sib0p.com/inc/imgs/pps/1590017493-1057.jpg',
					fullName: 'Ömer Demirbaş',
					isFollowed: false,
				},
				{
					username: 'TrueTiem',
					profilePhoto: 'https://sib0p.com/inc/imgs/pps/1590195009-1048.jpg',
					fullName: 'Uğur Eren',
					isFollowed: false,
				},
				{
					username: 'berat',
					profilePhoto: 'https://sib0p.com/inc/imgs/pps/1589744671-940.jpg',
					fullName: 'berat kaya',
					isFollowed: true,
				},
			] as UserTypes.Follows[],
			type: 'follows',
		})
	}

	handleFollowersPress = () => {
		this.props.navigation.navigate('FollowsList', {
			follows: [
				{
					username: 'demirbas',
					profilePhoto: 'https://sib0p.com/inc/imgs/pps/1590017493-1057.jpg',
					fullName: 'Ömer Demirbaş',
					isFollowed: false,
				},
				{
					username: 'TrueTiem',
					profilePhoto: 'https://sib0p.com/inc/imgs/pps/1590195009-1048.jpg',
					fullName: 'Uğur Eren',
					isFollowed: false,
				},
				{
					username: 'berat',
					profilePhoto: 'https://sib0p.com/inc/imgs/pps/1589744671-940.jpg',
					fullName: 'berat kaya',
					isFollowed: true,
				},
			] as UserTypes.Follows[],
			type: 'followers',
		})
	}

	onSettingsPress = () => {
		this.props.navigation.navigate('Settings')
	}

	_renderPost = ({ item, index }: { item: PostTypes.Post; index: number }) => (
		<View key={item.id}>
			<Post navigation={this.props.navigation} post={item} noUserTouchable />
			{index !== this.user.posts.length - 1 ? <View style={styles.postsDivider}></View> : <></>}
		</View>
	)

	_renderHeader = () => {
		let { theme, navigation } = this.props
		let myself = navigation.getScreenProps().user
		let isMyself = myself.username === this.user.username

		return (
			<>
				<View style={styles.backgroundContainer}>
					<FastImage source={{ uri: this.user.backgroundPhoto }} resizeMode='cover' style={styles.backgroundImage} />
					<TransparentHeader title={this.user.username} onSettings={isMyself ? this.onSettingsPress : undefined} />
				</View>
				<View style={[styles.topInfoContainer, { backgroundColor: theme.colors.surface }]}>
					<FastImage source={{ uri: this.user.profilePhoto }} style={[styles.profilePhoto, { borderColor: this.props.theme.colors.main }]} />

					<View style={styles.userInfo}>
						<Text style={styles.username}>{this.user.username}</Text>
						<Text>{this.user.fullName}</Text>
					</View>

					<TextButton label={isMyself ? 'Profili Düzenle' : 'Takip Et'} onPress={() => {}} />
				</View>

				{this.user.bio ? (
					<View style={[styles.bio, { backgroundColor: theme.colors.surface }]}>
						<Text>{this.user.bio}</Text>
					</View>
				) : (
					<></>
				)}

				<View style={[styles.centerContainer, { backgroundColor: theme.colors.surface }]}>
					<View style={styles.postsCount}>
						<Text>Postlar</Text>
						<Text style={styles.centerText}>{this.user.postsCount}</Text>
					</View>

					<Divider style={styles.centerDivider} />

					<TouchableOpacity onPress={this.handleFollosPress} style={styles.centerTouchable} containerStyle={styles.centerTouchableContainer}>
						<Text>Takip</Text>
						<Text style={styles.centerText}>{this.user.followsCount}</Text>
					</TouchableOpacity>

					<Divider style={styles.centerDivider} />

					<TouchableOpacity onPress={this.handleFollowersPress} style={styles.centerTouchable} containerStyle={styles.centerTouchableContainer}>
						<Text>Takipçi</Text>
						<Text style={styles.centerText}>{this.user.followersCount}</Text>
					</TouchableOpacity>
				</View>
			</>
		)
	}

	render() {
		let { theme } = this.props

		return (
			<View style={[styles.container, { backgroundColor: theme.colors.background }]}>
				<FlatList
					style={styles.scrollView}
					contentContainerStyle={styles.scrollViewContainer}
					data={this.user.posts}
					renderItem={this._renderPost}
					ListHeaderComponent={this._renderHeader}
				/>
			</View>
		)
	}
}

export default withTheme(UserProfile)
