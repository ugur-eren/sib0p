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
			navigationOptions: {
				tabBarIcon: tabBarIcon('compass'),
				title: 'Keşfet',
			},
			params: {
				type: 'explore'
			}
		},
		Follows: {
			screen: Explore,
			navigationOptions: {
				tabBarIcon: tabBarIcon('users'),
				title: 'Takip',
			},
			params: {
				type: 'follows'
			}
		},
		ShareInitiator: {
			screen: ShareInitiator,
			navigationOptions: {
				tabBarIcon: tabBarIcon('plus-square'),
				title: 'Paylaş',
			},
		},
		Notifications: {
			screen: Notifications,
			navigationOptions: {
				tabBarIcon: tabBarIcon('bell'),
				title: 'Bildirimler',
			},
		},
		Profile: {
			screen: UserProfile,
			navigationOptions: {
				tabBarIcon: tabBarIcon('user'),
				title: 'Profil',
			},
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
