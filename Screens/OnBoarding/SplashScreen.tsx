import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {Logos} from '../../Assets/SVG/Exports/Exports';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {MotiView} from 'moti';

interface SplashScreenProps {}

export const SplashScreen: React.FC<SplashScreenProps> = ({}) => {
  const {SamagraLogo} = Logos;
  return (
    <View style={styles.wrapper}>
      <MotiView
        from={{
          opacity: 0,
          scale: 0.8,
          translateY: 90, // Start 20 units lower
        }}
        animate={{
          opacity: 1,
          scale: 1,
          translateY: 0, // Moves to its original position
        }}
        transition={{
          type: 'spring',
          damping: 15,
          stiffness: 100,
        }}>
        <SamagraLogo
          height={heightPercentageToDP(14)}
          width={heightPercentageToDP(14)}
        />
      </MotiView>
      <MotiView
        from={{
          opacity: 0,
          scale: 0.5,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          type: 'timing',
          duration: 700,
        }}>
        <Text style={styles.title}>SAMAGRA APP</Text>
      </MotiView>
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
