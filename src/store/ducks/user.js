
// Action Types

export const Types = {

    LOGIN_USER: 'user/LOGIN_USER',

    LOGIN_USER_SUCCESS: 'user/LOGIN_USER_SUCCESS',

    SIGN_UP_USER: 'user/SIGN_UP_USER',

    SIGN_OUT_USER: 'user/SIGN_OUT_USER',

    UPDATE_NAME_USER: 'user/UPDATE_NAME_USER',

    ADD_FAILURE: 'user/ADD_FAILURE',

    FORGOT_PASSWORD_USER: 'user/FORGOT_PASSWORD_USER',

    UPDATE_USER_PASSWORD: 'user/UPDATE_USER_PASSWORD',

};

// Redux State

const initialState = {

    loading: false,
    currentUser: false,
    error: null,

};

// Reducers

export default function user(state = initialState, action) {

    switch(action.type) {

        case Types.LOGIN_USER:

          return {

            ...state,
            loading: true
        
          };

        case Types.LOGIN_USER_SUCCESS:

          return {

            ...state,
            currentUser: action.payload.user,
            loading: false
        
          };  

        case Types.SIGN_UP_USER:

          return {

            ...state,
            data: [...state.data, action.payload.routes],
            loading: false,
        
          };

        case Types.SIGN_OUT_USER:

          return {

            ...state,
            loading: true,
        
          };

        case Types.UPDATE_USER_NAME:

          return {

            ...state,
            loading: true,
        
          };

        case Types.ADD_FAILURE:
          
          return {

            ...state,
            error: action.payload.message

          }


        case Types.FORGOT_PASSWORD_USER:

          return {

            ...state,
            loading: true,
        
          };  

        case Types.UPDATE_USER_PASSWORD:

          return {

            ...state,
            loading: true,
        
          };  
  

        default:

          return state;    

    }

}

// Action Creators

export const Creators = {

    loginUser: credentials => ({

      type: Types.LOGIN_USER,
      payload: {

        credentials

        /* 
        
            O objeto credentials deve conter o e-mail e a senha do usuário 
        
            e-mail
            password
        
        */ 

      }

    }),

    loginUserSuccess: user => ({

        type: Types.LOGIN_USER_SUCCESS,
        payload: {

            user

            /*
            
                O objeto de user terá que conter o ID do usuário e o seu E-mail

                e-mail
                id
                token
            
            */

        }

    }),

    signUpUser: userInformation => ({

      type: Types.SIGN_UP_USER,
      payload: {

        /*
        
            O userInformation deve conter o nome do usuário o seu E-mail  e a sua senha

            name
            e-mail
            password
        
        */

        userInformation

      }

    }),

    signOutuser: () => ({

      type: Types.SIGN_OUT_USER
  
    }),

    updateNameUser: name => ({

      type: Types.UPDATE_NAME_USER,
      payload: {
          
        name

      }

    }),

    addError: message => ({

      type: Types.ADD_FAILURE,
      payload: {

        message,

      }

    }),

    forgotPasswordUser: email => ({

      type: Types.FORGOT_PASSWORD_USER,
      payload: {

        email

      }

    }),

    updateUserPassword: userInformation => ({

      type: Types.UPDATE_USER_PASSWORD,
      payload: {

        /*
        
            O userInformation deve conter o email do usuário, sua nova senha e o token
            que ele recebeu no e-mail quando clicou que esqueceu a senha e colocou o seu e-mail

            email
            password
            token
        
        */

        userInformation

       }
    
    }),

}