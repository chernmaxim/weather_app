import {Coordinates, LatLon} from 'types';

export default {
  WEATHER: ({lat, lon}: LatLon) =>
    `data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,alerts&units=metric`,
  GET_COORDINATES_BY_NAME: (city: string) => `geo/1.0/direct?q=${city}&limit=1`,
  GET_NAME_BY_COORDINATES: ({latitude, longitude}: Coordinates) =>
    `geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1`,
};
