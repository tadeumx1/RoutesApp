
// Action Types

export const Types = {

    ADD_COLOR: 'color/ADD_COLOR',

    CHANGE_COLOR: 'color/CHANGE_COLOR',

};

// Redux State

const initialState = {

    colorSelected: null,
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
            color: action.payload.time,
        
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

    changeColor: time => ({

        type: Types.CHANGE_COLOR,
        payload: {

          color,

        },

    }),

}