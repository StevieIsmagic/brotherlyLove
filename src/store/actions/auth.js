import { TRY_AUTH } from './actionTypes';
import { AUTH_API_KEY } from 'react-native-dotenv';
 
export const tryAuth = authData => {
  return {
    type: TRY_AUTH,
    authData: authData
  }
}

export const authSignUp = authData => {
  return dispatch => {
    fetch("https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=[AUTH_API_KEY]")
  }
}

