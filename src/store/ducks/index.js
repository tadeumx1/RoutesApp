import { combineReducers } from 'redux';

import time from './time';
import colorMarker from './colorMarker';

// A função combineReducers é utilizada porque lá no store teremos que cadastrar
// todos os reducers da aplicação no store

export default combineReducers({

    time,
    colorMarker,

})