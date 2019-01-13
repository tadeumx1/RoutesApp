
// Action Types

export const Types = {

    // Antes era ADD_FAVORITE_REQUEST

    ADD_REQUEST: 'favorites/ADD_REQUEST',

    // Antes era ADD_FAVORITE_SUCCESS

    ADD_SUCCESS: 'favorites/ADD_SUCCESS',

    // Antes era ADD_FAVORITE_ERROR

    ADD_FAILURE: 'favorites/ADD_FAILURE',

};

// Para colocar as informações de loading e error no estado do Reducer
// trocamos o estado de um array para um objeto

// Antes era dessa forma

// const initialState = [];

const initialState = {

    data: [],
    loading: false,
    errorOnAdd: null,

};

export default function favorites(state = initialState, action) {

    switch(action.type) {

        // Após a busca do repositório precisa salvar os dados no estado

        case Types.ADD_REQUEST:

          return {

            ...state,
            loading: true,

          };

        case Types.ADD_SUCCESS:

          return {

            // ...state,

            data: [...state.data, action.payload.repository],
            errorOnAdd: null,
            loading: false,

          };
          
        case Types.ADD_FAILURE:
        
           return {

            ...state,
            loading: false,
            errorOnAdd: action.payload.message,

           };

        default:

          return state;    

    }

}


// Action Creators

export const Creators = {

    // Por que o nome dessa Action é AddFavoriteRequest e não Add Favorite

    // Esse é o processo que vai acontecer para buscar os repositórios na API

    // Com essa Action só vamos dizer pro Saga executar, buscar as informações do repositório

    // Cada flecha é uma Action 

    // Essa Action é a primeira que só vai buscar os dados, depois vai ter que
    // avisar o Reducer que tudo está pronto

    // ACTION -> MIDDLEWARE (SAGA) -> REDUCER

    addFavoriteRequest: repoName => ({

        type: Types.ADD_REQUEST,
        payload: {

            repoName,

        },

    }),

    // Essa é a Action da segunda flecha

    // A Action vai chamar o reducer após a busca do repositório na API e salvar no estado

    addFavoriteSuccess: repository => ({

        type: Types.ADD_SUCCESS,
        payload: {

            repository,

        },

    }),

    addFavoriteError: message => ({

        type: Types.ADD_FAILURE,
        payload: {

            message,

        }

    }),

}