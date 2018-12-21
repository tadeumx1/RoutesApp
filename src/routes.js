import {createBottomTabNavigator, createStackNavigator, createSwitchNavigator} from "react-navigation";
import SearchScreen from "./SearchScreen/SearchScreen";
import JobsScreen from "./JobsScreen/JobsScreen";
import SettingsScreen from "./SettingsScreen";
import Icon from "react-native-vector-icons/Feather";
import colors from "../styles/colors";
import metrics from "../styles/metrics";
import LoginScreen from "./Auth/LoginScreen";
import RegisterStudent from "./Auth/RegisterStudent";
import AuthLoadingScreen from "./Auth/AuthLoadingScreen";
import React from "react";

const TabNav = createBottomTabNavigator(
	{
		Jobs: {
			screen: JobsScreen,
			navigationOptions: {
				title: 'Vagas'
			}
		},
		Search: {
			screen: SearchScreen,
			navigationOptions: {
				title: 'Busca'
			}
		},
		Profile: {
			screen: SettingsScreen,
			navigationOptions: {
				title: 'Perfil'
			}
		},
	},
	{
		navigationOptions: ({ navigation }) => ({
			tabBarIcon: ({ focused, tintColor }) => {
				const { routeName } = navigation.state;
				let iconName;

				switch (routeName) {
					case 'Search':
						iconName = `search`;
						break;
					case 'Jobs':
						iconName = `briefcase`;
						break;
					case 'Profile':
						iconName = `user`;
						break;
				}

				// You can return any component that you like here! We usually use an
				// icon component from react-native-vector-icons
				return <Icon name={iconName} size={24} color={tintColor} />;
			},
		}),
		initialRouteName: 'Profile',
		tabBarOptions: {
			activeTintColor: colors.primary,
			inactiveTintColor: '#ccc',
			style: {
				backgroundColor: colors.white,
				height: metrics.tabBarHeight,
				paddingHorizontal: metrics.padding,
				borderColor: '#eee',
			}
		},
	}
);

const AuthStack = createStackNavigator(
	{
		SignIn: LoginScreen,
		SignUpStudent: RegisterStudent
	},
	{
		initialRouteName: 'SignIn',
		headerMode: 'none',
		header: null
	}
);

const RootStack = createSwitchNavigator(
	{
		AuthLoading: { screen: AuthLoadingScreen },
		App: { screen: TabNav },
		Auth: { screen: AuthStack }
	},
	{
		initialRouteName: 'AuthLoading',
		headerMode: 'none',
		navigationOptions: {
			header: null
		}
	}
);

export default RootStack
