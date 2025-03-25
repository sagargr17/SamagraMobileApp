import React from 'react';
import {StyleSheet, View} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';

export const OnBoardingLayout = ({children}: {children: React.ReactNode}) => {
  return <View style={styles.wrapper}>{children}</View>;
};

const styles = StyleSheet.create({
  header: {
    fontSize: heightPercentageToDP(4),
    fontWeight: 600,
    marginBottom: heightPercentageToDP(4),
    color: '#1D1D1D',
  },
  wrapper: {
    flex: 1,
    paddingTop: heightPercentageToDP(10),
    paddingLeft: heightPercentageToDP(2),
    paddingRight: heightPercentageToDP(2),
    backgroundColor: '#FDFDFD',
  },
});
