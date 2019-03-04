
// Action Types

export const Types = {

    ADD_COLOR: 'colorMarker/ADD_COLOR',

    GET_MARKERS: 'colorMarker/ADD_REQUEST',

    ADD_SUCCESS: 'colorMaker/ADD_SUCCESS',

    ADD_FAILURE: 'colorMarker/ADD_FAILURE',

    DELETE_MARKER: 'colorMarker/DELETE_MARKER',

    DELETE_MARKER_SUCCESS: 'colorMarker/DELETE_SUCCESS',

    CHANGE_MARKER: 'colorMarker/CHANGE_MARKER',

    CHANGE_MARKER_SUCCESS: 'colorMarker/CHANGE_SUCCESS',

};

// Redux State

const initialState = {

    data: [],
    loading: false,
    colorSelected: '',
    markerChanged: null,
    markerDeleted: null,
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

        case Types.DELETE_MARKER:

          return {

            ...state,
            loading: true,
        
          }; 
          
        case Types.DELETE_MARKER_SUCCESS:

          return {

            ...state,
            markerDeleted: action.payload.message,
            loading: false,
        
          };   

        case Types.CHANGE_MARKER:

          return {

            ...state,
            loading: true
        
          };

        case Types.CHANGE_MARKER_SUCCESS:

          return {

            ...state,
            markerChanged: action.payload.marker,
            loading: false
        
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

    deleteMarker: marker => ({

      type: Types.DELETE_MARKER,
      payload: {

        marker

      }

    }),

    deleteMarkerSuccess: message => ({

      type: Types.DELETE_MARKER_SUCCESS,
      payload: {

        message

      }

    }),

    addError: message => ({

      type: Types.ADD_FAILURE,
      payload: {

        message,

      }

    }),

    changeMarkerSuccess: marker => ({

      type: Types.CHANGE_MARKER_SUCCESS,
      payload: {

        marker,

      },

    }),

    changeMarker: marker => ({

        type: Types.CHANGE_MARKER,
        payload: {

          marker,

        },

    }),

}