import {useCallback, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {
  getNameByCoordinates,
  setThresholdValue,
  setUserLocation,
} from 'store/root/actions';
import {IUserLocation} from 'store/root/types';
import * as storage from 'utils/async-storage.util';
import checkLocationPermission from './location-permissions.effect';

const checkUserSettings = () => {
  const dispatch = useDispatch();

  const checkUserSettings = useCallback(async () => {
    // If thresholdValue is not exist we will get 0 as default value
    const thresholdValue = await storage.getUserThershold();
    dispatch(setThresholdValue(thresholdValue));

    const userLocation: IUserLocation | null = await storage.getUserLocation();
    // If userLocation is exist, we just store it to redux
    if (userLocation) {
      dispatch(
        getNameByCoordinates({
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
        }),
      );

      dispatch(setUserLocation(userLocation));
    } else {
      // Otherwise we check location permission
      checkLocationPermission();
    }
  }, [dispatch]);

  useEffect(() => {
    checkUserSettings();
  }, [checkUserSettings]);
};

export default checkUserSettings;
