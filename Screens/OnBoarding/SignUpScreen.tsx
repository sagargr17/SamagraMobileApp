import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {OnBoardingStackNavigationProp} from '../../Navigators/Stack/OnBoardingStackNavigator';
import AppButton from '../../Components/elements/Button';
import {Spacer} from '../../Components/elements/Spacer';
import {OnBoardingLayout} from '../../Components/Layout/OnBoardingLayout';
import {SignUpForm} from '../../Components/Sections/SignUpForm';
import {SocialForm} from '../../Components/Sections/SocialForm';

interface OnBoardingScreenProps {
  navigation: OnBoardingStackNavigationProp<'SignUpScreen'>;
}

export const SignUpScreen: React.FC<OnBoardingScreenProps> = ({navigation}) => {
  const goLogin = () => {
    navigation.navigate('SignInScreen');
  };

  return (
    <OnBoardingLayout header={"Let's get Started!"}>
      <SignUpForm />
      <Spacer />
      <View style={styles.wrapperLines}>
        <View style={styles.line} />
        <Text style={styles.content}>OR CONTINUE WITH</Text>
        <View style={styles.line} />
      </View>
      <Spacer />
      <AppButton mode="outlined" onPress={goLogin}>
        Continue with Email
      </AppButton>
      <Spacer />
      <SocialForm />
    </OnBoardingLayout>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: heightPercentageToDP(4),
    fontWeight: '600',
    marginBottom: heightPercentageToDP(4),
    color: '#1D1D1D',
  },
  wrapper: {
    flex: 1,
    paddingTop: heightPercentageToDP(10),
    paddingLeft: widthPercentageToDP(5),
    paddingRight: widthPercentageToDP(5),
    backgroundColor: '#FDFDFD',
  },
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
    fontSize: heightPercentageToDP(1.5),
    color: '#787878',
  },
});
