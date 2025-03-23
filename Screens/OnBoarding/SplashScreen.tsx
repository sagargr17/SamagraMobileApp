import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';

interface SplashScreenProps {}

export const SplashScreen: React.FC<SplashScreenProps> = ({}) => {
  return (
    <View style={styles.wrapper}>
      <Text>SplashScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
