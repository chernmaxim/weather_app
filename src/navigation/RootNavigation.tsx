import React, {useContext, useMemo} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SettingsScreen from 'screens/SettingsScreen';
import HomeScreen from 'screens/HomeScreen';
import {Screens} from './types';
import {ThemeContext} from 'providers/ThemeProvider/ThemeProvider';

const Stack = createStackNavigator();

const RootNavigation = () => {
  const {theme} = useContext(ThemeContext);

  const screenOptions = useMemo(
    () => ({
      headerStyle: {backgroundColor: theme.PRIMARY},
      headerTintColor: theme.SECONDARY,
    }),
    [theme],
  );

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
          name={Screens.Home}
          component={HomeScreen}
          options={{headerTitle: 'Home'}}
        />
        <Stack.Screen
          name={Screens.Settings}
          component={SettingsScreen}
          options={{headerTitle: 'Settings'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
