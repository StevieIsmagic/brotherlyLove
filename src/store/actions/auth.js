import { TRY_AUTH } from './actionTypes';
import { AUTH_API_KEY } from 'react-native-dotenv';
 
export const tryAuth = authData => {
  return dispatch => {
    dispatch(authSignUp(authData));
  }
}

export const authSignUp = authData => {
  return dispatch => {
    fetch("https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" + AUTH_API_KEY, {
      method: "POST",
      body: JSON.stringify({
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .catch(err => {
      /* NOTE: fetch() only checks/returns network errors here 
      No 4xx / 5xx error codes. Check these in .then() */ 
      console.log('POST Request network errors', err);
      alert("Authentication Failed. Try Again =]");
    })
    .then(res => res.json())
    .then(parsedRes => {
      console.log("AUTH SUCCESS PARSED RES: ", parsedRes);
    })

  }
}

