
// Action Types

export const Types = {

    START_TIME: 'time/START_TIME',

    ADD_TIME_DURATION: 'time/ADD_TIME_DURATION',

    ADD_TIME: 'time/ADD_TIME',

    ADD_TIME_DURATION_SUCCESS: 'time/ADD_TIME_DURATION_SUCCESS',

    ADD_TIME_DURATION_NUMBER: 'time/ADD_TIME_DURATION_NUMBER',

    STOP_TIME: 'time/STOP_TIME',

};

// Redux State

const initialState = {

    time: null,
    initialTime: null,
    durationTime: null,
    durationTimeNumber: null,
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
            initialTime: action.payload.time,
            timeActive: true
        
          };

        case Types.ADD_TIME:

          return {

            ...state,
            time: action.payload.time,
            timeActive: true
        
          };

        case Types.ADD_TIME_DURATION:

          return {

            ...state,
            timeActive: true
        
          };

        case Types.ADD_TIME_DURATION_SUCCESS:

          return {
            
            ...state,
            durationTime: action.payload.time,
            timeActive: true
        
          };

        case Types.ADD_TIME_DURATION_NUMBER:

          return {

            ...state,
            durationTimeNumber: action.payload.time
            
        
          };  

        case Types.STOP_TIME:

          return {

            ...state,
            time: null,
            initialTime: null,
            durationTime: null,
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
        payload: {

          time,

        }

    }),

    addTime: time => ({

        type: Types.ADD_TIME,
        payload: {

          time,

        },

    }),

    addTimeDuration: time => ({

      type: Types.ADD_TIME_DURATION,

    }),

    addTimeDurationSuccess: time => ({

      type: Types.ADD_TIME_DURATION_SUCCESS,
      payload: {

        time,

      },

    }),

    addTimeDurationNumber: time => ({

      type: Types.ADD_TIME_DURATION_NUMBER,
      payload: {

        time,

      },

    }),

    stopTime: time => ({

        type: Types.STOP_TIME,

    }),

    /* addFavoriteError: message => ({

        type: Types.ADD_FAILURE,
        payload: {

            message,

        }

    }), */

}