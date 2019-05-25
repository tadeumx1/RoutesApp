import { call, put, all, select } from 'redux-saga/effects'
import api from '../../services/api'

import idx from 'idx'

import { Creators as UserActions } from '../ducks/user';
import { storeUser } from '../../utils';

export function* addLoginRequest(action) {

    try {

    const response = yield call(api.post, '/sessions', action.payload.credentials);

    if(response.data && response.status === 200) {

        const userInformation = idx(response, _ => _.data.userResponse) || {}

        const user = {

            email: userInformation.email,
            id: userInformation.id,
            token: userInformation.token

        }

        yield put(UserActions.loginUserSuccess(user))

    }

    } catch(err) {

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

    }

}

export function* loginUserSuccess(action) {

    try {

        storeUser(action.payload.user)
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
                .catch(() => {

                    this.setState({ loading: false })

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

        yield put(RouteActions.addError('Erro ao buscar as rotas'));

    }

}

export function* addRouteRequest(action) {

    try {

        // Checar caso a rota já existe no banco para não inserir rotas duplicadas

        const responseRoutes = yield call(api.get, '/routes');

        const routes = responseRoutes.data.routes

        if (routes.find(route => route.name === action.payload.route.name)) { 

            yield put(RouteActions.addError('Rota duplicada'));

            alert('Essa rota já existe, digite outro nome')

        } else {

            const response = yield call(api.post, '/routes', action.payload.route);

            if(response.data && response.status === 200) {
    
                yield put(RouteActions.addRouteSuccess(response.data))
                
            }

        }

    } catch(err) {

        alert('ERRO ' + err)
        console.log('ERRO' + err)
        console.tron.log('ERRO' + err)

        yield put(RouteActions.addError('Erro ao criar a rota'));

    }

}