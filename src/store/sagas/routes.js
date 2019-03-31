import { call, put, all, select } from 'redux-saga/effects'
import api from '../../services/api'

import idx from 'idx'

import { Creators as RouteActions } from '../ducks/routes';

export function* addRouteRequest(action) {

    try {

        // Checar caso a rota já existe no banco para não inserir rotas duplicadas

        /* const response = yield call(api.post, '/routes', action.payload.route);

        if(action.payload.route._id) {



        }

        const favorites = yield select(state => state.favorites.data);

        if (favorites.find(favorite => favorite.id === response.data.id)) {

        yield put(FavoriteActions.addFavoriteError('Repositório duplicado'));

        } else {

        yield put(FavoriteActions.addFavoriteSuccess(response.data));

        } */

        const response = yield call(api.post, '/routes', action.payload.route);

        if(response.data && response.status === 200) {

            yield put(RouteActions.addRouteSuccess(response.data))
            
        }

    } catch(err) {

        alert('ERRO ' + err)
        console.log('ERRO' + err)
        console.tron.log('ERRO' + err)

        yield put(RouteActions.addError('Erro ao criar a rota'));

    }

}