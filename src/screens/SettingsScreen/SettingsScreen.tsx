import ChangeThreshold from 'components/ChangeThreshold';
import {ThemeContext} from 'providers/ThemeProvider/ThemeProvider';
import React, {useContext, useMemo} from 'react';
import {Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {getThresholdValue, getUserLocation} from 'store/root/selectors';
import {styles} from './styles';

const SettingsScreen = () => {
  const userLocation = useSelector(getUserLocation);
  const thresholdValue = useSelector(getThresholdValue);
  const {theme} = useContext(ThemeContext);

  const themeStyles = useMemo(
    () => ({
      containerPlaceholder: [
        styles.containerPlaceholder,
        {backgroundColor: theme.PRIMARY},
      ],
      container: [styles.container, {backgroundColor: theme.PRIMARY}],
      textLeft: [
        styles.textLeft,
        {
          color: theme.SECONDARY,
        },
      ],
      textRight: [
        styles.textRight,
        {
          color: theme.SECONDARY,
        },
      ],
    }),
    [theme],
  );

  if (!userLocation) {
    return (
      <View style={styles.containerPlaceholder}>
        <Text style={styles.textPlaceholder}>
          To see your settings, please allow access to your location
        </Text>
      </View>
    );
  }

  return (
    <View style={themeStyles.container}>
      <View style={styles.row}>
        <Text style={themeStyles.textLeft}>Home city:</Text>
        <Text style={themeStyles.textRight}>{userLocation?.city}</Text>
      </View>
      <View style={styles.row}>
        <Text style={themeStyles.textLeft}>Home country:</Text>
        <Text style={themeStyles.textRight}>{userLocation?.country}</Text>
      </View>
      <View style={styles.row}>
        <Text style={themeStyles.textLeft}>Home coordinates:</Text>
        <Text style={themeStyles.textRight}>
          lat: {userLocation?.latitude + '\n'}lon: {userLocation?.longitude}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={themeStyles.textLeft}>
          Threshold value(changing theme depends on this):
        </Text>
        <Text style={themeStyles.textRight}>{thresholdValue}</Text>
      </View>
      <ChangeThreshold />
    </View>
  );
};

export default SettingsScreen;
