import {ITheme} from 'types';

export const PRIMARY = '#FFF';
export const GRAY = '#FDFCFC';
export const SECONDARY = '#000';
export const RED = '#FF5A2D';

export const LIGHT_THEME: ITheme = {
  PRIMARY,
  SECONDARY,
  GRAY,
};

export const DARK_THEME: ITheme = {
  PRIMARY: SECONDARY,
  SECONDARY: PRIMARY,
  GRAY,
};
