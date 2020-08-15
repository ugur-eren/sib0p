import React from 'react'
import { StyleSheet } from 'react-native'

import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import Feather from 'react-native-vector-icons/Feather'
import Types from './Includes/Types/Types'

import NoConnection from './Screens/NoConnection/NoConnection'

import Login from './Screens/Auth/Login/Login'
import Register from './Screens/Auth/Register/Register'
import PasswordRecoveryTemp from './Screens/Auth/PasswordRecovery/PasswordRecoveryTemp'
import PasswordRecoveryFirst from './Screens/Auth/PasswordRecovery/PasswordRecoveryFirst'
import PasswordRecoverySecond from './Screens/Auth/PasswordRecovery/PasswordRecoverySecond'

import ShareInitiator from './Screens/ShareInitiator/ShareInitiator'
import Share from './Screens/Share/Share'

import Explore from './Screens/Explore/Explore'
import Notifications from './Screens/Notifications/Notifications'
import Comments from './Screens/Comments/Comments'
import UserProfile from './Screens/UserProfile/UserProfile'
import Relations from './Screens/Relations/Relations'
import Settings from './Screens/Settings/Settings'
import EditProfile from './Screens/Settings/EditProfile'
import ChangePassword from './Screens/Settings/ChangePassword'
import BlockedUsers from './Screens/Settings/BlockedUsers'
import Search from './Screens/Search/Search'
import SinglePost from './Screens/SinglePost/SinglePost'
import FastImage from 'react-native-fast-image'
import { Badge } from 'react-native-paper'
import Config from './Includes/Config'

const passwordRecoveryStack = createSwitchNavigator(
	{
		PasswordRecoveryFirst: {
			screen: PasswordRecoveryFirst,
		},
		PasswordRecoverySecond: {
			screen: PasswordRecoverySecond,
		},
	},
	{
		defaultNavigationOptions: {
			headerShown: false,
		},
	}
)

const authStack = createStackNavigator(
	{
		Login: {
			screen: Login,
		},
		Register: {
			screen: Register,
		},
		PasswordRecovery: {
			screen: PasswordRecoveryTemp,
			// screen: passwordRecoveryStack,
		},
	},
	{
		defaultNavigationOptions: {
			headerShown: false,
		},
		initialRouteName: 'Login',
	}
)

const tabBarIcon = (name: string) => ({ tintColor }) => <Feather name={name} color={tintColor} size={20} />
const tabBarIconBadge = (name: string, count: number, theme: Types.Theme) => ({ tintColor }) => (
	<>
		<Feather name={name} color={tintColor} size={20} />
		<Badge style={[styles.notifBadge, { backgroundColor: theme.colors.main, color: theme.colors.primary }]}>{count}</Badge>
	</>
)
const profilePhoto = (uri: string) => () => <FastImage source={{ uri: uri }} style={styles.profilePhotoImage} />
const styles = StyleSheet.create({
	profilePhotoImage: {
		width: 22,
		height: 22,
		borderRadius: 22,
	},
	notifBadge: {
		position: 'absolute',
		top: -10,
		right: -5,
		fontFamily: Config.fonts.semi,
		textAlignVertical: 'center',
	},
})

var lastFocusedRoute: string | false = false
const bottomStack = createMaterialBottomTabNavigator(
	{
		Explore: {
			screen: Explore,
			navigationOptions: (({ navigation }: { navigation: Types.Navigation }) => ({
				tabBarIcon: tabBarIcon('compass'),
				title: navigation.getScreenProps().language.explore,
			})) as any,
			params: {
				type: 'explore',
			},
		},
		Follows: {
			screen: Explore,
			navigationOptions: (({ navigation }: { navigation: Types.Navigation }) => ({
				tabBarIcon: tabBarIcon('users'),
				title: navigation.getScreenProps().language.follows,
			})) as any,
			params: {
				type: 'follows',
			},
		},
		ShareInitiator: {
			screen: ShareInitiator,
			navigationOptions: (({ navigation }: { navigation: Types.Navigation }) => ({
				tabBarIcon: tabBarIcon('plus-square'),
				title: navigation.getScreenProps().language.share,
			})) as any,
		},
		Notifications: {
			screen: Notifications,
			navigationOptions: (({ navigation }: { navigation: Types.Navigation }) => ({
				tabBarIcon: navigation.getScreenProps().user.notifCount
					? tabBarIconBadge('bell', navigation.getScreenProps().user.notifCount, navigation.getScreenProps().theme)
					: tabBarIcon('bell'),
				title: navigation.getScreenProps().language.notifications,
			})) as any,
		},
		Profile: {
			screen: UserProfile,
			navigationOptions: (({ navigation }: { navigation: Types.Navigation }) => ({
				tabBarIcon: navigation.getScreenProps().user.profilePhoto
					? profilePhoto(navigation.getScreenProps().user.profilePhoto)
					: tabBarIcon('user'),
				title: navigation.getScreenProps().language.profile,
			})) as any,
		},
	},
	{
		initialRouteName: 'Explore',
		backBehavior: 'history',
		shifting: true,
		defaultNavigationOptions: (({ navigation }: { navigation: Types.Navigation }) => ({
			activeColor: navigation.getScreenProps().theme.colors.main,
		})) as any,
	}
)

const mainStack = createStackNavigator(
	{
		bottomStack: {
			screen: bottomStack,
		},
		CustomPosts: {
			screen: Explore,
			params: {
				type: 'tags',
			},
		},
		Comments: {
			screen: Comments,
		},
		UserProfile: {
			screen: UserProfile,
		},
		Relations: {
			screen: Relations,
		},
		Settings: {
			screen: Settings,
		},
		EditProfile: {
			screen: EditProfile,
		},
		ChangePassword: {
			screen: ChangePassword,
		},
		BlockedUsers: {
			screen: BlockedUsers,
		},
		Share: {
			screen: Share,
		},
		Search: {
			screen: Search,
		},
		SinglePost: {
			screen: SinglePost,
		},
	},
	{
		defaultNavigationOptions: {
			headerShown: false,
		},
		initialRouteName: 'bottomStack',
	}
)

const rootStack = createSwitchNavigator(
	{
		mainStack: {
			screen: mainStack,
		},
		authStack: {
			screen: authStack,
		},
		NoConnection: {
			screen: NoConnection,
		},
		EmptyPage: {
			screen: () => <></>,
		},
	},
	{
		defaultNavigationOptions: {
			headerShown: false,
		},
		initialRouteName: 'EmptyPage',
	}
)

export default createAppContainer(rootStack)
