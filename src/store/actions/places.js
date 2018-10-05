import { ADD_PLACE, DELETE_PLACE, SELECT_PLACE, DESELECT_PLACE } from './actionTypes';
import { FIREBASE_ADDPLACE, FIREBASE_ADDIMAGE_FX } from 'react-native-dotenv';
import { uiStartLoading, uiStopLoading } from './index';

// ACTION CREATORS > RETURN AN OBJECT
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
      alert("Something went wrong, please try again!");
      dispatch(uiStopLoading());
    })
    .then(res => res.json())
    .then(parsedRes => {
      // If initial POST is successful, POST the additional place properties to Database
      const placeData = {
        name: placeName,
        location: location,
        image: parsedRes.imageUrl
      };
      return fetch(FIREBASE_ADDPLACE, {
        method: "POST",
        body: JSON.stringify(placeData)
      })
    })
    .catch(err => {
      console.log("Places - Second Fetch Error: ", err);
      alert("Something went wrong, please try again!");
      dispatch(uiStopLoading());
    })
    .then(res => res.json())
    .then(parsedRes => {
      console.log("SECOND PROMISE PARSED RESPONSE: ", parsedRes);
      dispatch(uiStopLoading());
    });
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