import { combineReducers } from 'redux';

import favorites from './favorites';
import time from './time';
import colorMarker from './colorMarker';

// A função combineReducers é utilizada porque lá no store teremos que cadastrar
// todos os reducers da aplicação no store

export default combineReducers({

    favorites,
    time,
    colorMarker,

})