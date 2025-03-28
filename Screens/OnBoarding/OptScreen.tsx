import React, {useEffect, useState} from 'react';
import {OtpInput} from 'react-native-otp-entry';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Text, StyleSheet, Pressable} from 'react-native';
import {OnBoardingStackNavigationProp} from '../../Navigators/Stack/OnBoardingStackNavigator';
import {OnBoardingLayout} from '../../Components/Layout/OnBoardingLayout';
import { Spacer } from '../../Components/Elements/Spacer';


interface OptScreenProps {
  navigation: OnBoardingStackNavigationProp<'OtpScreen'>;
}

export const OtpScreen: React.FC<OptScreenProps> = ({navigation}) => {
  const [otp, setOtp] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [timer, setTimer] = useState(30);

  const formattedNumber = timer < 10 ? `0${timer}` : `${timer}`;

  const onOtpSet = () => {};

  useEffect(() => {
    if (timer <= 0) {
      setDisabled(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  return (
    <OnBoardingLayout header="Verify 6-digit OTP">
      <Text style={styles.subHeader}>
        1 Code sent to +44********456 phone number unless you already have an
        account{' '}
      </Text>
      <Spacer />
      <OtpInput
        disabled={disabled}
        numberOfDigits={6}
        onTextChange={text => setOtp(text)}
        onFilled={() => onOtpSet}
        theme={{
          pinCodeContainerStyle: {
            width: widthPercentageToDP(12),
            height: heightPercentageToDP(6),
            backgroundColor: '#EAEAEA',
          },
          filledPinCodeContainerStyle: {
            backgroundColor: '#D5D5D5',
          },
        }}
      />
      <Spacer />
      {!disabled ? (
        <Text style={styles.timer}>Resend code in 00:{formattedNumber}</Text>
      ) : (
        <Text style={styles.resend}>Re-send OTP</Text>
      )}
      <Spacer height={10} />
      <Pressable onPress={() => navigation.navigate('SignInScreen')}>
        <Text style={styles.extraLink}>Already have an account? Log in</Text>
      </Pressable>
    </OnBoardingLayout>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: heightPercentageToDP(8),
    paddingLeft: widthPercentageToDP(5),
    paddingRight: widthPercentageToDP(5),
    backgroundColor: '#FDFDFD',
  },
  header: {
    fontSize: heightPercentageToDP(4.8),
    fontWeight: '600',
    marginBottom: heightPercentageToDP(1.2),
    color: '#1D1D1D',
  },
  subHeader: {
    fontSize: heightPercentageToDP(1.7),
    // marginTop: heightPercentageToDP(-2),
    color: '#787878',
  },
  timer: {
    color: '#2D2D2D',
    fontSize: heightPercentageToDP(1.6),
  },
  extraLink: {
    color: '#2A56FE',
    fontSize: heightPercentageToDP(1.6),
  },
  resend: {
    color: '#2A56FE',
    fontSize: heightPercentageToDP(1.6),
  },
});
