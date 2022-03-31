import AsyncStorage from '@react-native-async-storage/async-storage';
import {IUserLocation} from 'store/root/types';
import {EAsyncStorageKeys, IUserSettings} from 'types';

export const storeUserLocation = async (userLocation: IUserLocation) => {
  try {
    await AsyncStorage.setItem(
      EAsyncStorageKeys.USER_LOCATION,
      JSON.stringify(userLocation),
    );
  } catch (e) {
    console.log('Error storeUserLocation');
  }
};

export const storeUserThreshold = async (thresholdValue: number) => {
  try {
    await AsyncStorage.setItem(
      EAsyncStorageKeys.USER_THRESHOLD,
      JSON.stringify(thresholdValue),
    );
  } catch (e) {
    console.log('Error storeUserThreshold');
  }
};

export const getUserLocation = async (): Promise<IUserLocation | null> => {
  try {
    const userLocation = await AsyncStorage.getItem(
      EAsyncStorageKeys.USER_LOCATION,
    );
    if (userLocation !== null) {
      return JSON.parse(userLocation) as IUserSettings;
    }

    return null;
  } catch (e) {
    console.log('Error getUserLocation');
    return null;
  }
};

export const getUserThershold = async (): Promise<number> => {
  try {
    const thresholdValue = await AsyncStorage.getItem(
      EAsyncStorageKeys.USER_THRESHOLD,
    );
    if (thresholdValue !== null) {
      return +thresholdValue as number;
    }

    return 0;
  } catch (e) {
    console.log('Error getUserThershold');
    return 0;
  }
};
