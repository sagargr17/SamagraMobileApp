import React, {useEffect} from 'react';
import {InteractionManager, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {Logos} from '../../Assets/SVG/Exports/Exports';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {MotiView} from 'moti';
import {OnBoardingStackNavigationProp} from '../../Navigators/Stack/OnBoardingStackNavigator';

interface SplashScreenProps {
  navigation: OnBoardingStackNavigationProp<'SplashScreen'>;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({navigation}) => {
  const {SamagraLogo} = Logos;

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      // Simulate a delay or animation completion
      setTimeout(() => {
        console.log(
          'Splash screen fully rendered and interactions finished, navigating...',
        );
        navigation.navigate('GetStartedScreen');
      }, 1400);
    });
  }, [navigation]);

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
          scale: 1.3,
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
          scale: 0.8 ,
        }}
        transition={{
          type: 'timing',
          duration: 700,
        }}>
        <Text style={styles.title}>SAMAGRA</Text>
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
