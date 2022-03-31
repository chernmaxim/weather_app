import {IDailyTemp, LatLon} from 'types';

interface IWeatherResponseWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface INameByCoordinatesResponse extends LatLon {
  name: string;
  country: string;
}

export interface IWeatherResponseHourly {
  temp: number;
  weather: IWeatherResponseWeather[];
  feels_like: number;
}

export interface IWeatherResponseDaily {
  temp: IDailyTemp;
  weather: IWeatherResponseWeather[];
}

export interface IWeatherResponse {
  hourly: IWeatherResponseHourly[];
  daily: IWeatherResponseDaily[];
}

export interface ICoordinatesByNameResponse extends LatLon {
  name: string;
}
