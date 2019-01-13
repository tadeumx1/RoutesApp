import React, { Component } from 'react';
import { Text } from 'react-native';
// import Loading from "../components/Loading/Loading";
import {AsyncStorage} from "react-native";

class HomeLoadingScreen extends React.Component {

    constructor(props) {
        super(props);
        this._bootstrapAsync()
            .then(user => {
                // This will switch to the App screen or Auth screen and this loading
                // screen will be unmounted and thrown away.

                // this.props.navigation.navigate(user.token === 1 ? 'Jobs' : 'Auth');
                this.props.navigation.navigate('Jobs');
            })
            .catch(error => console.error(error))
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
    	return await AsyncStorage.getItem('@BikoApp:user')
		// return Realm.open({ path: 'BikoApp.realm', schema: [ UserSchema ] })
		// 	.then(realm => {
		// 		console.log('test');
		// 		return realm.objects('User')[0]
		// 	})
		// 	.catch(error => { throw error })
    };

    // Render any loading content that you like here
    render() {
        return (
            // <Loading/>
            <Text>Carregando</Text>
        );
    }
}

export default HomeLoadingScreen;
