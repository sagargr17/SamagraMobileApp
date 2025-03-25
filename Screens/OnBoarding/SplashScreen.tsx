import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {Logos} from '../../Assets/SVG/Exports/Exports';
import {heightPercentageToDP} from 'react-native-responsive-screen';

interface SplashScreenProps {}

export const SplashScreen: React.FC<SplashScreenProps> = ({}) => {
  const {SamagraLogo} = Logos;
  return (
    <View style={styles.wrapper}>
      <SamagraLogo
        height={heightPercentageToDP(14)}
        width={heightPercentageToDP(14)}
      />
      <Text style={styles.title}>SAMAGRA APP</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: heightPercentageToDP(4),
    color: '#34C759',
    fontWeight: 700,
    marginTop: heightPercentageToDP(2),
  },
});
