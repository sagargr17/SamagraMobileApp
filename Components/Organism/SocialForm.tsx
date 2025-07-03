import React from 'react';
import {StyleSheet, View, Pressable} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Logos} from '../../Assets/SVG/Exports/Exports';
import {useTheme} from '@react-navigation/native';
import {AreaMapper} from '../../Utilities/CustomMethods';
import {AppText} from '../Elements/AppText';
import {size} from '../../Prefrences/Prefrences';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';

interface SocialProps {
  onAppleClick?: () => void;
}

const startSignInFlow = async () => {
  try {
    GoogleSignin.configure(); // move this to after your app starts
    await GoogleSignin.hasPlayServices();
    const signInResponse = await GoogleSignin.signIn();
    // if (signInResponse.type === 'success') {
    //   // use signInResponse.data
    // } else if (signInResponse.type === "cancelled") {
    //   // the user wasn't previously signed into this app
    //   const createResponse = await GoogleOneTapSignIn.createAccount();
    //   if (createResponse.type === 'success') {
    //     // use createResponse.data
    //   } else if (createResponse.type === 'noSavedCredentialFound') {
    //     // no Google user account was present on the device yet (unlikely but possible)
    //     const explicitResponse =
    //       await GoogleOneTapSignIn.presentExplicitSignIn();

    //     if (explicitResponse.type === 'success') {
    //       // use explicitResponse.data
    //     }
    //   }
    // }
    // the else branches correspond to the user canceling the sign in
  } catch (error) {
    // handle error
  }
};

export const SocialForm: React.FC<SocialProps> = ({onAppleClick}) => {
  const {AppleLogo, GoogleLogo} = Logos;
  const {colors} = useTheme();
  return (
    <View style={styles.socialContainer}>
      <Pressable onPress={onAppleClick} style={styles.flexItem}>
        <View
          style={[
            styles.socialItem,
            {
              borderColor: colors.border,
              borderWidth: size.borderWidth.xs,
            },
          ]}>
          <AppleLogo height={size.iconSize.medium} />
          <AppText
            title="Apple"
            fontVariant="bold"
            fontSizeVariant={'regular'}></AppText>
        </View>
      </Pressable>
      <Pressable onPress={() => {
        startSignInFlow()
      }} style={styles.flexItem}>
        <View
          style={[
            styles.socialItem,
            {
              borderColor: colors.border,
              borderWidth: size.borderWidth.xs,
              // flex: 1,
            },
          ]}>
          <GoogleLogo width={size.iconSize.medium} />
          <AppText
            customStyle={{
              marginLeft: size.spacing.xs,
            }}
            title="Google"
            fontVariant="bold"
            fontSizeVariant={'regular'}></AppText>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: size.spacing.xxl,
  },
  socialItem: {
    flex: 1,
    paddingHorizontal: size.spacing.l,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: size.borderWidth.xs,
    borderRadius: size.borderRadius.full,
    display: 'flex',
    flexDirection: 'row',
  },
  flexItem: {
    flex: 0.48,
  },
});
