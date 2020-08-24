import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { Text, Divider, useTheme } from 'react-native-paper'
import TopProfile from '../../Contents/TopProfile/TopProfile'
import LikeButton from '../../Components/LikeButton/LikeButton'
import Types from '../../Includes/Types/Types'
import CommentTypes from '../../Includes/Types/CommentTypes'
import UserTypes from '../../Includes/Types/UserTypes'
import Header from '../../Components/Header/Header'
import { FlatList } from 'react-native-gesture-handler'
import Relation from './Relation'
import { RelationsStyle as styles } from './styles'
import Api from '../../Includes/Api'
import EmptyList from '../../Components/EmptyList/EmptyList'
import Loader from './Loader'

interface Props {
	navigation: Types.Navigation<{
		type: 'follows' | 'followers'
		username: string
	}>
}

const Relations = (props: Props) => {
	const theme: Types.Theme = useTheme() as any
	const [state, setState] = useState<{
		loading: boolean
		refreshing: boolean
		noUser: boolean
		relations: Array<UserTypes.Relations>
	}>({
		loading: true,
		refreshing: false,
		noUser: false,
		relations: [],
	})

	const username = props.navigation.getParam('username')
	const type = props.navigation.getParam('type')

	useEffect(() => {
		let screen = props.navigation.getScreenProps()
		;(async () => {
			let relations = await Api.getRelations({ token: screen.user.token, type: type, username: username })
			if (relations) {
				if (relations.status) {
					setState({
						loading: false,
						noUser: false,
						refreshing: false,
						relations: relations.relations,
					})
				} else {
					if (relations.error === 'no_user' || relations.error == 'wrong_username') {
						setState({
							loading: false,
							noUser: true,
							refreshing: false,
							relations: [],
						})
					} else if (relations.error === 'no_login') {
						screen.logout(true)
					} else if (relations.error === 'too_fast_action') {
						screen.error(screen.language.too_fast_action)
					} else {
						screen.unknown_error(relations.error)
					}
				}
			} else {
				screen.unknown_error()
			}
		})()
	}, [])

	const onFollow = async () => {

	}

	const _renderItem = ({ item }: { item: UserTypes.Relations }) => <Relation navigation={props.navigation} user={item} onFollow={onFollow} />
	const _itemSeperator = () => <Divider />
	const _keyExtractor = (item: UserTypes.Relations) => item.username
	const _emptyComponent = () => (
		<EmptyList
			image={require('../../Assets/Images/no-comments.png')}
			title={
				type === 'follows' ? props.navigation.getScreenProps().language.no_follows : props.navigation.getScreenProps().language.no_followers
			}
		/>
	)

	return (
		<View style={[styles.container, { backgroundColor: theme.colors.background }]}>
			<Header title={state.noUser ? 'Bulunamadı' : type == 'follows' ? 'Takipler' : 'Takipçiler'} />

			{state.loading ? (
				<Loader theme={theme} />
			) : state.noUser ? (
				<EmptyList image={require('../../Assets/Images/no-comments.png')} title={props.navigation.getScreenProps().language.no_user_error} />
			) : (
				<View style={styles.listContainer}>
					<FlatList
						data={state.relations}
						keyExtractor={_keyExtractor}
						ItemSeparatorComponent={_itemSeperator}
						renderItem={_renderItem}
						ListEmptyComponent={_emptyComponent}
					/>
				</View>
			)}
		</View>
	)
}

export default React.memo(Relations)
