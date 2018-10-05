import { UI_START_LOADING, UI_STOP_LOADING } from './actionTypes';

//Action Creators return an Action Object
export default uiStartLoading = () => {
  return {
    type: UI_START_LOADING
  }
};

export default uiStopLoading = () => {
  return {
    type: UI_STOP_LOADING
  }
};