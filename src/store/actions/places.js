import { START_ADD_PLACE, SET_PLACES, REMOVE_PLACE, PLACE_ADDED, SELECT_PLACE, DESELECT_PLACE } from './actionTypes';
import { FIREBASE_PLACES_DB, FIREBASE_PLACES_DB_SPLICED, FIREBASE_ADDIMAGE_FX } from 'react-native-dotenv';
import { uiStartLoading, uiStopLoading, authGetToken } from './index';

/* 
ACTION CREATORS > RETURN AN OBJECT
When returning ASYNC code, Use Redux-Thunk dispatch 
*/
export const startAddPlace = () => {
  return {
    type: START_ADD_PLACE
  };
};

export const addPlace = (placeName, location, image) => {
  return dispatch => {
    let authToken;
    dispatch(uiStartLoading());
    dispatch(authGetToken())
      .catch(err => {
        alert("No valid token found when adding place.");
      })
      .then(token => {
        authToken = token;
        return fetch(FIREBASE_ADDIMAGE_FX, 
          {
            method: "POST",
            body: JSON.stringify({
              image: image.base64
            }),
            headers: {
              "Authorization": "Bearer " + authToken
            }
          }
        )
      })
      .catch(err => {
        console.log("Places - First Fetch Error: ", err);
        alert("Something went wrong =[ Please try again!");
        dispatch(uiStopLoading());
      })
    // Upload Image to Firebase Storage via Firebase f(x)
    .then(res => res.json())
    .then(parsedRes => {
      // If initial Image POST is successful, POST the additional place properties to Database
      const placeData = {
        name: placeName,
        location: location,
        image: parsedRes.imageUrl
      };
      return fetch(FIREBASE_PLACES_DB + authToken, {
        method: "POST",
        body: JSON.stringify(placeData)
      })
    })
    .then(res => res.json())
    .then(parsedRes => {
      console.log("SECOND PROMISE PARSED RESPONSE: ", parsedRes);
      dispatch(uiStopLoading());
      dispatch(placeAdded());
    })
    .catch(err => {
      console.log("Places - Second Fetch Error: ", err);
      alert("Something went wrong =[ Please try again!");
      dispatch(uiStopLoading());
    });
  };
};

export const placeAdded = () => {
  return {
    type: PLACE_ADDED
  };
};

export const getPlaces = () => {
// Reach out to Firebase backend and get places object
// Thunk dispatch returns a function
  return dispatch => {
    dispatch(authGetToken())
      .then(token => {
        return fetch(FIREBASE_PLACES_DB + token)
      })
      .catch(() => {
        alert("No Valid Token Found!");
      })
    .then(res => res.json())
    .then(parsedRes => {
      console.log("PARSE RES PLACES LIST: ", parsedRes);
      const places = [];
      for (let key in parsedRes) {
        places.push({
          ...parsedRes[key],
          image: {
            uri: parsedRes[key].image
          },
          key: key
        });
      }
      console.log("getPlaces Action PLACES LIST: ", places);
      dispatch(setPlaces(places));
    })
    .catch(err => {
      console.log("Error while fetching places from Firebase DB: ", err)
      alert("Sorry =[ Something went wrong while fetching places. Try again =]")
      // insert uiStopLoading()
    })
  };
};

export const setPlaces = places => {
  return {
    type: SET_PLACES,
    places: places
  };
};

export const deletePlace = key => {
  // dispatch allows us to run async code
  return dispatch => {
    /*
    NOTE: dispatch(removePlace()) deletes place from redux store before the fetch(DELETE) call.
    Consider what may happen if the client removal succeeds + server removal fails.
    We will then have an out of sync frontend store. Maybe make copy of place and if catch
    block is entered, add place back to store. 
    */
   dispatch(authGetToken())
    .catch(() => {
     alert("No valid token found when deleting.");
    })
    .then(token => {
      const deleteID = FIREBASE_PLACES_DB_SPLICED + key + ".json?auth=" + token;
      dispatch(removePlace(key));
      return fetch(
        deleteID, 
        {
        method: "DELETE",
        }
      )
    })
    .then(res => res.json())
    .then(parsedRes => {
      console.log("Successfully deleted from Firebase DB!", parsedRes);
    })
    .catch(err => {
      console.log("Error when deleting Place", err);
      alert("Sorry, something went wrong =[ try again!");
    });
  };
};

export const removePlace = key => {
  return {
    type: REMOVE_PLACE,
    placeKey: key
  };
};

// These two actions may not be needed
// We will use a different approach
export const selectPlace = (key) => {
  return {
    type: SELECT_PLACE,
    placeKey: key
  };
};

export const deselectPlace = () => {
  return {
    type: DESELECT_PLACE
  }
}