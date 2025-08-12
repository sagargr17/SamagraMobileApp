import {Platform} from 'react-native';
import {MessageOptions} from 'react-native-flash-message';
import {hideLoader} from '../StateManagement/Error&loadingHandle/LoaderStateSlice';
import {store} from '../StateManagement/Store';
import {AreaMapper} from '../Utilities/CustomMethods';

const GOOGLE_FONT_REGULAR = 'Poppins-Regular';
const GOOGLE_FONT_MEDIUM = 'Poppins-Medium';
const GOOGLE_FONT_BOLD = 'Poppins-Bold';
const GOOGLE_FONT_HEAVY = 'Poppins-Black';

const MyTheme = {
  dark: false,
  colors: {
    primary: '#228866', //Test1
    background: '#FFFFFF',
    card: '#EFF1F3',
    text: 'rgba(45, 45, 45, 1)',
    border: '#EFF1F3',
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

// Define a type for your raw size object
type RawSizes = typeof rawSizes;

// This generic type applies the AreaMapper logic and preserves the object structure
type ScaledSizes<T> = {
  [K in keyof T]: T[K] extends number
    ? number
    : T[K] extends object
    ? ScaledSizes<T[K]>
    : T[K];
};

// Size integration
const applyAreaMapper = <T extends object>(obj: T): ScaledSizes<T> => {
  const newObj: any = {};
  for (const key in obj) {
    if (typeof obj[key] === 'number' && key !== 'elevation') {
      let isText = false;
      if (key === 'fontSize' || key === 'lineHeight') {
        isText = true;
      }
      newObj[key] = Math.round(AreaMapper({value: obj[key] as number, isText}));
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      newObj[key] = applyAreaMapper(obj[key]);
    } else {
      newObj[key] = obj[key];
    }
  }
  return newObj as ScaledSizes<T>;
};

// Your raw sizes object
const rawSizes = {
  spacing: {
    xxs: 4,
    xs: 6,
    s: 12,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48,
  },
  textVariants: {
    headline: {
      fontSize: 22,
      lineHeight: 28,
    },
    display: {
      fontSize: 20,
      lineHeight: 24,
    },
    title: {
      fontSize: 16,
      lineHeight: 22,
    },
    regular: {
      fontSize: 14,
      lineHeight: 20,
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
          shadowColor: '#000000',
          shadowOffset: {width: 0, height: 1},
          shadowOpacity: 0.18,
          shadowRadius: 1.0,
        },
        android: {
          elevation: 1,
          shadowColor: '#000000',
        },
      }),
    },
    s: {
      ...Platform.select({
        ios: {
          shadowColor: '#000000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.2,
          shadowRadius: 2.22,
        },
        android: {
          elevation: 3,
          shadowColor: '#000000',
        },
      }),
    },
    m: {
      ...Platform.select({
        ios: {
          shadowColor: '#000000',
          shadowOffset: {width: 0, height: 4},
          shadowOpacity: 0.23,
          shadowRadius: 2.62,
        },
        android: {
          elevation: 5,
          shadowColor: '#000000',
        },
      }),
    },
    l: {
      ...Platform.select({
        ios: {
          shadowColor: '#000000',
          shadowOffset: {width: 0, height: 7},
          shadowOpacity: 0.3,
          shadowRadius: 4.65,
        },
        android: {
          elevation: 10,
          shadowColor: '#000000',
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

// The size constant is now fully typed
export const size: ScaledSizes<RawSizes> = applyAreaMapper(rawSizes);
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

export {MyDarkTheme, MyTheme, responseTheme};
