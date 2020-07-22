import React from 'react'

import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import Feather from 'react-native-vector-icons/Feather'

import Login from './Screens/Auth/Login/Login'
import Register from './Screens/Auth/Register/Register'
import PasswordRecoveryFirst from './Screens/Auth/PasswordRecovery/PasswordRecoveryFirst'
import PasswordRecoverySecond from './Screens/Auth/PasswordRecovery/PasswordRecoverySecond'

import Home from './Screens/Home/Home'
import Share from './Screens/Share/Share'
import Notifications from './Screens/Notifications/Notifications'
import Comments from './Screens/Comments/Comments'
import UserProfile from './Screens/UserProfile/UserProfile'
import FollowsList from './Screens/FollowsList/FollowsList'
import Settings from './Screens/Settings/Settings'
import Search from './Screens/Search/Search'

import BottomBar from './Components/BottomBar/BottomBar'
import Types from './Includes/Types/Types'
const IconCompass = require('./Assets/Images/icon-compass.png')
const IconUsers = require('./Assets/Images/icon-users.png')
const IconUser = require('./Assets/Images/icon-user.png')
const IconPlusSquare = require('./Assets/Images/icon-plus-square.png')
const IconBell = require('./Assets/Images/icon-bell.png')

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

/* const bottomStack = createMaterialTopTabNavigator(
	{
		Home: {
			screen: Home,
			params: {
				tabBarIcon: IconCompass,
				tabBarName: 'Keşfet',
			},
		},
		Follows: {
			screen: Home,
			params: {
				tabBarIcon: IconUsers,
				tabBarName: 'Takip',
			},
		},
		Share: {
			screen: Share,
			params: {
				tabBarIcon: IconPlusSquare,
				tabBarName: 'Paylaş',
			},
		},
		Notifications: {
			screen: Notifications,
			params: {
				tabBarIcon: IconBell,
				tabBarName: 'Bildirimler',
			},
		},
		Profile: {
			screen: UserProfile,
			params: {
				tabBarIcon: IconUser,
				tabBarName: 'Profil',
			},
		},
	},
	{
		initialRouteName: 'Home',
		swipeEnabled: false,
		lazy: true,
		tabBarPosition: 'bottom',
		tabBarComponent: BottomBar,
		backBehavior: 'history',
	}
) */

const tabBarIcon = (name: string) => ({ tintColor }) => <Feather name={name} color={tintColor} size={20} />

var lastFocusedRoute: string | false = false
const bottomStack = createMaterialBottomTabNavigator(
	{
		Home: {
			screen: Home,
			navigationOptions: {
				tabBarIcon: tabBarIcon('home'),
				title: 'Keşfet',
			},
		},
		Follows: {
			screen: Home,
			navigationOptions: {
				tabBarIcon: tabBarIcon('users'),
				title: 'Takip',
			},
		},
		Search: {
			screen: Search,
			navigationOptions: {
				tabBarIcon: tabBarIcon('search'),
				title: 'Arama',
			},
		},
		Share: {
			screen: Share,
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
		initialRouteName: 'Home',
		backBehavior: 'history',
		shifting: true,
		defaultNavigationOptions: (({ navigation }: { navigation: Types.Navigation }) => ({
			activeColor: navigation.getScreenProps().theme.colors.main,
			
			tabBarOnPress: ({ navigation, defaultHandler }: { navigation: Types.Navigation; defaultHandler: any }) => {
				if (lastFocusedRoute === navigation.state.key){
					navigation.setParams({scrollToTop: true})
				}
				lastFocusedRoute = navigation.state.key
				defaultHandler()
			},
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
