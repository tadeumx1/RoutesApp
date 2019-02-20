
// Action Types

export const Types = {

    START_TIME: 'time/START_TIME',

    ADD_TIME: 'time/ADD_TIME',

    STOP_TIME: 'time/STOP_TIME',

};

// Redux State

const initialState = {

    time: null,
    timeActive: false,
    // errorOnAdd: null,

};

// Reducers

export default function time(state = initialState, action) {

    switch(action.type) {

        // Após a busca do repositório precisa salvar os dados no estado

        case Types.START_TIME:

          return {

            ...state,
            timeActive: true
        
          };

        case Types.ADD_TIME:

          return {

            time: action.payload.time,
            timeActive: true
        
          };

        case Types.STOP_TIME:

          return {

            ...state,
            timeActive: false,

          };
          
        /* case Types.ADD_FAILURE:
        
           return {

            ...state,
            loading: false,
            errorOnAdd: action.payload.message,

           }; */

        default:

          return state;    

    }

}

// Action Creators

export const Creators = {

    startTime: time => ({

        type: Types.START_TIME,

    }),

    addTime: time => ({

        type: Types.ADD_TIME,
        payload: {

            time,

        },

    }),

    stopTime: ({

        type: Types.STOP_TIME,

    }),

    /* addFavoriteError: message => ({

        type: Types.ADD_FAILURE,
        payload: {

            message,

        }

    }), */

}