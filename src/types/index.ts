import {IUserLocation} from 'store/root/types';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface LatLon {
  lat: number;
  lon: number;
}

export interface IDailyTemp {
  min: number;
  max: number;
}

export interface ITemplateItem {
  main: string;
  description: string;
  icon: string;
}

export interface IHourItem extends ITemplateItem {
  forecastHour: number;
  temp: number;
  feels_like: number;
}

export interface IDayItem extends ITemplateItem {
  temp: IDailyTemp;
  forecastDay: number;
}

export type TWeatherItem = 'day' | 'hour';

export interface ITheme {
  PRIMARY: string;
  SECONDARY: string;
  GRAY: string;
}

export interface IUserSettings extends IUserLocation {
  thresholdValue: number;
}

export enum EAsyncStorageKeys {
  USER_LOCATION = 'USER_LOCATION',
  USER_THRESHOLD = 'USER_THRESHOLD',
}
