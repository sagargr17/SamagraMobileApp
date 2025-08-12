import FastImage from '@d11/react-native-fast-image';
import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {Checkbox} from 'react-native-paper';
import {Logos} from '../../Assets/SVG/Exports/Exports';
import {registerUser} from '../../client/Token/RegisterUser';
import {AppTextElement} from '../../Components/Elements/AppTextElement';
import AppButtonElement from '../../Components/Elements/ButtonElement';
import {ErrorTextElement} from '../../Components/Elements/ErrorTextElement';
import {InputElement} from '../../Components/Elements/InputElement';
import PhoneInputElement from '../../Components/Elements/PhoneInputElement';
import {SpacerElement} from '../../Components/Elements/SpacerElement';
import {ScrollableLayout} from '../../Layout/ScreenLayout/ScrollableLayout';
import {OnBoardingStackNavigationProp} from '../../Navigators/Stack/OnBoardingStackNavigator';
import {responseTheme, size} from '../../Prefrences/Prefrences';
import {AreaMapper} from '../../Utilities/CustomMethods';
import ImageHandler from '../../Utilities/ImageHandler';

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
  const [imageUri, setImageUri] = useState<string | undefined>('');

  const onSubmit = async (data: CreateForm) => {
    setCount(prev => prev + 1);
    console.log('Submit', data);
    if (imageUri !== '')
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
        showMessage(
          responseTheme('Password Didnot Matched', 'asdsad', 'danger'),
        );
      }
    else {
      showMessage(
        responseTheme(
          'Invalid Image!',
          'You havenot choosen image or corrupt image, verify and try again',
          'danger',
        ),
      );
    }
  };

  // TODO: need to handle camera options
  // Lib not working for me right now, need to debug
  const handleImagePick = async () => {
    let GalleryImages: any = await ImageHandler.selectFromGallery();
    console.log('Gallery Images', GalleryImages);
    setImageUri(GalleryImages[0].uri);
  };

  return (
    <ScrollableLayout>
      <KeyboardAvoidingView
        style={{
          flex: 1,
        }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            marginHorizontal: size.spacing.s,
          }}>
          <View>
            <View style={styles.photoWrapper}>
              <TouchableOpacity onPress={handleImagePick} style={styles.circle}>
                {imageUri ? (
                  <FastImage source={{uri: imageUri}} style={styles.image} />
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
                <InputElement
                  label="UserName*"
                  placeholder="First Name"
                  value={value}
                  onChangeText={onChange}
                />
                {errors.firstName && (
                  <ErrorTextElement>{errors.firstName.message}</ErrorTextElement>
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
                <InputElement
                  label="Full Name"
                  placeholder="Last Name"
                  value={value}
                  onChangeText={onChange}
                />
                {errors.lastName && (
                  <ErrorTextElement>{errors.lastName.message}</ErrorTextElement>
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
                <InputElement
                  label="Email"
                  placeholder="Email Address"
                  value={value}
                  onChangeText={onChange}
                />
                {errors.email && <ErrorTextElement>{errors.email.message}</ErrorTextElement>}
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
                <PhoneInputElement
                  label="Phone Number"
                  value={value}
                  onChangeText={onChange}
                />
                {errors.phone && <ErrorTextElement>{errors.phone.message}</ErrorTextElement>}
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
                <InputElement
                  label="Password"
                  placeholder="Password"
                  secureTextEntry
                  value={value}
                  onChangeText={onChange}
                />
                {errors.password && (
                  <ErrorTextElement>{errors.password.message}</ErrorTextElement>
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
                <InputElement
                  label="Confirm Password"
                  placeholder="Confirm Password"
                  secureTextEntry
                  value={value}
                  onChangeText={onChange}
                />
                {errors.confirmPassword && (
                  <ErrorTextElement>{errors.confirmPassword.message}</ErrorTextElement>
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

            <AppTextElement
              title="I accept the privacy policy and terms of services"
              fontSizeVariant="caption"
              fontVariant="medium"></AppTextElement>
          </View>
          <SpacerElement height={20} />
          <AppButtonElement
            disabled={!agree}
            color="primary"
            onPress={handleSubmit(onSubmit)}>
            Continue
          </AppButtonElement>
          <SpacerElement height={20}></SpacerElement>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScrollableLayout>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: AreaMapper({value: 2.2}),
    fontWeight: 600,
    textAlign: 'center',
    color: '#1D1D1D',
  },
  desc: {
    fontSize: size.textVariants.regular.fontSize,
    marginTop: AreaMapper({value: 1, scaleBy: 'height'}),
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
