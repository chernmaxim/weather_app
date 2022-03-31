import {ThunkDispatch} from 'redux-thunk';
import store, {AppState} from 'store';
import {getNameByCoordinates} from 'store/root/actions';
import {TRootActions} from 'store/root/types';
import {Coordinates} from 'types';
import {getCurrentPosition, getPermissionLocation} from 'utils/location';

const getWeatherByCoordinates = async (coordinates?: Coordinates) => {
  const dispatch = store.dispatch as ThunkDispatch<
    AppState,
    null,
    TRootActions
  >;

  if (!coordinates) {
    const resultCoordinates = await getCurrentPosition();
    dispatch(getNameByCoordinates(resultCoordinates));
    return;
  }

  dispatch(getNameByCoordinates(coordinates));
};

const checkLocationPermission = async () => {
  const isSuccess = await getPermissionLocation();

  if (isSuccess) {
    /* If we have permission to the location then 
      we just find city name by coordinates and then 
      fetch weather data by using this name */
    getWeatherByCoordinates();
  }
};

export default checkLocationPermission;
