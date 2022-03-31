import {useNavigation} from '@react-navigation/native';
import PlaceSearchInput from 'components/PlaceSearchInput';
import Weather from 'components/Weather';
import checkUserSettings from 'effects/user-settings.effect';
import {Screens} from 'navigation/types';
import {ThemeContext} from 'providers/ThemeProvider/ThemeProvider';
import React, {useMemo, useContext, useCallback} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';

const HomeScreen = () => {
  const navigation = useNavigation();
  const {theme} = useContext(ThemeContext);

  checkUserSettings();

  const navigateToSettings = useCallback(() => {
    navigation.navigate(Screens.Settings as never);
  }, [navigation]);

  const themeStyles = useMemo(
    () => ({
      container: [styles.container, {backgroundColor: theme.PRIMARY}],
      text: {
        color: theme.SECONDARY,
      },
      containerSettings: [
        styles.containerSettings,
        {borderColor: theme.SECONDARY},
      ],
    }),
    [theme],
  );

  return (
    <ScrollView style={themeStyles.container}>
      <View style={styles.containerTop}>
        <PlaceSearchInput style={styles.containerInput} />
        <TouchableOpacity
          style={themeStyles.containerSettings}
          onPress={navigateToSettings}>
          <Text style={themeStyles.text}>Settings</Text>
        </TouchableOpacity>
      </View>
      <Weather />
    </ScrollView>
  );
};

export default HomeScreen;
