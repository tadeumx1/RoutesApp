import { call, put, all, select } from 'redux-saga/effects'
import api from '../../services/api'

import idx from 'idx'

import { Creators as RouteActions } from '../ducks/routes';

export function* addGetRoutesRequest(action) {

    try {

    const response = yield call(api.get, '/routes');

    if(response) {

        const RoutesMap = idx(response, _ => _.data.routes) || []

        yield all(RoutesMap.map(routes => {
            return put(RouteActions.addGetRoutesSuccess(routes))
        }));

    }

    } catch(err) {

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

        const routes = responseRoutes.data

        if (routes.find(route => route._id === action.payload.route._id)) { 

            yield put(RouteActions.addError('Rota duplicada'));

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