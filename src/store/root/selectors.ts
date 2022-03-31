import {AppState} from '..';
import {IUserLocation, IWeather} from './types';

export const getIsWeatherLoading = (state: AppState): boolean =>
  state.isWeatherLoading;

export const getWeather = (state: AppState): IWeather | null => state.weather;

export const getCityWeather = (state: AppState): string => state.cityWeather;

export const getUserLocation = (state: AppState): IUserLocation | null =>
  state.userLocation;

export const getThresholdValue = (state: AppState): number =>
  state.thresholdValue;

export const getAppMessageContent = (state: AppState): string =>
  state.appMessageContent;

export const getCurrentTemperature = (state: AppState): number | null =>
  state.weather?.current.temp || null;
