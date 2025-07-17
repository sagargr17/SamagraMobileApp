import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Button, Pressable, StyleSheet, Text } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { OtpInput } from 'react-native-otp-entry';
import { verifiedPassword } from '../../client/Token/RegisterUser';
import { Spacer } from '../../Components/Elements/Spacer';
import { ScrollableLayout } from '../../Layout/ScreenLayout/ScrollableLayout';
import { OnBoardingStackNavigationProp } from '../../Navigators/Stack/OnBoardingStackNavigator';
import { responseTheme } from '../../Prefrences/Prefrences';
import { AreaMapper } from '../../Utilities/CustomMethods';

interface OptScreenProps {
  navigation: OnBoardingStackNavigationProp<'OtpScreen'>;
}

export const OtpScreen: React.FC<OptScreenProps> = ({navigation}) => {
  const [otp, setOtp] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [timer, setTimer] = useState(30);
  const route = useRoute<any>();
  console.log('params', route);

  const formattedNumber = timer < 10 ? `0${timer}` : `${timer}`;

  const onOtpSet = async () => {
    let response = await verifiedPassword(route.params.username, otp);
    if (response.ok) {
      showMessage(
        responseTheme(
          'Verified SuccessFull',
          `Login With the username ${route.params.username} and its respextive password`,
          'success',
        ),
      );
    } else {
      showMessage(
        responseTheme(
          'Something Went Wrong',
          `Please Try Again later`,
          'danger',
        ),
      );
    }
  };

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
    <ScrollableLayout header="Verify 6-digit OTP">
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
            width: AreaMapper({value: 12, scaleBy: 'width'}),
            height: AreaMapper({value: 6, scaleBy: 'height'}),
            backgroundColor: '#EAEAEA',
          },
          filledPinCodeContainerStyle: {
            backgroundColor: '#D5D5D5',
          },
        }}
      />
      <Spacer />
      <Button title="send" onPress={onOtpSet}></Button>
      {!disabled ? (
        <Text style={styles.timer}>Resend code in 00:{formattedNumber}</Text>
      ) : (
        <Text style={styles.resend}>Re-send OTP</Text>
      )}
      <Spacer height={10} />
      <Pressable onPress={() => navigation.navigate('SignInScreen')}>
        <Text style={styles.extraLink}>Already have an account? Log in</Text>
      </Pressable>
    </ScrollableLayout>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: AreaMapper({value: 8, scaleBy: 'height'}),
    paddingLeft: AreaMapper({value: 5, scaleBy: 'width'}),
    paddingRight: AreaMapper({value: 5, scaleBy: 'width'}),
    backgroundColor: '#FDFDFD',
  },
  header: {
    fontSize: AreaMapper({value: 4.8}),
    fontWeight: '600',
    marginBottom: AreaMapper({value: 1.2, scaleBy: 'height'}),
    color: '#1D1D1D',
  },
  subHeader: {
    fontSize: AreaMapper({value: 1.7, scaleBy: 'height'}),
    color: '#787878',
  },
  timer: {
    color: '#2D2D2D',
    fontSize: AreaMapper({value: 1.6}),
  },
  extraLink: {
    color: '#2A56FE',
    fontSize: AreaMapper({value: 1.6}),
  },
  resend: {
    color: '#2A56FE',
    fontSize: AreaMapper({value: 1.6}),
  },
});
