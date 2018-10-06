import { TRY_AUTH } from './actionTypes';
import { AUTH_API_KEY } from 'react-native-dotenv';
import { uiStartLoading, uiStopLoading } from './index';
import startMainTabs from '../../screens/MainTabs/startMainTabs';
 
export const tryAuth = authData => {
  return dispatch => {
    dispatch(authSignUp(authData));
  }
}

export const authSignUp = authData => {
  return dispatch => {
    dispatch(uiStartLoading());
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
      dispatch(uiStopLoading());
    })
    .then(res => res.json())
    .then(parsedRes => {
      dispatch(uiStopLoading());
      if (parsedRes.error) {
        let errorMessage = parsedRes.error.message
        alert("LOGIN FAILURE:  " + errorMessage);
        console.log("Then Block - Error Object: ", parsedRes.error)
      } else {
        startMainTabs()
        console.log("AUTH SUCCESS PARSED RES: ", parsedRes);
      }
    })

  }
}

