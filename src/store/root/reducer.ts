import produce from 'immer';
import {Reducer} from 'redux';
import {ERootActionTypes, IRootState, TRootActions} from './types';

const initialState: IRootState = {
  isWeatherLoading: false,
  weather: null,
  cityWeather: '',
  userLocation: null,
  thresholdValue: 0,
  appMessageContent: '',
};

const rootReducer: Reducer<IRootState, TRootActions> = (
  state = initialState,
  action,
) => {
  return produce(state, (draft: IRootState) => {
    switch (action.type) {
      case ERootActionTypes.ROOT_WEATHER_LOADING_START:
        draft.isWeatherLoading = true;
        return;

      case ERootActionTypes.ROOT_WEATHER_LOADING_FINISH:
        draft.isWeatherLoading = false;
        return;

      case ERootActionTypes.ROOT_SET_WEATHER:
        draft.weather = action.payload;
        return;

      case ERootActionTypes.ROOT_SET_CITY_WEATHER:
        draft.cityWeather = action.payload;
        return;

      case ERootActionTypes.ROOT_SET_USER_LOCATION:
        draft.userLocation = action.payload;
        return;

      case ERootActionTypes.ROOT_CLEAR_WEATHER_AND_CITY:
        draft.weather = null;
        draft.cityWeather = '';
        return;

      case ERootActionTypes.ROOT_SET_THRESHOLD_VALUE:
        draft.thresholdValue = action.payload;
        return;

      case ERootActionTypes.ROOT_SET_APP_MESSAGE_CONTENT:
        draft.appMessageContent = action.payload;
        return;

      default:
        return state;
    }
  });
};

export default rootReducer;
