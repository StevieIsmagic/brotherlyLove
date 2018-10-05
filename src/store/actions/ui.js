import { UI_START_LOADING, UI_STOP_LOADING } from './actionTypes';

//Action Creators return an Action Object
export const uiStartLoading = () => {
  return {
    type: UI_START_LOADING
  }
};

export const uiStopLoading = () => {
  return {
    type: UI_STOP_LOADING
  }
};