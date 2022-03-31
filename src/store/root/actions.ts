import {
  apiGetCoordinatesByName,
  apiGetNameByCoordinates,
  apiGetWeather,
} from 'api';
import {ThunkDispatch} from 'redux-thunk';
import {AppState} from 'store';
import {Coordinates, LatLon} from 'types';
import parseWeather from 'utils/weather-parser.util';
import {ERootActionTypes, IUserLocation, IWeather, TRootActions} from './types';
import * as storage from 'utils/async-storage.util';

const setIsLoadingWeatherStart = (): TRootActions => ({
  type: ERootActionTypes.ROOT_WEATHER_LOADING_START,
});

const setIsLoadingWeatherFinish = (): TRootActions => ({
  type: ERootActionTypes.ROOT_WEATHER_LOADING_FINISH,
});

const setWeather = (weather: IWeather): TRootActions => ({
  type: ERootActionTypes.ROOT_SET_WEATHER,
  payload: weather,
});

const setCityWeather = (city: string): TRootActions => ({
  type: ERootActionTypes.ROOT_SET_CITY_WEATHER,
  payload: city,
});

const clearCityAndWeather = (): TRootActions => ({
  type: ERootActionTypes.ROOT_CLEAR_WEATHER_AND_CITY,
});

export const setUserLocation = (userLocation: IUserLocation): TRootActions => ({
  type: ERootActionTypes.ROOT_SET_USER_LOCATION,
  payload: userLocation,
});

export const setThresholdValue = (value: number): TRootActions => ({
  type: ERootActionTypes.ROOT_SET_THRESHOLD_VALUE,
  payload: value,
});

export const setAppMessageContent = (message: string): TRootActions => ({
  type: ERootActionTypes.ROOT_SET_APP_MESSAGE_CONTENT,
  payload: message,
});

export const getWeatherByName = (city: string) => {
  return async (dispatch: ThunkDispatch<AppState, null, TRootActions>) => {
    dispatch(setIsLoadingWeatherStart());
    try {
      const coordinates = await dispatch(getCoordinatesByName(city));

      if (coordinates) {
        dispatch(getWeather(coordinates, city));
      }
    } catch (e: any) {
      dispatch(clearCityAndWeather());
      dispatch(setAppMessageContent(e.toString()));
    }
  };
};

export const getWeather = (coordinates: LatLon, city: string) => {
  return async (dispatch: ThunkDispatch<AppState, null, TRootActions>) => {
    try {
      const response = await apiGetWeather(coordinates);
      const parsedWeather = parseWeather(response.data);

      dispatch(setCityWeather(city));
      dispatch(setWeather(parsedWeather));
    } catch (e: any) {
      dispatch(setAppMessageContent(e.toString()));
    } finally {
      dispatch(setIsLoadingWeatherFinish());
    }
  };
};

export const getCoordinatesByName = (city: string) => {
  return async (dispatch: ThunkDispatch<AppState, null, TRootActions>) => {
    try {
      const response = await apiGetCoordinatesByName(city);
      const coordinates = response.data?.[0];

      if (!coordinates) {
        throw Error('City was not found');
      }

      return coordinates;
    } catch (e: any) {
      dispatch(setAppMessageContent(e.toString()));
      dispatch(setIsLoadingWeatherFinish());
    }
  };
};

export const getNameByCoordinates = (coordinates: Coordinates) => {
  return async (dispatch: ThunkDispatch<AppState, null, TRootActions>) => {
    dispatch(setIsLoadingWeatherStart());
    try {
      const response = await apiGetNameByCoordinates(coordinates);
      const city = response.data?.[0];

      dispatch(
        getWeather(
          {lat: coordinates.latitude, lon: coordinates.longitude},
          city?.name || 'City was not found',
        ),
      );

      if (!city) {
        throw Error('City was not found');
      }

      const userLocation = {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        country: city.country,
        city: city.name,
      };

      dispatch(setUserLocation(userLocation));

      await storage.storeUserLocation(userLocation);
    } catch (e: any) {
      dispatch(setAppMessageContent(e.toString()));
      dispatch(setIsLoadingWeatherFinish());
    }
  };
};
