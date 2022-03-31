import {
  IWeatherResponse,
  IWeatherResponseDaily,
  IWeatherResponseHourly,
} from 'api/types';
import {IWeather} from 'store/root/types';
import {IDayItem, IHourItem} from 'types';

const parseDay = (day: IWeatherResponseDaily, forecastDay: number) => {
  let parsedDay: IDayItem = {
    temp: {min: 0, max: 0},
    main: '',
    description: '',
    icon: '',
    forecastDay,
  };

  const weather = day?.weather[0];

  if (weather) {
    parsedDay.temp.max = day.temp.max;
    parsedDay.temp.min = day.temp.min;
    parsedDay.main = weather.main;
    parsedDay.description = weather.description;
    parsedDay.icon = weather.icon;
  }

  return parsedDay;
};

const parseHour = (hour: IWeatherResponseHourly, forecastHour: number) => {
  let parsedHour: IHourItem = {
    temp: 0,
    feels_like: 0,
    main: '',
    description: '',
    icon: '',
    forecastHour,
  };

  const weather = hour?.weather?.[0];

  if (weather) {
    parsedHour.temp = hour.temp;
    parsedHour.feels_like = hour.feels_like;
    parsedHour.main = weather.main;
    parsedHour.description = weather.description;
    parsedHour.icon = weather.icon;
  }

  return parsedHour;
};

const parseWeather = (weatherResponse: IWeatherResponse): IWeather => {
  const {daily, hourly} = weatherResponse;
  const parsedWeather: IWeather = {
    current: parseHour(hourly?.[0], 0),
    hourly: [parseHour(hourly?.[1], 1)],
    daily: [parseDay(daily?.[2], 2), parseDay(daily?.[7], 7)]
  };

  return parsedWeather;
};

export default parseWeather;
