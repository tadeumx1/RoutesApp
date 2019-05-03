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

import { Container, Title, TextInformation, Error, Form, Input, Button, ButtonText } from './stylesStyled'

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
        password: '',
        loading: false,
        errorMessage: null,
        
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

        <Container>

            <StatusBar barStyle="light-content" /> 

            <Title>Bem-vindo</Title>
            <TextInformation>
        
                Para continuar, precisamos que você informe seu usuário
        
            </TextInformation>

            { !!this.state.errorMessage 
                && <Error>{this.state.errorMessage}</Error> }

            <Form>

                <Input

                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Digite seu usuário"
                    underlineColorAndroid='rgba(0, 0, 0, 0)'
                    value = {this.state.username}
                    onChangeText={username => this.setState({ username })}

                />

                <Input

                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Digite sua senha"
                    underlineColorAndroid='rgba(0, 0, 0, 0)'
                    value = {this.state.password}
                    onChangeText={username => this.setState({ password })}

                />


                <Button onPress={this.signIn}>

                    { this.state.loading
                    ? <ActivityIndicator size="small" color='#FFF' />
                    : <ButtonText>Prosseguir</ButtonText> }

                </Button>

            </Form>

        </Container>
      )
    }
};