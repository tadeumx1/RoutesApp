import { call, put, all, select } from 'redux-saga/effects'
import api from '../../services/api'

import idx from 'idx'

import { Creators as UserActions } from '../ducks/user';
import { StackActions, NavigationActions } from 'react-navigation';
import { getUser, storeUser } from '../../utils';
import Snackbar from 'react-native-snackbar';

export function* addLoginRequest(action) {

    try {

    const response = yield call(api.post, '/sessions', action.payload.credentials);

    if(response.data && response.status === 200) {

        const userInformation = idx(response, _ => _.data.userResponse) || {}

        const token = idx(response, _ => _.data.token) || {}

        const user = {

            email: userInformation.email,
            id: userInformation._id,
            token

        }

        yield put(UserActions.loginUserSuccess(user, action.payload.navigation))

    }

    } catch(error) {
        
        const errorReponse = error.response
        const status = error.response.status

        if(status === 400 && errorReponse.data.error === 'Invalid password') {

            Snackbar.show({
                title: 'A sua senha está incorreta',
                duration: Snackbar.LENGTH_LONG,
            });

            yield put(UserActions.addError('A sua senha está incorreta'))

        } else if(status === 400) {

            Snackbar.show({
                title: 'Usuário ou senha incorretos',
                duration: Snackbar.LENGTH_LONG,
            });

            yield put(UserActions.addError('Usuário ou senha incorretos'))
    
        }

    }

}

export function* loginUserSuccess(action) {

    try {

        storeUser(action.payload.user)
            .then(() => {

                console.tron.log("Guardou o usuário")

                return getUser()
                    .then(user => {

                    const getUser = JSON.parse(user)

                    if(getUser && getUser.email && getUser.token) {

                        const resetAction = StackActions.reset ({

                            index: 0,
                            actions: [
                                NavigationActions.navigate({ routeName: 'App' }),
                            ]
                            
                        });
                                
                        action.payload.navigation.dispatch(resetAction);

                    }

                })
                .catch(() => {

                    Snackbar.show({
                        title: 'Erro ao fazer login tente novamente',
                        duration: Snackbar.LENGTH_LONG,
                    });

                })

            })

    }

    catch(err) {

        alert('ERRO ' + err)
        console.log('ERRO' + err)
        console.tron.log('ERRO' + err)

        yield put(UserActions.addError('Erro ao fazer login tente novamente CATCH'));

    }

}