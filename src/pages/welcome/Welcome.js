import React, { Component } from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';

import { 

    View, 
    Text, 
    TextInput, 
    TouchableOpacity,
    StatusBar,
    ActivityIndicator,
    AsyncStorage

} from 'react-native';

import styles from './styles';

export default class Welcome extends Component {

    static navigationOptions = {

        header: null,
    
    };
    

    static propTypes = {

        navigation: PropTypes.shape({
            dispatch: PropTypes.func,
        }).isRequired,

    };

    state = {

        username: '',
        loading: false,
        errorMessage: null,

        user: {
            email: '',
            password: '',
        }
        
    }

    saveUser = async (username) => {

        await AsyncStorage.setItem('@RoutesApp:username', username)

    }

    signIn = async () => {

        const { username } = this.state;

        if(username.length === 0 ) return;

        this.setState({ loading: true });

        try {

            await this.saveUser(username);

            /* return login(credentials)
                    .then(user => {
                        storeUser(user)
                            .then(user => {
                                showMessage({
                                    message: `Bem vindo`,
                                    description: "Você foi logado com sucesso",
                                    type: "success",
                                    icon: "success",
                                    backgroundColor: '#3cce71',
                                    floating: true
                                });
                            })
                            .then(() => {
                                this.props.navigation.navigate('Home');
                            })
                            .catch( error => { throw error })
                    })
                    .catch(error => {
                        showMessage({
                            message: "Erro",
                            description: error.message,
                            type: "danger",
                            icon: "error",
                            backgroundColor: '#f14e4e',
                            floating: true
                        })
                    }); */

            const resetAction = StackActions.reset ({

                index: 0,
                actions: [
    
                    NavigationActions.navigate({ routeName: 'App' }),
    
                ]
    
            });
    
            this.props.navigation.dispatch(resetAction);

        } catch(err) {

            this.setState({ loading: false, errorMessage: 'Usuário não existe' });

        }

    }

    render() {
      return (

        <View style={styles.container}>

            <StatusBar barStyle="light-content" /> 

            <Text style={styles.title}>Bem-vindo</Text>
            <Text style={styles.text}>
        
                Para continuar, precisamos que você informe seu usuário
        
            </Text>

            { !!this.state.errorMessage 
                && <Text style={styles.error}>{this.state.errorMessage}</Text> }

            <View style={styles.form}>

                <TextInput

                    style={styles.input}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Digite seu usuário"
                    underlineColorAndroid='rgba(0, 0, 0, 0)'
                    value = {this.state.username}
                    onChangeText={username => this.setState({ username })}

                />

                <TouchableOpacity style={styles.button} onPress={this.signIn}>

                    { this.state.loading
                    ? <ActivityIndicator size="small" color='#FFF' />
                    : <Text style={styles.buttonText}>Prosseguir</Text> }

                </TouchableOpacity>

            </View>

        </View>
      )
    }
};