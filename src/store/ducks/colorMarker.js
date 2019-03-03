
// Action Types

export const Types = {

    ADD_COLOR: 'colorMarker/ADD_COLOR',

    GET_MARKERS: 'colorMarker/ADD_REQUEST',

    ADD_SUCCESS: 'colorMaker/ADD_SUCCESS',

    ADD_FAILURE: 'colorMarker/ADD_FAILURE',

    CHANGE_MARKER: 'colorMarker/CHANGE_MARKER',

};

// Redux State

const initialState = {

    data: [],
    loading: false,
    colorSelected: '',
    errorOnAdd: null,

};

// Reducers

export default function colorMarker(state = initialState, action) {

    switch(action.type) {

        case Types.ADD_COLOR:

          return {

            ...state,
            colorSelected: action.payload.color,
        
          };

        case Types.GET_MARKERS:

          return {

            ...state,
           loading: true,
        
          };

        case Types.ADD_SUCCESS:

          return {

            ...state,
            data: [...state.data, action.payload.markers],
            loading: false,
        
          };  

        case Types.CHANGE_MARKER:

          return {

            ...state,
        
          };

        case Types.ADD_FAILURE:

          return {

            ...state,
           loading: false,
           errorOnAdd: action.payload.message
        
          };  

        default:

          return state;    

    }

}

// Action Creators

export const Creators = {

    addColor: color => ({

        type: Types.ADD_COLOR,
        payload: {

          color,

        }

    }),

    getMarkers: markers => ({

      type: Types.GET_MARKERS,

    }),

    addSuccess: markers => ({

      type: Types.ADD_SUCCESS,
      payload: {

        markers,

      }

    }),

    addError: message => ({

      type: Types.ADD_FAILURE,
      payload: {

        message,

      }

    }),

    changeMarker: marker => ({

        type: Types.CHANGE_MARKER,
        payload: {

          marker,

        },

    }),

}