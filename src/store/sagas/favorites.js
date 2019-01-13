
import { call, put, select } from 'redux-saga/effects';
import api from 'services/api';

import { Creators as FavoriteActions } from 'store/ducks/favorites';

// Função Generator

// O Generator é parecido com async e await

// O * é como se fosse o async e o yield o await

// Ele é uma função que permite iterar os valores da função, chamando ela várias vezes

// O Saga sempre vai receber o objeto da Action que nem o Reducer recebe

export function* addFavoriteRequest(action) {

    try {

    // Para chamar uma Promise precisamos usar a função chamada call do Redux Saga

    // Não precisamos chamar a função api.get e sim só declarar e passar o parâmetro com
    // o nome do repositório

    
    const response = yield call(api.get, `repos/${action.payload.repoName}`);

    // A função select serve para bsucar alguma informação que já passou pelo reducer
    // e está no estado

    // Buscando o Array de Favorites do Reducer

    const favorites = yield select(state => state.favorites.data);

    if (favorites.find(favorite => favorite.id === response.data.id)) {

        yield put(FavoriteActions.addFavoriteError('Repositório duplicado'));

    } else {

        yield put(FavoriteActions.addFavoriteSuccess(response.data));

    }

    console.log(response)

    // Agora precisamos chamar o reducer para salvar esse repositório no estado

    // Para isso vamos usar o método put que é utilizado para enviar dados para o Reducer

    // Deve colocar o yield quanto for utilizar qualquer função do Redux shapeMargin: 

    // Chamando a Action e passando o repositório

    // yield put(addFavoriteSuccess(response.data));

    } catch(err) {

        alert('ERRO ' + err)
        console.log('ERRO' + err)

        try {

        yield put(FavoriteActions.addFavoriteError('Repositório não existe'));

        } catch (err) {

            alert('ERRO NO REDUCER ' + err)

        }


    }

}