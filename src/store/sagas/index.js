
// Estamos configurando o Saga

// Assim como nos Reducers também temos que combinar os Sagas

import { all, takeLatest } from 'redux-saga/effects';

import { Types as FavoriteTypes } from 'store/ducks/favorites';
import { addFavoriteRequest } from './favorites';

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

        takeLatest(FavoriteTypes.ADD_REQUEST, addFavoriteRequest)

    ]);

}

// ACTION -> MIDDLEWARE -> REDUCER