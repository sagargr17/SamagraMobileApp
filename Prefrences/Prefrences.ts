import {Platform} from 'react-native';

const WEB_FONT_STACK =
  'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

const MyTheme = {
  dark: false,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
  fonts: Platform.select({
    web: {
      regular: {
        fontFamily: WEB_FONT_STACK,
        fontWeight: '400' as '400',
      },
      medium: {
        fontFamily: WEB_FONT_STACK,
        fontWeight: '500' as '500',
      },
      bold: {
        fontFamily: WEB_FONT_STACK,
        fontWeight: '600' as '600',
      },
      heavy: {
        fontFamily: WEB_FONT_STACK,
        fontWeight: '700' as '700',
      },
    },
    ios: {
      regular: {
        fontFamily: 'System',
        fontWeight: '400' as '400',
      },
      medium: {
        fontFamily: 'System',
        fontWeight: '500' as '500',
      },
      bold: {
        fontFamily: 'System',
        fontWeight: '600' as '600',
      },
      heavy: {
        fontFamily: 'System',
        fontWeight: '700' as '700',
      },
    },
    default: {
      regular: {
        fontFamily: 'sans-serif',
        fontWeight: 'normal' as 'normal',
      },
      medium: {
        fontFamily: 'sans-serif-medium',
        fontWeight: 'normal' as 'normal',
      },
      bold: {
        fontFamily: 'sans-serif',
        fontWeight: '600' as '600',
      },
      heavy: {
        fontFamily: 'sans-serif',
        fontWeight: '700' as '700',
      },
    },
  }),
};

const MyDarkTheme = {
  dark: true,
  colors: {
    primary: 'rgb(255, 69, 58)',
    background: 'rgb(18, 18, 18)',
    card: 'rgb(30, 30, 30)',
    text: 'rgb(229, 229, 231)',
    border: 'rgb(39, 39, 41)',
    notification: 'rgb(255, 69, 58)',
  },
  fonts: {
    ...MyTheme.fonts,
    // Ensure that all fontWeights are also string literals.
  },
};
export {MyTheme, MyDarkTheme};
