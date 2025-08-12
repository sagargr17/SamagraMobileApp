import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {ScrollableLayout} from '../../Layout/ScreenLayout/ScrollableLayout';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Logos} from '../../Assets/SVG/Exports/Exports';
import AppButtonElement from '../../Components/Elements/ButtonElement';
import {OnBoardingStackNavigationProp} from '../../Navigators/Stack/OnBoardingStackNavigator';
import {useTheme} from '@react-navigation/native';
import {AppTextElement} from '../../Components/Elements/AppTextElement';
import {AreaMapper} from '../../Utilities/CustomMethods';
import {size} from '../../Prefrences/Prefrences';

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
              value: 180,
              scaleBy: 'height',
            })}
            width={AreaMapper({
              value: 261,
              scaleBy: 'width',
            })}
          />
        </View>
        <View style={styles.content}>
          <AppButtonElement
            color="primary"
            onPress={() => navigation.navigate('ProfileCreateScreen')}>
            Continue
          </AppButtonElement>
          <Pressable
            onPress={() => {
              navigation.navigate('SignInScreen');
            }}>
            <AppTextElement
              customStyle={styles.text}
              fontVariant="regular"
              fontSizeVariant={'caption'}
              title="Already Have an Account? Log In Now"></AppTextElement>
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
    marginTop: heightPercentageToDP(1),
    textAlign: 'justify',
  },
  body: {
    flex: 1,
    // width: '100%',
    justifyContent: 'space-between',
    marginHorizontal: size.spacing.xs,
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
