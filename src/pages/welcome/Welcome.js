import React, { Component } from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import { login } from '../../services/login';
import { getUser, storeUser } from '../../utils';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
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

import { Creators as UserActions } from '../../store/ducks/user';

class Welcome extends Component {

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

        const credentials = {

            email: this.state.username,
            password: this.state.password

        }

        this.props.loginUser(credentials, this.props.navigation)

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

                    { this.props.loading
                    ? <ActivityIndicator size="small" color='#FFF' />
                    : <ButtonText>Prosseguir</ButtonText> }

                </Button>

            </Form>

        </Container>
      )
    }
};

const mapStateToProps = state => ({

    loading: state.user.loading

});

const mapDispatchToProps = dispatch => bindActionCreators(UserActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)