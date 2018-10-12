import { AsyncStorage } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { TRY_AUTH, AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN } from './actionTypes';
import { AUTH_API_KEY } from 'react-native-dotenv';
import { uiStartLoading, uiStopLoading } from './index';
import startMainTabs from '../../screens/MainTabs/startMainTabs';
import App from '../../../App';
 
export const tryAuth = (authData, authMode) => {
  return dispatch => {
    dispatch(uiStartLoading());
    let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" + AUTH_API_KEY;
  
    if (authMode === "signup") {
      url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" + AUTH_API_KEY;
    } 
    fetch(
      url, 
      {
        method: "POST",
        body: JSON.stringify({
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    .catch(err => {
      /* NOTE: fetch() only checks/returns network errors here 
      No 4xx / 5xx error codes. Check these in .then() */ 
      console.log('POST Request network errors', err);
      alert("Authentication Failed. Try Again =]");
      dispatch(uiStopLoading());
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw (new Error());
      }
    })
    .then(parsedRes => {
      dispatch(uiStopLoading());
      if (!parsedRes.idToken) {
        let errorMessage = parsedRes.error.message;
        
        alert("LOGIN FAILURE:  " + errorMessage);
        console.log("Then Block - Error Object: ", parsedRes.error)
      } else {
        dispatch(authStoreToken(parsedRes.idToken, parsedRes.expiresIn, parsedRes.refreshToken))
        startMainTabs()
        console.log("AUTH SUCCESS PARSED RES: ", parsedRes);
      }
    })
  }
};

export const authStoreToken = (token, expiresIn, refreshToken) => {
  return dispatch => {
    const now = new Date();
    const expiryDate = now.getTime() + expiresIn * 1000;
    dispatch(authSetToken(token, expiryDate));
    console.log("TOKEN EXPIRATION:", now, new Date(expiryDate)); 
    AsyncStorage.setItem("brotherlyLove:auth:token", token);
    // AsyncStorage.setItem("brotherlyLove:auth:expiryDate", expiryDate.toString());
    AsyncStorage.setItem("brotherlyLove:auth:refreshToken", refreshToken);
  }
};

export const authSetToken = (token, expiryDate) => {
  return {
    type: AUTH_SET_TOKEN,
    token: token,
    expiryDate: expiryDate
  };
};

export const authGetToken = () => {
  return (dispatch, getState) => {
    const promise = new Promise((resolve, reject) => {
      const token = getState().auth.token;
      const expiryDate = getState().auth.expiryDate;
      if (!token || new Date(expiryDate) <= new Date()) {
        let fetchedToken;
        AsyncStorage.getItem("brotherlyLove:auth:token")
          .catch(err => reject())
          .then(tokenFromStorage => {
            fetchedToken = tokenFromStorage;
            if (!tokenFromStorage) {
              reject();
              return;
            }
            return AsyncStorage.getItem("brotherlyLove:auth:expiryDate");
          })
          .then(expiryDate => {
            const parsedExpiryDate = new Date(parseInt(expiryDate));
            const now = new Date();
            if (parsedExpiryDate > now) {
              dispatch(authSetToken(fetchedToken));
              resolve(fetchedToken);
            } else {
                reject();
            }
          })
          .catch(err => reject())
      } else {
        resolve(token);
      }
    });
    return promise
      .catch(err => {
        return AsyncStorage.getItem("brotherlyLove:auth:refreshToken")
        .then(refreshToken => {
          return fetch("https://securetoken.googleapis.com/v1/token?key=" + AUTH_API_KEY,{
            method: "POST",
            headers: {
              "Content-Type" : "application/x-www-form-urlencoded"
            },
            body: "grant_type=refresh_token&refresh_token=" + refreshToken
          });
        })
        .then(res => {
          if (res.ok) {
            return res.json();
          } else {
            throw (new Error());
          }
        })
        .then(parsedRes => {
          if (parsedRes.id_token) {
            console.log("Refresh token worked.");
            dispatch(
              authStoreToken(
                parsedRes.id_token, 
                parsedRes.expires_in, 
                parsedRes.refresh_token
              )
            );
            return parsedRes.id_token;
          } else {
            dispatch(authClearStorage());
          }
        });
    })
    .then(token => {
      if (!token) {
        throw(new Error());
      } else {
        return token;
      }
    });
  };
};

export const authAutoSignIn = () => {
  return dispatch => {
    dispatch(authGetToken())
    .then(token => {
      startMainTabs();
    })
    .catch(err => console.log("Faild to fetch token for reSignIn!"));
  };
};

export const authClearStorage = () => {
  return dispatch => {
    AsyncStorage.removeItem("brotherlyLove:auth:token");
    AsyncStorage.removeItem("brotherlyLove:auth:expiryDate");
    return AsyncStorage.removeItem("brotherlyLove:auth:refreshToken");
  };
};

export const authLogout = () => {
  return dispatch => {
    dispatch(authClearStorage())
      .then(() => {
        Navigation.startSingleScreenApp({
          screen: {
            screen: 'brotherlylove.AuthScreen',
            title: 'Login'
          }
        });
      });
    dispatch(authRemoveToken());
  };
};

export const authRemoveToken = () => {
  return {
    type: AUTH_REMOVE_TOKEN
  };
};
