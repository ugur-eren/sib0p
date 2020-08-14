import React from 'react'
import { View, Image } from 'react-native'
import { Text } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler'
import TextButton from '../../Components/TextButton/TextButton'
import UserTypes from '../../Includes/Types/UserTypes'
import Types from '../../Includes/Types/Types'
import { RelationStyles as styles } from './styles'

interface Props {
	navigation: Types.Navigation
	user: UserTypes.Relations
	onFollow?: () => Promise<void>
	unblock?: (username: string) => Promise<void>
}

const Relation = (props: Props) => {
	const _handleProfilePress = () => {
		props.navigation.push('UserProfile', { username: props.user.username })
	}

	let screen = props.navigation.getScreenProps()
	let isMyself = screen.user.username === props.user.username

	const onUnblock = async () => {
		await props.unblock(props.user.username)
	}
	
	return (
		<View style={styles.container}>
			<TouchableOpacity containerStyle={styles.touchableContainer} style={styles.touchable} onPress={_handleProfilePress}>
				<View style={styles.imageContainer}>
					<Image source={{ uri: props.user.profilePhoto }} style={styles.image} />
				</View>

				<View>
					<Text style={styles.username}>{props.user.username}</Text>
					<Text>{props.user.fullName}</Text>
				</View>
			</TouchableOpacity>

			{props.onFollow && !isMyself ? (
				<TextButton
					loadable
					label={props.user.isFollowed ? screen.language.unfollow : screen.language.follow}
					language={screen.language}
					onPress={() => {}}
				/>
			) : (
				<></>
			)}
			{props.unblock ? (
				<TextButton
					loadable
					label={screen.language.unblock}
					language={screen.language}
					onPress={onUnblock}
				/>
			) : (
				<></>
			)}
		</View>
	)
}

export default React.memo(Relation)
