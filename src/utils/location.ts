import {Alert, Linking, PermissionsAndroid} from 'react-native';
import Geolocation, {
  GeoError,
  GeoOptions,
  GeoPosition,
} from 'react-native-geolocation-service';
import {Coordinates} from 'types';
import {IS_IOS} from './constants';

const options: GeoOptions = {
  accuracy: {
    android: 'high',
    ios: 'bestForNavigation',
  },
  enableHighAccuracy: true,
  distanceFilter: 0,
  showLocationDialog: true, // Android only
  forceRequestLocation: false, // Android only
  timeout: 15000,
  maximumAge: 10000,
};

const deniedResultHandler = () => {
  Alert.alert('Turn on Location services for Weatherapp', '', [
    {text: 'Cancel', style: 'cancel'},
    {text: 'Settings', onPress: () => Linking.openSettings()},
  ]);
};

export const getPermissionLocation = async (): Promise<boolean> => {
  if (IS_IOS) {
    const result = await Geolocation.requestAuthorization('whenInUse');
    if (result === 'granted') {
      return true;
    } else {
      deniedResultHandler();
    }
  } else {
    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Example App',
        message: 'Example App access to your location ',
        buttonPositive: 'OK',
      },
    );
    if (result === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      deniedResultHandler();
    }
  }
  return false;
};

export const getCurrentPosition = (): Promise<Coordinates> => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position: GeoPosition) => {
        const {latitude, longitude} = position.coords;
        resolve({latitude, longitude});
      },
      (error: GeoError) => {
        reject(error);
      },
      options,
    );
  });
};
