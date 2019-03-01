
// Action Types

export const Types = {

    ADD_COLOR: 'colorMarker/ADD_COLOR',

    CHANGE_COLOR: 'colorMarker/CHANGE_COLOR',

    GET_MARKERS: 'colorMarker/GET_MARKERS',

    CHANGE_MARKERS: 'colorMarker/CHANGE_MARKERS',

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

        case Types.CHANGE_COLOR:

          return {

            ...state,
            colorSelected: action.payload.color,
        
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

    changeColor: color => ({

        type: Types.CHANGE_COLOR,
        payload: {

          color,

        },

    }),

}