import {ThemeContext} from 'providers/ThemeProvider/ThemeProvider';
import React, {useContext, useMemo, useCallback} from 'react';
import {ActivityIndicator, Image, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {
  getCityWeather,
  getIsWeatherLoading,
  getWeather,
} from 'store/root/selectors';
import {IDayItem, IHourItem} from 'types';
import {styles} from './styles';

const ICON_URL = 'https://openweathermap.org/img/wn';

const Weather = () => {
  const weather = useSelector(getWeather);
  const isLoading = useSelector(getIsWeatherLoading);
  const city = useSelector(getCityWeather);
  const {theme} = useContext(ThemeContext);

  const themeStyles = useMemo(
    () => ({
      containerItem: [styles.containerItem, {borderColor: theme.SECONDARY}],
      textDescription: [styles.textDescription, {color: theme.SECONDARY}],
      textCity: [styles.textCity, {color: theme.SECONDARY}],
      textTemp: [styles.textTemp, {color: theme.SECONDARY}],
    }),
    [theme],
  );

  const renderDayItem = useCallback(
    (item: IDayItem) => (
      <View style={themeStyles.containerItem} key={item.forecastDay}>
        <Text style={themeStyles.textDescription}>
          in {item.forecastDay} day{item.forecastDay > 1 ? 's' : ''}
        </Text>
        <Text style={themeStyles.textDescription}>
          {item.main} | {item.description}
        </Text>
        <Text style={themeStyles.textDescription}>
          min: {Math.round(item.temp.min) + '°C\n'}max:{' '}
          {Math.round(item.temp.max)}°C
        </Text>
      </View>
    ),
    [themeStyles],
  );

  const renderHourItem = useCallback(
    (item: IHourItem) => (
      <View style={themeStyles.containerItem} key={item.forecastHour}>
        <Text style={themeStyles.textDescription}>
          in {item.forecastHour} hour{item.forecastHour > 1 ? 's' : ''}
        </Text>
        <Text style={themeStyles.textDescription}>
          {item.main} | {item.description}
        </Text>
        <Text style={themeStyles.textDescription}>
          {Math.round(item.temp)}°C
        </Text>
      </View>
    ),
    [themeStyles],
  );

  if (!weather) {
    return null;
  }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size={'large'} color={theme.SECONDARY} />
      ) : (
        <>
          <Text style={themeStyles.textCity}>{city}</Text>
          <Image
            source={{uri: `${ICON_URL}/${weather.current.icon}@4x.png`}}
            style={styles.icon}
          />
          <Text style={themeStyles.textTemp}>
            Temperature: {Math.round(weather.current.temp)}°C
          </Text>
          <Text style={themeStyles.textTemp}>
            Feels like: {Math.round(weather.current.feels_like)}°C
          </Text>
          {weather.hourly.map(renderHourItem)}
          {weather.daily.map(renderDayItem)}
        </>
      )}
    </View>
  );
};

export default Weather;
