import { ADD_PLACE, DELETE_PLACE, SELECT_PLACE, DESELECT_PLACE } from './actionTypes';

// ACTION CREATORS > RETURN AN OBJECT
export const addPlace = (placeName, location) => {
  return {
    type: ADD_PLACE,
    placeName: placeName,
    location: location
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