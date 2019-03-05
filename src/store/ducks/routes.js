
// Action Types

export const Types = {

    ADD_ROUTE: 'routes/ADD_ROUTE',

    ADD_ROUTE_SUCCESS: 'routes/ADD_ROUTE_SUCCESS',

    GET_ROUTES: 'routes/ADD_REQUEST',

    GET_ROUTES_SUCCESS: 'routes/ADD_SUCCESS',

    ADD_DISTANCE: 'routes/ADD_DISTANCE',

    ADD_SPEED: 'routes/ADD_SPEED',

    STOP_ROUTE: 'routes/STOP_ROUTE',

    ADD_FAILURE: 'routes/ADD_FAILURE',

    ADD_ROUTE_UPDATE: 'routes/ADD_ROUTE_UPDATE',

    DELETE_ROUTE: 'routes/DELETE_ROUTE',

    DELETE_ROUTE_SUCCESS: 'routes/DELETE_SUCCESS',

    CHANGE_ROUTE: 'routes/CHANGE_ROUTE',

    CHANGE_ROUTE_SUCCESS: 'routes/CHANGE_SUCCESS',

};

// Redux State

const initialState = {

    data: [],
    loading: false,
    routeSelected: '',
    distance: null,
    speed: null,
    routeAdd: null,
    routeChanged: null,
    routeDeleted: null,
    errorOnAdd: null,

};

// Reducers

export default function colorMarker(state = initialState, action) {

    switch(action.type) {

        case Types.GET_ROUTES:

          return {

            ...state,
            loading: true
        
          };

        case Types.GET_ROUTES_SUCCESS:

          return {

            ...state,
            data: [...state.data, action.payload.routes],
            loading: false,
        
          };

        case Types.ADD_ROUTE:

          return {

            ...state,
            loading: true,
        
          };

        case Types.ADD_ROUTE_SUCCESS:

          return {

            ...state,
            routeAdd: action.payload.route,
            loading: false,
        
          };

        case Types.ADD_DISTANCE:

          return {

            ...state,
            distance: action.payload.distance,
            loading: false,
        
          };

        case Types.ADD_SPEED:

          return {

            ...state,
            speed: action.payload.speed,
            loading: false,
        
          };    

        case Types.STOP_ROUTE:

          return {

            ...state,
            speed: null,
            distance: null,
            loading: false,
        
          };  

        case Types.DELETE_ROUTE:

          return {

            ...state,
            loading: true,
        
          };
          
        case Types.DELETE_ROUTE_SUCCESS:

          return {

            ...state,
            routeDeleted: action.payload.message,
            loading: false,
        
          };

        case Types.CHANGE_ROUTE:

          return {

            ...state,
            loading: true
        
          };

        case Types.CHANGE_ROUTE_SUCCESS:

          return {

            ...state,
            routeChanged: action.payload.route,
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

    getRoutes: markers => ({

      type: Types.GET_ROUTES,

    }),

    addGetRoutesSuccess: routes => ({

      type: Types.GET_ROUTES_SUCCESS,
      payload: {

        routes,

      }

    }),

    addRouteSave: route => ({

      type: Types.ADD_ROUTE,
      payload: {
  
        route
  
      }
  
    }),

    addRouteSuccess: route => ({

      type: Types.ADD_ROUTE_SUCCESS,
      payload: {

        route

      }

    }),

    addDistance: distance => ({

      type: Types.ADD_DISTANCE,
      payload: {
    
        distance
    
       }
    
    }),

    addSpeed: speed => ({

       type: Types.ADD_SPEED,
       payload: {
    
        speed
    
       }
    
    }),

    stopRoute: route => ({

       type: Types.ADD_ROUTE,
     
    }),

    deleteRoute: route => ({

      type: Types.DELETE_ROUTE,
      payload: {

        route

      }

    }),

    deleteRouteSuccess: route => ({

      type: Types.DELETE_ROUTE_SUCCESS,
      payload: {

        route

      }

    }),

    addError: message => ({

      type: Types.ADD_FAILURE,
      payload: {

        message,

      }

    }),

    changeRouteSuccess: route => ({

      type: Types.CHANGE_ROUTE_SUCCESS,
      payload: {

        route,

      },

    }),

    changeRoute: route => ({

      type: Types.CHANGE_ROUTE,
      payload: {

        route,

       },

    }),

}