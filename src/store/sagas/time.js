import { call, put, select } from 'redux-saga/effects';
// import api from '../../services/api';

import { eventChannel, END } from 'redux-saga'

import { Creators as TimeActions } from '../ducks/time';

export function* startTimeSaga() {

    /* const runner = yield call(setInterval, () => {
      // console.log('yes');
      // alert('yeeeeess')
      put(TimeActions.addTime(new Date().toLocaleString()));
    }, 1000); */

    // const channel = yield call(countdown);

    const chan = yield call(countdown)
    
    try { 
        while (true) {
            let seconds = yield take(chan)
            console.log(`countdown: ${seconds}`)
        }
    } finally {
        if (yield cancelled()) {
            chan.close()
            console.log('countdown cancelled')
        }    
    }
    
    // console.log(runner);

}

function countdown() {
    return eventChannel(() => {
        const iv = setInterval(() => {

            const timeActive = yield select(state => state.timeActive);

            if (timeActive === true) {

                yield put(TimeActions.addTime(new Date().toLocaleString()));
                // emitter(secs)

              } else {
                // this causes the channel to close
                emitter(END)
              }

        }, 1000);
        // The subscriber must return an unsubscribe function
        return () => {
          clearInterval(iv)
        }
      }
    )
}

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
