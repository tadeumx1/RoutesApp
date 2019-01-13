import { createBottomTabNavigator, createStackNavigator, createSwitchNavigator, createAppContainer } from "react-navigation";

import Information from "./pages/Information/Information";
import MapScreen from "./pages/MapScreen/MapScreen";
import Routes from "./pages/Routes/Routes";
import SettingsScreen from "./pages/SettingsScreen/SettingsScreen";

import Icon from "react-native-vector-icons/Feather";
import colors from "./styles/colors";
import metrics from "./styles/metrics";

import LoginScreen from "./pages/Welcome/Welcome";
import RegisterUser from "./pages/RegisterUser/RegisterUser";
import AuthLoadingScreen from "./pages/AuthLoadingScreen";
import HomeLoadingScreen from "./pages/HomeLoadingScreen";
import React from "react";

const TabNav = createBottomTabNavigator(
	{
		Information: {
			screen: Information,
			navigationOptions: {
				title: 'Information'
			}
		},
		MapScreen: {
			screen: MapScreen,
			navigationOptions: {
				title: 'Map'
			}
		},
		/* Routes: {
			screen: Routes,
			navigationOptions: {
				title: 'Rotas'
			}
		}, */
		SettingsScreen: {
			screen: SettingsScreen,
			navigationOptions: {
				title: 'Perfil'
			}
		},
	},
	{
		defaultNavigationOptions: ({ navigation }) => ({
			tabBarIcon: ({ focused, tintColor }) => {
				const { routeName } = navigation.state;
				let iconName;

				switch (routeName) {
					case 'Information':
						iconName = `info`;
						break;
					case 'MapScreen':
						iconName = `map`;
						break;
					/* case 'Routes':
						iconName = `map-pin`;
						break; */
					case 'SettingsScreen':
						iconName = `user`;
						break;	
				}

				// You can return any component that you like here! We usually use an
				// icon component from react-native-vector-icons
				return <Icon name={iconName} size={24} color={tintColor} />;
			},
		}),
		initialRouteName: 'MapScreen',
		tabBarOptions: {
			activeTintColor: colors.primary,
			inactiveTintColor: '#000',
			style: {
				backgroundColor: colors.white,
				// height: metrics.tabBarHeight,
				paddingHorizontal: metrics.padding,
				borderColor: '#eee',
			}
		},
	}
);

const TabNavContainer = createAppContainer(TabNav);

const AuthStack = createStackNavigator(
	{
		SignIn: LoginScreen,
		App: TabNavContainer,
		SignUpStudent: RegisterUser
	},
	{
		initialRouteName: 'SignIn',
		headerMode: 'none',
		header: null
	}
);

const AuthStackContainer = createAppContainer(AuthStack);

const RootStack = createSwitchNavigator(
	{
		AuthLoading: { screen: AuthLoadingScreen },
		App: { screen: TabNavContainer },
		Auth: { screen: AuthStackContainer }
	},
	{
		initialRouteName: 'AuthLoading',
		headerMode: 'none',
		navigationOptions: {
			header: null
		}
	}
);

const RootStackContainer = createAppContainer(RootStack);

export default RootStackContainer
