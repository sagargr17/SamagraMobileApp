import {Platform} from 'react-native';

const GOOGLE_FONT_REGULAR = 'Poppins-Regular';
const GOOGLE_FONT_MEDIUM = 'Poppins-Medium';
const GOOGLE_FONT_BOLD = 'Poppins-Bold';
const GOOGLE_FONT_HEAVY = 'Poppins-Black';

const MyTheme = {
  dark: false,
  colors: {
    primary: 'rgba(99, 202, 78, 1)',
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: 'rgba(45, 45, 45, 1)',
    border: 'rgb(192, 192, 192)',
    notification: 'rgb(255, 69, 58)',
  },
  fonts: {
    regular: {
      fontFamily: GOOGLE_FONT_REGULAR,
      fontWeight: '400' as '400',
    },
    medium: {
      fontFamily: GOOGLE_FONT_MEDIUM,
      fontWeight: '500' as '500',
    },
    bold: {
      fontFamily: GOOGLE_FONT_BOLD,
      fontWeight: '600' as '600',
    },
    heavy: {
      fontFamily: GOOGLE_FONT_HEAVY,
      fontWeight: '700' as '700',
    },
  },
};

const MyDarkTheme = {
  dark: true,
  colors: {
    primary: 'white',
    background: '#1D1D1D', //Black
    card: '#0004', //Halka dark gray types
    text: 'white',
    border: '#EBEBEB', //HAlka WHite types
    notification: '#ff6347', // NQ ko YEllow Notification
  },
  fonts: MyTheme.fonts,
};

export {MyTheme, MyDarkTheme};
