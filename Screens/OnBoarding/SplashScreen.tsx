import {useLazyQuery} from '@apollo/client';
import {useIsFocused} from '@react-navigation/native';
import {MotiView} from 'moti';
import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {Logos} from '../../Assets/SVG/Exports/Exports';
import {ImageNotFound} from '../../Constants/UI/AssetsUrls';
import {getLoginUser} from '../../GraphQL/Queries/UserQueries';
import {OnBoardingStackNavigationProp} from '../../Navigators/Stack/OnBoardingStackNavigator';
import {useAppDispatch, useAppSelector} from '../../StateManagement/hooks';
import {login} from '../../StateManagement/User/UserSlice';

interface SplashScreenProps {
  navigation: OnBoardingStackNavigationProp<'SplashScreen'>;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({navigation}) => {
  const {SamagraLogo} = Logos;
  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();

  const userSignInStatus = useAppSelector(state => state.user.isAuthenticated);
  const [getLoginUserFn] = useLazyQuery(getLoginUser);

  const handleForwardNavigation = () => {
    console.log('User sTatus ', userSignInStatus);
    navigation.navigate('GetStartedScreen');
  };

  useEffect(() => {
    console.log('nfunction ');

    getLoginUserFn()
      .then(data => {
        if (data.data) {
          dispatch(
            login({
              user: {
                username: data.data?.getUser?.username ?? 'Samagra',
                pofileImageUrl:
                  data.data?.getUser?.profileImageUrl ?? ImageNotFound,
                email: 'sagar@gmail.com',
                location: 'Baneswor Kathmandu Nepal',
                phoneNumber: '9841150390',
              },
              isAuthenticated: true,
            }),
          );
          handleForwardNavigation();
        }
        if (data.error) {
          handleForwardNavigation();
        }
      })
      .catch(error => {
        handleForwardNavigation();
      })
      .finally(() => {
        handleForwardNavigation();
      });
  }, []);

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
