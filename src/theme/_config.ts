import { DarkTheme, DefaultTheme } from '@react-navigation/native';

import type { ThemeConfiguration } from '@/types/theme/config';
import { Platform } from 'react-native';
const colorsLight = {
  black: '#000000',
  error: '#FF0000',
  primary: '#FE434E',
  primary3: '#ff8f95',
  primary04: '#FE434E1A',
  red500: '#C13333',
  gray800: '#303030',
  gray500: '#4A4B4E', // Forget Password color
  gray400: '#4D4D4D',
  gray300: '#6A707C', // password eye icon
  gray250: '#8391A1', // Or text
  gray200: '#A1A1A1',
  gray180: '#ABABAC',
  gray150: '#DEDEDE', // Input Border
  gray100: '#DFDFDF',
  gray70: '#E8ECF4', // or lines
  gray50: '#EFEFEF',
  gray30: '#FAFAFA', // Input Background
  gray00: '#FFFFFF',
  blue500: '#671DF2',
  purple500: '#44427D',
  purple100: '#E1E1EF',
  purple50: '#1B1A23',
} as const;

const colorsDark = {
  black: '#ffffff',
  error: '#FF0000',
  primary: '#FE434E',
  primary3: '#ff8f95',
  primary04: '#FE434E1A',
  red500: '#C13333',
  gray800: '#E0E0E0',
  gray500: '#4A4B4E', // Forget Password color
  gray400: '#969696',
  gray300: '#6A707C', // password eye icon
  gray250: '#8391A1', // Or text
  gray200: '#BABABA',
  gray180: '#ABABAC',
  gray_150: '#DEDEDE', // input border
  gray100: '#000000',
  gray70: '#E8ECF4', // or lines
  gray50: '#EFEFEF',
  gray30: '#FAFAFA',
  gray00: '#000000',
  blue500: '#671DF2',
  purple500: '#A6A4F0',
  purple100: '#252732',
  purple50: '#1B1A23',
} as const;

const sizes = [4, 6, 8, 10, 12, 14, 16, 24, 32, 40, 80] as const;

export const fontFamily = {
  _900_Black: {
    fontFamily: 'Poppins Black',
  },
  Black_italic: {
    fontFamily: 'Poppins Black Italic',
  },
  _700_Bold: {
    fontFamily: 'Poppins Bold',
  },
  Bold_Italic: {
    fontFamily: 'Poppins Bold Italic',
  },
  _800_Extra_Bold: {
    fontFamily: 'Poppins ExtraBold',
  },
  Extra_Bold_Italic: {
    fontFamily: 'Poppins ExtraBold Italic',
  },
  _200_Extra_Light: {
    fontFamily: 'Poppins ExtraLight',
  },
  Extra_Light_Italic: {
    fontFamily: 'Poppins ExtraLight Italic',
  },
  Italic: {
    fontFamily: 'Poppins Italic',
  },
  _300_Light: {
    fontFamily: 'Poppins Light',
  },
  Light_Italic: {
    fontFamily: 'Poppins Light Italic',
  },
  _500_Medium: {
    fontFamily: 'Poppins Medium',
  },
  Medium_Italic: {
    fontFamily: 'Poppins Medium Italic',
  },
  _400_Regular: {
    fontFamily: 'Poppins Regular',
  },
  _600_SemiBold: {
    fontFamily: 'Poppins SemiBold',
  },
  SemiBold_Italic: {
    fontFamily: 'Poppins SemiBold Italic',
  },
  _100_Thin: {
    fontFamily: 'Poppins Thin',
  },
  Thin_Italic: {
    fontFamily: 'Poppins Thin Italic',
  },
} as const;

export const heights = {
  tabNavigationHeader: Platform.OS === 'android' ? 70 : 110,
  bottomTabBarHeight: Platform.OS === 'android' ? 80 : 110,
  exploreTabsHeader: 60,
};

export const config = {
  colors: colorsLight,
  fonts: {
    sizes,
    colors: colorsLight,
  },
  gutters: sizes,
  backgrounds: colorsLight,
  borders: {
    widths: [1, 2],
    radius: [4, 16, 24, 32],
    colors: colorsLight,
  },
  navigationColors: {
    ...DefaultTheme.colors,
    background: colorsLight.gray00,
    card: colorsLight.gray50,
  },
  variants: {
    dark: {
      colors: colorsDark,
      fonts: {
        colors: colorsDark,
      },
      backgrounds: colorsDark,
      navigationColors: {
        ...DarkTheme.colors,
        background: colorsDark.purple50,
        card: colorsDark.purple50,
      },
    },
  },
} as const satisfies ThemeConfiguration;
