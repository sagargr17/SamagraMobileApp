import {useTheme} from '@react-navigation/native';
import {MotiView} from 'moti';
import React, {useEffect} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import BootSplash from 'react-native-bootsplash';
import {Text} from 'react-native-paper';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {Logos} from '../../Assets/SVG/Exports/Exports';
import {OnBoardingStackNavigationProp} from '../../Navigators/Stack/OnBoardingStackNavigator';
import {size} from '../../Prefrences/Prefrences';
import {useAppSelector} from '../../StateManagement/hooks';

interface SplashScreenProps {
  navigation: OnBoardingStackNavigationProp<'SplashScreen'>;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({navigation}) => {
  const {SamagraLogo} = Logos;
  const {colors} = useTheme();
  const userIsAuthenticate = useAppSelector(
    state => state.user.isAuthenticated,
  );
  useEffect(() => {
    console.log('User Login Status in Splash screen ', userIsAuthenticate);
    
    let timer = setTimeout(() => {
      if (userIsAuthenticate === true || userIsAuthenticate === false)
        navigation.navigate('GetStartedScreen');
    }, 1500);

    return () => clearInterval(timer);
  }, [userIsAuthenticate]);

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
        <SamagraLogo height={100} width={100} />
      </MotiView>
      <MotiView
        from={{
          opacity: 0,
          scale: 0.5,
        }}
        animate={{
          opacity: 1,
          scale: 0.8,
        }}
        transition={{
          type: 'timing',
          duration: 700,
        }}>
        <Text style={styles.title}>SAMAGRA</Text>
      </MotiView>
      <ActivityIndicator
        size={'large'}
        color={colors.primary}
        style={{
          position: 'absolute',
          bottom: size.spacing.xxl,
        }}></ActivityIndicator>
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
