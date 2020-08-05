import React from 'react'
import { View, Platform } from 'react-native'
import { Text, IconButton, withTheme } from 'react-native-paper'
import FastImage from 'react-native-fast-image'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import Types from '../../Includes/Types/Types'
import UserTypes from '../../Includes/Types/UserTypes'
import PostTypes from '../../Includes/Types/PostTypes'
import Timer from '../../Components/Timer/Timer'
import styles from './styles'

interface Props {
	navigation: Types.Navigation
	theme: Types.Theme
	user: UserTypes.TopInfo
	post?: PostTypes.Post
	openModal?: (post: PostTypes.Post) => void
	noUserTouchable?: boolean
}

interface State {}

class Post extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {}
	}

	handleProfilePress = () => {
		this.props.navigation.navigate('UserProfile', { username: "genesis" })
	}

	openModal = () => {
		this.props.openModal(this.props.post)
	}

	render() {
		let { user, theme, noUserTouchable } = this.props
		let ContainerComponent = noUserTouchable ? TouchableWithoutFeedback : TouchableOpacity
		return (
			<View style={styles.container}>
				<ContainerComponent onPress={noUserTouchable ? undefined : this.handleProfilePress} style={styles.imageContainer}>
					<FastImage source={{ uri: user.profilePhoto }} style={styles.image} />
				</ContainerComponent>

				<View style={styles.outerContent}>
					<ContainerComponent onPress={noUserTouchable ? undefined : this.handleProfilePress} style={styles.innerContent}>
						<View style={styles.usernameContainer}>
							<Text style={styles.username}>{user.username}</Text>
						</View>

						<Timer time={user.time} />
					</ContainerComponent>
					{noUserTouchable || user.isFollowed ? (
						<></>
					) : (
						<View style={styles.followButton}>
							<Text style={{ color: theme.colors.main }}>Takip Et</Text>
						</View>
					)}
				</View>

				{this.props.openModal ? (
					<IconButton
						style={{ right: -10 }}
						icon={Platform.OS === 'ios' ? 'more-horizontal' : 'more-vertical'}
						size={21}
						onPress={this.openModal}
					/>
				) : (
					<></>
				)}
			</View>
		)
	}
}

export default withTheme(Post)
