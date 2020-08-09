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
}

const Relation = (props: Props) => {
	const _handleProfilePress = () => {
		props.navigation.push('UserProfile', { username: props.user.username })
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

			<TextButton label={props.user.isFollowed ? 'Takipten Çık' : 'Takip Et'} onPress={() => {}} />
		</View>
	)
}

export default React.memo(Relation)
