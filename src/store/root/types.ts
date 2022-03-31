import {IDayItem, IHourItem} from 'types';

export interface IWeather {
  current: IHourItem;
  hourly: IHourItem[];
  daily: IDayItem[];
}

export interface IUserLocation {
  latitude: number;
  longitude: number;
  city: string;
  country: string;
}

export interface IRootState {
  isWeatherLoading: boolean;
  weather: IWeather | null;
  cityWeather: string;
  userLocation: IUserLocation | null;
  thresholdValue: number;
  appMessageContent: string;
}

export enum ERootActionTypes {
  ROOT_WEATHER_LOADING_START = 'ROOT_WEATHER_LOADING_START',
  ROOT_WEATHER_LOADING_FINISH = 'ROOT_WEATHER_LOADING_FINISH',
  ROOT_SET_WEATHER = 'ROOT_SET_WEATHER',
  ROOT_SET_CITY_WEATHER = 'ROOT_SET_CITY_WEATHER',
  ROOT_SET_USER_LOCATION = 'ROOT_SET_USER_LOCATION',
  ROOT_CLEAR_WEATHER_AND_CITY = 'ROOT_CLEAR_WEATHER_AND_CITY',
  ROOT_SET_THRESHOLD_VALUE = 'ROOT_SET_THRESHOLD_VALUE',
  ROOT_SET_APP_MESSAGE_CONTENT = 'ROOT_SET_APP_MESSAGE_CONTENT',
}

interface IRootWeatherLoadingStart {
  type: ERootActionTypes.ROOT_WEATHER_LOADING_START;
}

interface IRootWeatherLoadingFinish {
  type: ERootActionTypes.ROOT_WEATHER_LOADING_FINISH;
}

interface IRootSetWeather {
  type: ERootActionTypes.ROOT_SET_WEATHER;
  payload: IWeather;
}

interface IRootSetCityWeather {
  type: ERootActionTypes.ROOT_SET_CITY_WEATHER;
  payload: string;
}

interface IRootClearCityAndWeather {
  type: ERootActionTypes.ROOT_CLEAR_WEATHER_AND_CITY;
}

interface IRootSetUserLocation {
  type: ERootActionTypes.ROOT_SET_USER_LOCATION;
  payload: IUserLocation;
}

interface IRootSetThresholdValue {
  type: ERootActionTypes.ROOT_SET_THRESHOLD_VALUE;
  payload: number;
}

interface IRootSetAppMessageContent {
  type: ERootActionTypes.ROOT_SET_APP_MESSAGE_CONTENT;
  payload: string;
}

export type TRootActions =
  | IRootWeatherLoadingStart
  | IRootWeatherLoadingFinish
  | IRootSetWeather
  | IRootSetCityWeather
  | IRootClearCityAndWeather
  | IRootSetUserLocation
  | IRootSetThresholdValue
  | IRootSetAppMessageContent;
