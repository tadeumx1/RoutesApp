import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

const handleRoutesPage = (navigation) => (

    navigation.navigate('ProfileRoutes')

)

const SettingsScreen = (props) => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>SettingsScreen</Text>
        <TouchableOpacity style={{ marginTop: 15 }} onPress={handleRoutesPage(props.navigation)}>
            <Text>Ver suas rotas</Text>
        </TouchableOpacity>
    </View>
);


const ProfileStack = createStackNavigator(
	{
		SettingsScreen: SettingsScreen,
		ProfileRoutes: ProfileRoutes
	},
	{
		initialRouteName: 'SettingsScreen',
		// headerMode: 'none',
		// header: null
	}
);

const ProfileStackContainer = createAppContainer(ProfileStack);

export default ProfileStackContainer

