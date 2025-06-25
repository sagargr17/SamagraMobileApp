import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {ScrollableLayout} from '../../Layout/ScreenLayout/ScrollableLayout';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {OnBoardingStackNavigationProp} from '../../Navigators/Stack/OnBoardingStackNavigator';
import {Controller, useForm} from 'react-hook-form';
import {Checkbox} from 'react-native-paper';
import AppButton from '../../Components/Elements/Button';
import {ErrorText} from '../../Components/Elements/ErrorText';
import {Spacer} from '../../Components/Elements/Spacer';
import {Logos} from '../../Assets/SVG/Exports/Exports';
import {Input} from '../../Components/Elements/Input';
import PhoneInput from '../../Components/Elements/PhoneInput';
import {AreaMapper} from '../../Utilities/CustomMethods';
import {registerUser} from '../../client/Token/RegisterUser';
import {AppText} from '../../Components/Elements/AppText';
import {showMessage} from 'react-native-flash-message';
import {responseTheme} from '../../Prefrences/Prefrences';

interface ProfileCreateProps {
  navigation: OnBoardingStackNavigationProp<'OtpScreen'>;
}

interface CreateForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export const ProfileCreateScreen: React.FC<ProfileCreateProps> = ({
  navigation,
}) => {
  const {Camera} = Logos;
  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<CreateForm>({
    mode: 'onChange',
    defaultValues: {
      confirmPassword: '',
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      phone: '',
    },
  });
  const [agree, setAgree] = useState(false);

  const password = watch('password');

  const [count, setCount] = useState(0);

  const onSubmit = async (data: CreateForm) => {
    setCount(prev => prev + 1);
    console.log('Submit', data);

    if (data.password === data.confirmPassword) {
      let result = await registerUser({
        username: data.firstName,
        password: data.password,
        email: data.email,
        phoneNumber: data.phone,
      });
      if (result === 200) {
        navigation.navigate('OtpScreen', {
          username: data.firstName,
        });
      }
    } else {
      console.log('>>><<< submitting Error');
      showMessage(responseTheme('Password Didnot Matched', 'asdsad', 'danger'));
    }
  };

  const [imageUri, setImageUri] = useState<string | undefined>('');

  // TODO: need to handle camera options
  // Lib not working for me right now, need to debug
  const handleImagePick = () => {
    // launchImageLibrary({mediaType: 'photo'}, response => {
    //   if (response.assets && response.assets.length > 0) {
    //     setImageUri(response.assets[0].uri);
    //   }
    // });
  };

  return (
    <ScrollableLayout>
      <KeyboardAvoidingView
        style={{
          flex: 1,
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <View style={styles.photoWrapper}>
              <TouchableOpacity onPress={handleImagePick} style={styles.circle}>
                {imageUri ? (
                  <Image source={{uri: imageUri}} style={styles.image} />
                ) : (
                  <Text style={styles.photoText}>+</Text>
                )}
              </TouchableOpacity>
              <View style={styles.photoAddContent}>
                <Camera height={16} />
                <Text style={styles.photoAddText}>Add</Text>
              </View>
            </View>
          </View>
          <Controller
            name="firstName"
            control={control}
            rules={{
              required: 'First name is required',
            }}
            render={({field: {value, onChange}}) => (
              <>
                <Input
                  label="Full Name"
                  placeholder="First Name"
                  value={value}
                  onChangeText={onChange}
                />
                {errors.firstName && (
                  <ErrorText>{errors.firstName.message}</ErrorText>
                )}
              </>
            )}
          />
          <Controller
            name="lastName"
            control={control}
            rules={{
              required: 'Last name is required',
            }}
            render={({field: {value, onChange}}) => (
              <>
                <Input
                  label="Last Name"
                  placeholder="Last Name"
                  value={value}
                  onChangeText={onChange}
                />
                {errors.lastName && (
                  <ErrorText>{errors.lastName.message}</ErrorText>
                )}
              </>
            )}
          />
          <Controller
            name="email"
            control={control}
            rules={{
              required: 'Email is required',
            }}
            render={({field: {value, onChange}}) => (
              <>
                <Input
                  label="Email"
                  placeholder="Email Address"
                  value={value}
                  onChangeText={onChange}
                />
                {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
              </>
            )}
          />

          <Controller
            name="phone"
            control={control}
            rules={{
              required: 'Phone number is required',
            }}
            render={({field: {value, onChange}}) => (
              <>
                <PhoneInput
                  label="Phone Number"
                  value={value}
                  onChangeText={onChange}
                />
                {errors.phone && <ErrorText>{errors.phone.message}</ErrorText>}
              </>
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{
              required: 'Password is required',
            }}
            render={({field: {value, onChange}}) => (
              <>
                {/* TODO: add show text options */}
                <Input
                  label="Password"
                  placeholder="Password"
                  secureTextEntry
                  value={value}
                  onChangeText={onChange}
                />
                {errors.password && (
                  <ErrorText>{errors.password.message}</ErrorText>
                )}
              </>
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            rules={{
              required: 'Confirm Password is required',
              validate: value => value === password || 'Password do not match',
            }}
            render={({field: {value, onChange}}) => (
              <>
                <Input
                  label="Confirm Password"
                  placeholder="Confirm Password"
                  secureTextEntry
                  value={value}
                  onChangeText={onChange}
                />
                {errors.confirmPassword && (
                  <ErrorText>{errors.confirmPassword.message}</ErrorText>
                )}
              </>
            )}
          />
          <View style={styles.agreement}>
            <Checkbox
              color="green"
              status={agree ? 'checked' : 'unchecked'}
              onPress={() => {
                setAgree(!agree);
              }}
            />

            <AppText
              title="I accept the privacy policy and terms of services"
              fontSizeVariant="caption"
              fontVariant="medium"></AppText>
          </View>
          <Spacer height={20} />
          <AppButton
            disabled={!agree}
            color="primary"
            onPress={handleSubmit(onSubmit)}>
            Continue
          </AppButton>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScrollableLayout>
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
  agreement: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: 92,
    height: 92,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#D1D1D1CC',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  photoTitle: {
    color: '#515151',
    marginBottom: 20,
    marginTop: 30,
    fontWeight: 600,
  },
  photoWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  photoText: {
    fontSize: 30,
    color: '#292D32',
  },
  photoAddContent: {
    marginTop: -20,
    backgroundColor: 'white',
    height: 32,
    width: 94,
    borderColor: '#fafafa',
    borderWidth: 1,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    justifyContent: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
  },
  photoAddText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#292D32',
    fontWeight: 700,
  },
  agreeText: {
    fontSize: 16,
    color: '#515151',
  },
});
