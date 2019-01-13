import React from 'react';
import {
    AsyncStorage,
    StatusBar,
    View,
    Text,
} from 'react-native';
// import LottieView from 'lottie-react-native';
// import Loading from "../../components/Loading/Loading";
// import {getUser} from "../../helpers";

class AuthLoadingScreen extends React.Component {

    constructor(props) {
        super(props);
        AuthLoadingScreen._bootstrapAsync()
            .then(user => {
                // This will switch to the App screen or Auth screen and this loading
                // screen will be unmounted and thrown away.

                // this.props.navigation.navigate(user ? 'App' : 'Auth');
                this.props.navigation.navigate('Auth');
            })
            .catch(error => { throw error })
    }

    componentDidMount() {

        this.props.navigation.navigate('Auth');

    }

    // Fetch the token from storage then navigate to our appropriate place
     static async _bootstrapAsync () {
          // return await getUser()
    };

    // Render any loading content that you like here
    render() {
        return (
            // <Loading />
            <Text>Carregando AuthLoading</Text>
        );
    }
}

export default AuthLoadingScreen;
