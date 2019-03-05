import { combineReducers } from 'redux';

import time from './time';
import colorMarker from './colorMarker';
import routes from './routes';

// A função combineReducers é utilizada porque lá no store teremos que cadastrar
// todos os reducers da aplicação no store

export default combineReducers({

    time,
    routes,
    colorMarker,

})