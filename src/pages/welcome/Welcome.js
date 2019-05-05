import React, { Component } from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import { login } from '../../services/login';
import { getUser, storeUser } from '../../utils';
import Snackbar from 'react-native-snackbar';
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

    /* saveUser = async (username) => {

        await AsyncStorage.setItem('@RoutesApp:username', JSON.stringify(user))

    } */

    signIn = async () => {

        const { username } = this.state;

        if(username.length === 0 ) return;

        this.setState({ loading: true });

        try {

            // await this.saveUser(username);

            const credentials = {

                email: this.state.username,
                password: this.state.password

            }

            return login(credentials)
                    .then(user => {

                        const userUsername = {
                            username: user.userResponse.email,
                            token: user.token
                        }

                        storeUser(userUsername)
                            .then(() => {

                                return getUser()
                                    .then(user => {

                                        const getUser = JSON.parse(user)

                                        if(getUser && getUser.username && getUser.token) {

                                            const resetAction = StackActions.reset ({

                                                index: 0,
                                                actions: [
                            
                                                    NavigationActions.navigate({ routeName: 'App' }),
                            
                                                ]
                            
                                            });
    
                                            this.setState({ loading: false })
                            
                                            this.props.navigation.dispatch(resetAction);

                                        }

                                    })
                                    .catch(error => {

                                        this.setState({ loading: false })

                                        Snackbar.show({
                                            title: 'Erro ao fazer login tente novamente',
                                            duration: Snackbar.LENGTH_LONG,
                                        });

                                    })
                                    

                            })
                    })
                    .catch(error => {
                        // showMessage({
                        //     message: "Erro",
                        //     description: error.message,
                        //     type: "danger",
                        //     icon: "error",
                        //     backgroundColor: '#f14e4e',
                        //     floating: true
                        // })

                        this.setState({ loading: false })

                        const errorReponse = error.response
                        const status = error.response.status

                        if(status === 400 && errorReponse.data.error === 'Invalid password') {

                            Snackbar.show({
                                title: 'A sua senha está incorreta',
                                duration: Snackbar.LENGTH_LONG,
                            });

                        } else if(status === 400) {

                            Snackbar.show({
                                title: 'Usuário ou senha incorretos',
                                duration: Snackbar.LENGTH_LONG,
                            });
    
                        }

                    });

            /* const resetAction = StackActions.reset ({

                index: 0,
                actions: [
    
                    NavigationActions.navigate({ routeName: 'App' }),
    
                ]
    
            });
    
            this.props.navigation.dispatch(resetAction); */

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
                    placeholder="Digite seu email"
                    underlineColorAndroid='rgba(0, 0, 0, 0)'
                    value = {this.state.username}
                    onChangeText={username => this.setState({ username })}

                />

                <Input

                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Digite sua senha"
                    secureTextEntry={true}
                    underlineColorAndroid='rgba(0, 0, 0, 0)'
                    value = {this.state.password}
                    onChangeText={password => this.setState({ password })}

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