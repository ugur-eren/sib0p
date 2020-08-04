import React from 'react'
import { View, Image } from 'react-native'
import { Text, withTheme } from 'react-native-paper'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import Config from '../../Includes/Config'
import Header from '../../Components/Header/Header'
import TextButton from '../../Components/TextButton/TextButton'
import UserTypes from '../../Includes/Types/UserTypes'
import Types from '../../Includes/Types/Types'
import { FollowsListItemStyles as styles } from './styles'

interface Props {
	navigation: Types.Navigation
	theme: Types.Theme
	user: UserTypes.Follows
}

interface State {}

class FollowsListItem extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {}
	}

	handleProfilePress = () => {
		this.props.navigation.navigate('Profile', { username: this.props.user.username })
	}

	render() {
		let { user, navigation } = this.props
		return (
			<View style={styles.container}>
				<TouchableOpacity containerStyle={styles.touchableContainer} style={styles.touchable} onPress={this.handleProfilePress}>
					<View style={styles.imageContainer}>
						<Image source={{ uri: user.profilePhoto }} style={styles.image} />
					</View>

					<View>
						<Text style={styles.username}>{user.username}</Text>
						<Text>{user.fullName}</Text>
					</View>
				</TouchableOpacity>

				<TextButton label={user.isFollowed ? 'Takipten Çık' : 'Takip Et'} onPress={() => {}} />
			</View>
		)
	}
}

export default withTheme(FollowsListItem)
