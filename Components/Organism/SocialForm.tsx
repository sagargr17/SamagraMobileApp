import React from 'react';
import {StyleSheet, View, Pressable} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Logos} from '../../Assets/SVG/Exports/Exports';
import {useTheme} from '@react-navigation/native';
import {AreaMapper} from '../../Utilities/CustomMethods';
import {TextComponet} from '../Elements/TextComponet';
import {size} from '../../Prefrences/Prefrences';

interface SocialProps {
  onAppleClick?: () => void;
}

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
            },
          ]}>
          <AppleLogo height={size.iconSize.medium} />
          <TextComponet
            title="Apple"
            fontVariant="bold"
            fontSizeVariant={'regular'}></TextComponet>
        </View>
      </Pressable>
      <Pressable onPress={() => {}} style={styles.flexItem}>
        <View
          style={[
            styles.socialItem,
            {
              borderColor: colors.border,
              flex: 1,
            },
          ]}>
          <GoogleLogo width={size.iconSize.medium} />
          <TextComponet
            customStyle={{
              marginLeft: size.spacing.xs,
            }}
            title="Google"
            fontVariant="bold"
            fontSizeVariant={'regular'}></TextComponet>
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
    flex: 0.3,
  },
});
