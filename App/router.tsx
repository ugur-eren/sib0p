import React from 'react'

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
				type: 'explore'
			}
		},
		Follows: {
			screen: Explore,
			navigationOptions: (({ navigation }: { navigation: Types.Navigation }) => ({
				tabBarIcon: tabBarIcon('users'),
				title: navigation.getScreenProps().language.follows,
			})) as any,
			params: {
				type: 'follows'
			}
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
				tabBarIcon: tabBarIcon('bell'),
				title: navigation.getScreenProps().language.notifications,
			})) as any,
		},
		Profile: {
			screen: UserProfile,
			navigationOptions: (({ navigation }: { navigation: Types.Navigation }) => ({
				tabBarIcon: tabBarIcon('user'),
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
				type: 'tags'
			}
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
			screen: ChangePassword
		},
		BlockedUsers: {
			screen: BlockedUsers
		},
		Share: {
			screen: Share,
		},
		Search: {
			screen: Search,
		},
		SinglePost: {
			screen: SinglePost,
		}
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
			screen: NoConnection
		},
		EmptyPage: {
			screen: () => <></>
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
