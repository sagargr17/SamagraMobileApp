// For Dark Theme
export const DarkTheme = {
  dark: true,
  colors: {
    primary: 'white',
    background: '#1D1D1D', //Black
    card: '#0004', //Halka dark gray types
    text: 'white',
    border: '#EBEBEB', //HAlka WHite types
    notification: '#ff6347', // NQ ko YEllow Notification
  },
};

// For Light Theme
export const DefaultTheme = {
  dark: false,
  colors: {
    // primary: '#3366CC', //NQ ko green color
    primary: '#1F5BCC', //NQ ko green color
    // primary: '#4874C6', //NQ ko green color
    background: '#FFFFFF', // light background color
    card: '#FAFAFC', //white gray types
    text: '#393F42', //Black
    border: '#3D313180', // darker gray types
    notification: '#D65B5B', //NQ ko Yellow Notification
  },
};

export const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'rgb(140, 201, 125)',
    primary: 'rgb(255, 45, 85)',
  },
};
