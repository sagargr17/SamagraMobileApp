import React from 'react';
import {OnBoardingStackNavigationProp} from '../../Navigators/Stack/OnBoardingStackNavigator';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import PhoneInput from '../../Components/elements/PhoneInput';
import AppButton from '../../Components/elements/Button';

interface OnBoardingScreenProps {
  navigation: OnBoardingStackNavigationProp<'SignUpScreen'>;
}

export const SignUpScreen: React.FC<OnBoardingScreenProps> = ({navigation}) => {
  return (
    <View style={styles.wrapper}>
      <Text>Lets Get Started</Text>
      <Text>Enter your Phone Number</Text>
      <PhoneInput />
      <AppButton>Continue</AppButton>
      <View style={styles.wrapperLines}>
        <View style={styles.line} />
        <Text style={styles.content}>OR CONTINUE WITH</Text>
        <View style={styles.line} />
      </View>
      <AppButton mode="outlined">Continue with Email</AppButton>
      <Text>
        <Button onPress={() => navigation.goBack()}>Go Back</Button>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: 100,
    paddingLeft: 20,
    paddingRight: 20,
  },
  wrapperLines: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  line: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: '#C0C0C0',
  },
  content: {
    fontSize: 14,
    color: '#787878',
  },
});
