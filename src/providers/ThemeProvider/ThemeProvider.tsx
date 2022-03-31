import React, {useState, useEffect, useCallback, createContext} from 'react';
import {useSelector} from 'react-redux';
import {getCurrentTemperature, getThresholdValue} from 'store/root/selectors';
import {DARK_THEME, LIGHT_THEME} from 'styles/colors';
import {ITheme} from 'types';

interface Props {
  children: any;
}

interface IThemeContext {
  theme: ITheme;
  changeTheme(): void;
}

export const ThemeContext = createContext<IThemeContext>({
  theme: LIGHT_THEME,
  changeTheme: () => {},
});

const ThemeProvider = ({children}: Props): React.ReactElement => {
  const [theme, setTheme] = useState<ITheme>(LIGHT_THEME);
  const currentTemperature = useSelector(getCurrentTemperature);
  const thresholdValue = useSelector(getThresholdValue);

  const changeTheme = useCallback(() => {
    setTheme(prev =>
      prev.PRIMARY === LIGHT_THEME.PRIMARY ? DARK_THEME : LIGHT_THEME,
    );
  }, [setTheme]);

  useEffect(() => {
    if (currentTemperature) {
      if (
        currentTemperature > thresholdValue &&
        theme.PRIMARY !== LIGHT_THEME.PRIMARY
      ) {
        changeTheme();
      } else if (
        currentTemperature <= thresholdValue &&
        theme.PRIMARY !== DARK_THEME.PRIMARY
      ) {
        changeTheme();
      }
    }
  }, [currentTemperature, changeTheme, theme, thresholdValue]);

  return (
    <ThemeContext.Provider value={{theme, changeTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
