import {MessageOptions} from 'react-native-flash-message';
import {store} from '../StateManagement/Store';
import {hideLoader} from '../StateManagement/Error&loadingHandle/LoaderStateSlice';
import {Card} from 'react-native-paper';
import {Platform} from 'react-native';

const GOOGLE_FONT_REGULAR = 'Poppins-Regular';
const GOOGLE_FONT_MEDIUM = 'Poppins-Medium';
const GOOGLE_FONT_BOLD = 'Poppins-Bold';
const GOOGLE_FONT_HEAVY = 'Poppins-Black';

const MyTheme = {
  dark: false,
  colors: {
    primary: '#228866', //Test1
    background: 'rgb(255, 255, 255)',
    card: 'rgb(250, 250, 250)',
    // card: '#EFF1F3',
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
      fontSize: 18,
      lineHeight: 28,
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

  elevation: {
    xs: {
      ...Platform.select({
        ios: {
          shadowColor: '#000', // Typically black for shadows, you can adjust opacity
          shadowOffset: {width: 0, height: 4}, // Consistent shadow direction
          shadowOpacity: 0.1, // Adjust this for a softer or harder shadow (0 to 1)
          shadowRadius: 6, // Adjust this for blurriness of the shadow
        },
        android: {
          elevation: 9, // A good starting point for elevation on Android
          shadowColor: 'rgb(156, 156, 156)',
          shadowOffset: {width: 0, height: 5}, // Consistent shadow direction

          // No need for borderWidth/borderColor on Android either if you want no visible border
        },
      }),
    },
    s: {
      ...Platform.select({
        ios: {
          shadowColor: '#000', // Typically black for shadows, you can adjust opacity
          shadowOffset: {width: 0, height: 4}, // Consistent shadow direction
          shadowOpacity: 0.1, // Adjust this for a softer or harder shadow (0 to 1)
          shadowRadius: 6, // Adjust this for blurriness of the shadow
        },
        android: {
          elevation: 9, // A good starting point for elevation on Android
          shadowColor: 'rgb(156, 156, 156)',
          shadowOffset: {width: 0, height: 5}, // Consistent shadow direction

          // No need for borderWidth/borderColor on Android either if you want no visible border
        },
      }),
    },
    m: {
      ...Platform.select({
        ios: {
          shadowColor: '#000', // Typically black for shadows, you can adjust opacity
          shadowOffset: {width: 0, height: 4}, // Consistent shadow direction
          shadowOpacity: 0.1, // Adjust this for a softer or harder shadow (0 to 1)
          shadowRadius: 6, // Adjust this for blurriness of the shadow
        },
        android: {
          elevation: 9, // A good starting point for elevation on Android
          shadowColor: 'rgb(156, 156, 156)',
          shadowOffset: {width: 0, height: 5}, // Consistent shadow direction

          // No need for borderWidth/borderColor on Android either if you want no visible border
        },
      }),
    },
    l: {
      ...Platform.select({
        ios: {
          shadowColor: '#000', // Typically black for shadows, you can adjust opacity
          shadowOffset: {width: 0, height: 4}, // Consistent shadow direction
          shadowOpacity: 0.1, // Adjust this for a softer or harder shadow (0 to 1)
          shadowRadius: 6, // Adjust this for blurriness of the shadow
        },
        android: {
          elevation: 8, // A good starting point for elevation on Android
          shadowColor: 'rgb(156, 156, 156)',
          shadowOffset: {width: 0, height: 5}, // Consistent shadow direction

          // No need for borderWidth/borderColor on Android either if you want no visible border
        },
      }),
    },
  },

  iconSize: {
    small: 20,
    medium: 24,
    large: 26,
    xlarge: 48,
    xxlarge: 80,
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
