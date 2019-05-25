
// Estamos configurando o Saga

// Assim como nos Reducers também temos que combinar os Sagas

import { all, takeLatest } from 'redux-saga/effects';

import { Types as TimeTypes } from '../ducks/time';
import { Types as colorMarkerTypes } from '../ducks/colorMarker';
import { Types as RouteTypes } from '../ducks/routes';
import { Types as UserTypes } from '../ducks/user';
import { startTimeSaga } from './time';
import { addTimeDuration } from './time';
import { addMarkersRequest, addMarkerUpdateRequest, addMarkerDeleteRequest } from './colorMarker';
import { addRouteRequest, addGetRoutesRequest } from './routes';
import { addLoginRequest, loginUserSuccess } from './user';

// Função Generator function*

// Tem que configurar aqui para cada vez que a Action AddFavoriteRequest for chamada
// também o Saga AddFavoriteRequest deve ser chamado

export default function* rootSaga() {

    // yield é uma palavra chave da função generator

    return yield all([

        // Registrar os Sagas aqui

        // O TakeLatest foi usado pois caso o botão for clicado duas vezes seguidas
        // só a segunda vez vai ser executada

        // Agora com o takeEvery caso o botão for clicado duas vezes ele vai 
        // terminar a requisição e fazer de novo

        // Com o TakeLatest devemos colocar o type da Action
        // e o Saga que deverá ser executado após aquela Action ser chamada

        takeLatest(colorMarkerTypes.GET_MARKERS, addMarkersRequest),
        takeLatest(colorMarkerTypes.DELETE_MARKER, addMarkerDeleteRequest),
        takeLatest(colorMarkerTypes.CHANGE_MARKER, addMarkerUpdateRequest),
        takeLatest(TimeTypes.ADD_TIME_DURATION, addTimeDuration),
        takeLatest(RouteTypes.ADD_ROUTE, addRouteRequest),
        takeLatest(RouteTypes.GET_ROUTES, addGetRoutesRequest),
        takeLatest(UserTypes.LOGIN_USER, addLoginRequest),
        takeLatest(UserTypes.LOGIN_USER_SUCCESS, loginUserSuccess)

    ]);

}

// ACTION -> MIDDLEWARE -> REDUCER