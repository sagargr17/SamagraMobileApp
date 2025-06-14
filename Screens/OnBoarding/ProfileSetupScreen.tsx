import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {ScrollableLayout} from '../../Layout/ScreenLayout/ScrollableLayout';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Logos} from '../../Assets/SVG/Exports/Exports';
import AppButton from '../../Components/Elements/Button';
import {OnBoardingStackNavigationProp} from '../../Navigators/Stack/OnBoardingStackNavigator';
import {useTheme} from '@react-navigation/native';
import {TextComponet} from '../../Components/Elements/TextComponet';
import {AreaMapper} from '../../Utilities/CustomMethods';

interface ProfileSetupProps {
  navigation: OnBoardingStackNavigationProp<'ProfileSetupScreen'>;
}

export const ProfileSetupScreen: React.FC<ProfileSetupProps> = ({
  navigation,
}) => {
  const {SamagraLogo} = Logos;
  const {colors, fonts} = useTheme();

  return (
    <ScrollableLayout>
      <View style={styles.body}>
        <View>
          <Text
            style={[
              styles.desc,
              {
                color: colors.text,
                fontFamily: fonts.regular.fontFamily,
              },
            ]}>
            Welcome to Samagra, let’s get your profile setup now. we will keep
            your profile information, uploaded documents, vehicle information
            and bank detail safe and secure.
          </Text>
        </View>
        <View style={styles.logo}>
          <SamagraLogo
            height={AreaMapper({
              value: 261,
              scaleBy: 'height',
            })}
            width={AreaMapper({
              value: 261,
              scaleBy: 'width',
            })}
          />
        </View>
        <View style={styles.content}>
          <AppButton
            color="primary"
            onPress={() => navigation.navigate('ProfileCreateScreen')}>
            Continue
          </AppButton>
          <Pressable
            onPress={() => {
              navigation.navigate('SignInScreen');
            }}>
            <TextComponet
              customStyle={styles.text}
              fontVariant="regular"
              fontSizeVariant={'caption'}
              title="Already Have an Account? Log In Now"></TextComponet>
          </Pressable>
        </View>
      </View>
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
  body: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
  },
  logo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: AreaMapper({
      value: 128,
      scaleBy: 'height',
    }),
    marginBottom: AreaMapper({
      value: 103,
      scaleBy: 'height',
    }),
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
