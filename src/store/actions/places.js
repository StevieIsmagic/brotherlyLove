import { ADD_PLACE, DELETE_PLACE, SELECT_PLACE, DESELECT_PLACE } from './actionTypes';
import { FIREBASE_ADDPLACE, FIREBASE_ADDIMAGE } from 'react-native-dotenv';

// ACTION CREATORS > RETURN AN OBJECT
export const addPlace = (placeName, location, image) => {
  return dispatch => {
    // Upload Image
    fetch(FIREBASE_ADDIMAGE, {
      method: "POST",
      body: JSON.stringify({
        image: image.base64
      })
    })
    .catch(err => console.log("Places Error: ", err))
    .then(res => {
      console.log("RESSSSSAAAA: ", res.json())
      // res.json()
      
    })
    .then(parsedRes => {
      console.log("PARSED RES FIRST PROMISE: ", parsedRes);
      //If initial POST is successful, post additional place properties
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
    .catch(err => console.log("SECOND PROMISE ERR: ", err))
    .then(res => res.json())
    .then(parsedRes => {
      console.log("PARSED RESPONSE: ", parsedRes);
    });
  };
};


  // return {
  //   type: ADD_PLACE,
  //   placeName: placeName,
  //   location: location,
  //   image: image
  // };

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