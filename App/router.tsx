import React from 'react'

import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import Feather from 'react-native-vector-icons/Feather'
import Types from './Includes/Types/Types'

import Login from './Screens/Auth/Login/Login'
import Register from './Screens/Auth/Register/Register'
import PasswordRecoveryFirst from './Screens/Auth/PasswordRecovery/PasswordRecoveryFirst'
import PasswordRecoverySecond from './Screens/Auth/PasswordRecovery/PasswordRecoverySecond'

import ShareInitiator from './Screens/ShareInitiator/ShareInitiator'
import Share from './Screens/Share/Share'

import Explore from './Screens/Explore/Explore'
import Notifications from './Screens/Notifications/Notifications'
import Comments from './Screens/Comments/Comments'
import UserProfile from './Screens/UserProfile/UserProfile'
import FollowsList from './Screens/FollowsList/FollowsList'
import Settings from './Screens/Settings/Settings'
import Search from './Screens/Search/Search'

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
			screen: passwordRecoveryStack,
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
		},
		Follows: {
			screen: Explore,
			navigationOptions: {
				tabBarIcon: tabBarIcon('users'),
				title: 'Takip',
			},
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
		Comments: {
			screen: Comments,
		},
		UserProfile: {
			screen: UserProfile,
		},
		FollowsList: {
			screen: FollowsList,
		},
		Settings: {
			screen: Settings,
		},
		Share: {
			screen: Share,
		},
		Search: {
			screen: Search,
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
	},
	{
		defaultNavigationOptions: {
			headerShown: false,
		},
		initialRouteName: 'mainStack',
	}
)

export default createAppContainer(rootStack)

/* import Test from './Screens/Test/Test'
export default createAppContainer(createStackNavigator({
	Test: Test
}, {
	defaultNavigationOptions: {
		headerShown: false
	}
})) */
