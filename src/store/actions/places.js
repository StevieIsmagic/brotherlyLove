import { SET_PLACES, SELECT_PLACE, DESELECT_PLACE } from './actionTypes';
import { FIREBASE_PLACES_DB, FIREBASE_ADDIMAGE_FX } from 'react-native-dotenv';
import { uiStartLoading, uiStopLoading } from './index';

/* 
ACTION CREATORS > RETURN AN OBJECT
When returning ASYNC code, Use Redux-Thunk dispatch 
*/
export const addPlace = (placeName, location, image) => {
  return dispatch => {
    dispatch(uiStartLoading())
    // Upload Image to Firebase Storage via Firebase f(x)
    fetch(FIREBASE_ADDIMAGE_FX, {
      method: "POST",
      body: JSON.stringify({
        image: image.base64
      })
    })
    .catch(err => {
      console.log("Places - First Fetch Error: ", err);
      alert("Something went wrong =[ Please try again!");
      dispatch(uiStopLoading());
    })
    .then(res => res.json())
    .then(parsedRes => {
      // If initial Image POST is successful, POST the additional place properties to Database
      const placeData = {
        name: placeName,
        location: location,
        image: parsedRes.imageUrl
      };
      return fetch(FIREBASE_PLACES_DB, {
        method: "POST",
        body: JSON.stringify(placeData)
      })
    })
    .catch(err => {
      console.log("Places - Second Fetch Error: ", err);
      alert("Something went wrong =[ Please try again!");
      dispatch(uiStopLoading());
    })
    .then(res => res.json())
    .then(parsedRes => {
      console.log("SECOND PROMISE PARSED RESPONSE: ", parsedRes);
      dispatch(uiStopLoading());
    });
  };
};

export const getPlaces = () => {
// Reach out to Firebase backend and get places object
// Thunk dispatch returns a function
  return dispatch => {
    // insert uiStartLoading()
    fetch(FIREBASE_PLACES_DB)
    .catch(err => {
      console.log("Error while fetching places from Firebase DB: ", err)
      alert("Sorry =[ Something went wrong. Try again =]")
      // insert uiStopLoading()
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
          id: key
        });
      }
      console.log("AFTER PLACES LIST: ", places);
      dispatch(setPlaces(places));
    })
  }
};

export const setPlaces = places => {
  return {
    type: SET_PLACES,
    places: places
  };
};

export const deletePlace = (key) => {
  return {
    type: DELETE_PLACE,
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