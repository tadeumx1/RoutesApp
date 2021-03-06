import { call, put, all, select } from 'redux-saga/effects'
import api from '../../services/api'

import idx from 'idx'

import { Creators as ColorMarkerActions } from '../ducks/colorMarker';

export function* addMarkersRequest(action) {

    try {

    const response = yield call(api.get, '/markers');

    /* if(response) {

        yield put(ColorMarkerActions.addSuccess(response.data));

    } */

    if(response) {

        const MarkersMap = idx(response, _ => _.data.markers) || []

        yield all(MarkersMap.map(marker => {
            return put(ColorMarkerActions.addSuccess(marker))
        }));

    }

    } catch(err) {

        // alert('ERRO ' + err)
        console.log('ERRO' + err)
        console.tron.log('ERRO' + err)

        yield put(ColorMarkerActions.addError('Erro ao buscar os marcadores'));

    }

}

export function* addMarkerUpdateRequest(action) {

    try {

        const response = yield call(api.put, `/marker/${action.payload.marker._id}`, action.payload.marker);

        if(response.data && response.status === 200) {

            yield put(ColorMarkerActions.changeMarkerSuccess(response.data))
            
        }

    } catch(err) {

        // alert('ERRO ' + err)
        console.log('ERRO' + err)
        console.tron.log('ERRO' + err)

        yield put(ColorMarkerActions.addError('Erro ao atualizar o marcador'));

    }

}

export function* addMarkerDeleteRequest(action) {

    try {

        const response = yield call(api.delete, `/marker/${action.payload.marker._id}`, action.payload.marker);

        if (response.status === 200) {

            yield put(ColorMarkerActions.deleteMarkerSuccess(true))
            
        }

    } catch(err) {

        // alert('ERRO ' + err)
        console.log('ERRO' + err)
        console.tron.log('ERRO' + err)

        yield put(ColorMarkerActions.addError('Erro ao deletar o marcador'));

    }

}
