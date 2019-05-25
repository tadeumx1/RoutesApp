import { combineReducers } from 'redux';

import time from './time';
import colorMarker from './colorMarker';
import routes from './routes';
import user from './user';

// A função combineReducers é utilizada porque lá no store teremos que cadastrar
// todos os reducers da aplicação no store

export default combineReducers({

    time,
    routes,
    colorMarker,
    user

})