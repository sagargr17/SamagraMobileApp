import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {OnBoardingLayout} from '../../Components/Layout/OnBoardingLayout';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Logos} from '../../Assets/SVG/Exports/Exports';
import AppButton from '../../Components/Elements/Button';
import {OnBoardingStackNavigationProp} from '../../Navigators/Stack/OnBoardingStackNavigator';

interface ProfileSetupProps {
  navigation: OnBoardingStackNavigationProp<'ProfileSetupScreen'>;
}

export const ProfileSetupScreen: React.FC<ProfileSetupProps> = ({
  navigation,
}) => {
  const {SamagraLogo} = Logos;
  return (
    <OnBoardingLayout>
      <View style={styles.body}>
        <View>
          <Text style={styles.header}>Let's setup profile</Text>
          <Text style={styles.desc}>
            Since you are verified now, let’s get your profile setup now. You
            have complete your profile information, upload documents, vehicle
            information and bank details.
          </Text>
        </View>
        <View style={styles.logo}>
          <SamagraLogo
            height={heightPercentageToDP(70)}
            width={widthPercentageToDP(70)}
          />
        </View>
        <View style={styles.content}>
          <AppButton
            color="secondary"
            onPress={() => navigation.navigate('ProfileCreateScreen')}>
            Continue
          </AppButton>
          <Pressable
            onPress={() => {
              navigation.navigate('SignInScreen');
            }}>
            <Text style={styles.text}>Already Have an Account? Log In Now</Text>
          </Pressable>
        </View>
      </View>
    </OnBoardingLayout>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: heightPercentageToDP(2.2),
    fontWeight: 600,
    textAlign: 'center',
    color: '#1D1D1D',
  },
  desc: {
    fontSize: heightPercentageToDP(2),
    marginTop: heightPercentageToDP(1),
  },
  body: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
  },
  logo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    justifyContent: 'flex-end',
    marginBottom: heightPercentageToDP(4),
  },
  text: {
    marginTop: heightPercentageToDP(2),
    textAlign: 'center',
    fontSize: heightPercentageToDP(2),
  },
});
