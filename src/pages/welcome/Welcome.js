import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import api from 'services/api'

import { Container, Title, Error, Form, Input, ButtonText } from './styles';

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
        
    }

    checkUserExists = async (username) => {

        const user = await api.get(`/users/${username}`);

        console.log(user);

        return user;

    }

    saveUser = async (username) => {

        await AsyncStorage.setItem('@Githuber:username', username)

    }

    signIn = async () => {

        const { username } = this.state;

        if(username.length === 0 ) return;

        this.setState({ loading: true });

        try {

            await this.checkUserExists(username);

            await this.saveUser(username);

            const resetAction = NavigationActions.reset ({

                index: 0,
                actions: [
    
                    NavigationActions.navigate({ routeName: 'User' }),
    
                ]
    
            });
    
            this.props.navigation.dispatch(resetAction);

            // resto

        } catch(err) {

            // erro

            this.setState({ loading: false, errorMessage: 'Usuário não existe' });

        }

        // Com isso podemos ver todas as props que esse componente recebe
        // incluindo as props que o React Navigation passa

        //console.log(this.props);

    }

    render() {
      return (

        <Container>

            <StatusBar barStyle="light-content" /> 

            <Title>Bem-vindo</Title>
            <TextInformation>
        
                Para continuar, precisamos que você informe seu usuário no Github
        
            </TextInformation>

            { !!this.state.errorMessage 
                && <Error>{this.state.errorMessage}</Error> }

            <Form>

                <Input

                    style={styles.input}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Digite seu usuário"
                    underlineColorAndroid='rgba(0, 0, 0, 0)'
                    value = {this.state.username}
                    onChangeText={username => this.setState({ username })}

                />

                <Button style={styles.button} onPress={this.signIn}>

                    { this.state.loading
                    ? <ActivityIndicator size="small" color='#FFF' />
                    : <ButtonText>Prosseguir</ButtonText> }

                </Button>

            </Form>

        </Container>
      )
    }
};