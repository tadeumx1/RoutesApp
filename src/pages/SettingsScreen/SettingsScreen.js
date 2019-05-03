import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

const handleRoutesPage = (navigation) => (

    navigation.navigate('ProfileRoutes')

)

const handleMarkersPage = (navigation) => (

    navigation.navigate('ProfileMarkers')

)

const SettingsScreen = (props) => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>SettingsScreen</Text>
        <TouchableOpacity style={{ marginTop: 15 }} onPress={() => handleRoutesPage(props.navigation)}>
            <Text>Ver suas rotas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginTop: 15 }} onPress={() => handleMarkersPage(props.navigation)}>
            <Text>Ver seus marcadores cadastrados</Text>
        </TouchableOpacity>
    </View>
);

export default SettingsScreen
