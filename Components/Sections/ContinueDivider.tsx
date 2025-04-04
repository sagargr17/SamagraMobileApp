import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

export const ContinueDivider = () => {
  const {colors, fonts} = useTheme();

  return (
    <View style={styles.wrapperLines}>
      <View style={styles.line} />
      <Text
        style={[
          styles.content,
          {
            fontFamily: fonts.medium.fontFamily,
          },
        ]}>
        OR CONTINUE WITH
      </Text>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapperLines: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: widthPercentageToDP(4),
  },
  line: {
    flex: 1,
    borderTopWidth: heightPercentageToDP(0.1),
    borderColor: '#C0C0C0',
  },
  content: {
    // fontSize: heightPercentageToDP(1.6),
    color: '#787878',
  },
});
