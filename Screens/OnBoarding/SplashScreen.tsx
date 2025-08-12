import {useTheme} from '@react-navigation/native';
import {MotiView} from 'moti';
import React, {useEffect} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {Logos} from '../../Assets/SVG/Exports/Exports';
import {OnBoardingStackNavigationProp} from '../../Navigators/Stack/OnBoardingStackNavigator';
import {size} from '../../Prefrences/Prefrences';
import {useAppSelector} from '../../StateManagement/hooks';
import {AreaMapper} from '../../Utilities/CustomMethods';
import {AppTextElement} from '../../Components/Elements/AppTextElement';
import {SpacerElement} from '../../Components/Elements/SpacerElement';

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
    
    let timer = setTimeout(() => {
      if (userIsAuthenticate === true || userIsAuthenticate === false)
        navigation.navigate('GetStartedScreen');
    }, 2000);

    return () => clearInterval(timer);
  }, [userIsAuthenticate]);

  return (
    <View style={styles.wrapper}>
      <MotiView>
        <SamagraLogo height={100} width={100} />
      </MotiView>
      <SpacerElement height={15}></SpacerElement>
      <MotiView>
        <AppTextElement
          title="SAMAGRA"
          fontSizeVariant="display"
          fontVariant="bold"
          customStyle={{
            color: colors.primary,
          }}></AppTextElement>
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
    fontSize: AreaMapper({value: 4}),
    color: '#34C759',
    fontWeight: 700,
    marginTop: AreaMapper({value: 2, scaleBy: 'height'}),
  },
});
