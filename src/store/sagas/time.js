import { call, put, all, select } from 'redux-saga/effects'
import api from '../../services/api'

import idx from 'idx'

import { Creators as TimeActions } from '../ducks/time';

export function* addTimeDuration(action) {

    try {

        const time = yield select(state => state.time.time);
    
        const initialTime = yield select(state => state.time.initialTime);

        const differenceTime = time - initialTime; 

        function msToTime(duration) {

            let milliseconds = parseInt((duration % 1000) / 100),
              seconds = parseInt((duration / 1000) % 60),
              minutes = parseInt((duration / (1000 * 60)) % 60),
              hours = parseInt((duration / (1000 * 60 * 60)) % 24);
          
            hours = (hours < 10) ? "0" + hours : hours;
            minutes = (minutes < 10) ? "0" + minutes : minutes;
            seconds = (seconds < 10) ? "0" + seconds : seconds;
          
            // return hours + ":" + minutes + ":" + seconds + "." + milliseconds;

            return hours + ":" + minutes + ":" + seconds;

        }

        const timeNow = msToTime(differenceTime).toString()

        yield put(TimeActions.addTimeDurationSuccess(timeNow))

    } catch(err) {

        alert('ERRO ' + err)
        console.log('ERRO' + err)
        console.tron.log('ERRO' + err)

    }

}