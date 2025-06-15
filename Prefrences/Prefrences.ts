import {MessageOptions} from 'react-native-flash-message';
import {store} from '../StateManagement/Store';
import {hideLoader} from '../StateManagement/Error&loadingHandle/LoaderStateSlice';
import {Card} from 'react-native-paper';

const GOOGLE_FONT_REGULAR = 'Poppins-Regular';
const GOOGLE_FONT_MEDIUM = 'Poppins-Medium';
const GOOGLE_FONT_BOLD = 'Poppins-Bold';
const GOOGLE_FONT_HEAVY = 'Poppins-Black';

const MyTheme = {
  dark: false,
  colors: {
    primary: '#339944', //Test1
    // primary: '#338844', //Test2
    // primary: '#1AD05D', //Primary 5
    // primary: '#0FAA48', //Primary 6
    // primary: '#10702C', //Primary 7
    // primary: '#126933', //Primary 8
    // primary: 'rgba(99, 202, 78, 1)',
    background: 'rgb(255, 255, 255)',
    // card: 'rgb(250, 250, 250)',
    card: '#EFF1F3',
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

const size = {
  spacing: {
    xxs: 4,
    xs: 8,
    s: 12,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48,
  },

  textVariants: {
    display: {
      fontSize: 30,
      lineHeight: 24,
    },
    regular: {
      fontSize: 14,
      lineHeight: 20,
    },
    title: {
      fontSize: 16,
      lineHeight: 22,
    },

    caption: {
      fontSize: 12,
      lineHeight: 18,
    },
  },
  borderWidth: {
    none: 0,
    xss: 0.25,
    xs: 0.5,
    s: 1,
    m: 2,
    l: 3,
    xl: 4,
    xxl: 6,
  },

  borderRadius: {
    none: 0,
    xs: 4,
    s: 8,
    m: 12,
    l: 16,
    xl: 24,
    full: 999,
  },

  // elevation: {
  //   xs: {
  //     shadowColor: '#000',
  //     shadowOffset: {width: 0, height: 1},
  //     shadowOpacity: 0.12,
  //     shadowRadius: 3,
  //     elevation: 1,
  //   },
  //   s: {
  //     shadowColor: '#000',
  //     shadowOffset: {width: 0, height: 3},
  //     shadowOpacity: 0.16,
  //     shadowRadius: 6,
  //     elevation: 2,
  //   },
  //   m: {
  //     shadowColor: '#0000',
  //     shadowOffset: {width: 0, height: 2},
  //     shadowOpacity: 0.0001,
  //     elevation: 5,
  //   },
  //   l: {
  //     shadowColor: '#000',
  //     shadowOffset: {width: 0, height: 14},
  //     shadowOpacity: 0.25,
  //     shadowRadius: 28,
  //     elevation: 4,
  //   },
  // },
  elevation: {
    xs: {
      shadowColor: '#000',
      shadowOffset: {width: 1000, height: 1},
      shadowOpacity: 0.12,
      shadowRadius: 3,
      elevation: 1,
    },
    s: {
      // iOS shadow properties
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 3},
      shadowOpacity: 0.16,
      shadowRadius: 6,
      // Android elevation property
      elevation: 2, // On Android, this will be applied. iOS will ignore it.
    },
    m: {
      // THIS IS THE UPDATED 'm' ELEVATION
      // iOS shadow properties
      shadowColor: '#000', // Proper visible color
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.25, // Good visible opacity for a soft shadow
      shadowRadius: 3.84, // Crucial for softness on iOS
      // Android elevation property
      elevation: 3, // On Android, this will be applied. iOS will ignore it.
    },
    l: {
      // iOS shadow properties
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 14},
      shadowOpacity: 0.25,
      shadowRadius: 100000000,
      // Android elevation property
      elevation: 4, // On Android, this will be applied. iOS will ignore it.
    },
  },
  iconSize: {
    small: 16,
    medium: 24,
    large: 26,
    xlarge: 48,
  },
};

let responseTheme: (
  message: string,
  description: string,
  type: any,
) => MessageOptions;
responseTheme = (message: string, description: string, type: any) => {
  store.dispatch(hideLoader());
  return {
    message: message,
    description: description,
    type: type,

    textStyle: {
      fontFamily: MyTheme.fonts.regular.fontFamily,
      fontSize: size.spacing.s,
    },
    titleStyle: {
      fontSize: size.spacing.m,
    },
    icon: type,
    statusBarHeight: 0,
  };
};

export {MyTheme, MyDarkTheme, size, responseTheme};
