import React from 'react'
import { View } from 'react-native'
import { Text, withTheme } from 'react-native-paper'
import FastImage from 'react-native-fast-image'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import UserTypes from '../../Includes/Types/UserTypes'
import Types from '../../Includes/Types/Types'
import Timer from '../../Components/Timer/Timer'
import styles from './styles'

interface Props {
	navigation: Types.Navigation
	theme: Types.Theme
	user: UserTypes.TopInfo
	noUserTouchable?: boolean
}

interface State {}

class Post extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {}
	}

	handleProfilePress = () => {
		this.props.navigation.push('UserProfile', { username: this.props.user.username })
	}

	render() {
		let { user, theme, noUserTouchable } = this.props
		let ContainerComponent = noUserTouchable ? TouchableWithoutFeedback : TouchableOpacity
		return (
			<ContainerComponent onPress={noUserTouchable ? undefined : this.handleProfilePress} style={styles.container}>
				<View style={styles.imageContainer}>
					<FastImage source={{ uri: user.profilePhoto }} style={styles.image} />
				</View>

				<View style={styles.content}>
					<View style={styles.usernameContainer}>
						<Text style={styles.username}>{user.username}</Text>
					</View>

					<Timer time={user.time} />
				</View>

				{noUserTouchable || user.isFollowed ? (
					<></>
				) : (
					<View style={styles.followButton}>
						<Text style={{ color: theme.colors.main }}>Takip Et</Text>
					</View>
				)}
			</ContainerComponent>
		)
	}
}

export default withTheme(Post)
