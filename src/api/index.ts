import {AxiosPromise} from 'axios';
import {Coordinates, LatLon} from 'types';
import apiAddresses from './api-addresses';
import {apiRequest} from './axios';
import {
  ICoordinatesByNameResponse,
  INameByCoordinatesResponse,
  IWeatherResponse,
} from './types';

export const apiGetWeather = (
  coordinates: LatLon,
): AxiosPromise<IWeatherResponse> => {
  return apiRequest(apiAddresses.WEATHER(coordinates), {method: 'GET'});
};

export const apiGetCoordinatesByName = (
  city: string,
): AxiosPromise<ICoordinatesByNameResponse[]> => {
  return apiRequest(apiAddresses.GET_COORDINATES_BY_NAME(city), {
    method: 'GET',
  });
};

export const apiGetNameByCoordinates = (
  coordinates: Coordinates,
): AxiosPromise<INameByCoordinatesResponse[]> => {
  return apiRequest(apiAddresses.GET_NAME_BY_COORDINATES(coordinates), {
    method: 'GET',
  });
};
