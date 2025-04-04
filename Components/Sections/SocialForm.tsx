import React from 'react';
import {StyleSheet, View, Pressable} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Logos} from '../../Assets/SVG/Exports/Exports';
import {useTheme} from '@react-navigation/native';
import {SamagraScaller} from '../../Utilities/CustomMethods';
import {TextComponet} from '../Elements/TextComponet';

interface SocialProps {
  onAppleClick?: () => void;
}

export const SocialForm: React.FC<SocialProps> = ({onAppleClick}) => {
  const {AppleLogo, GoogleLogo} = Logos;
  const {colors} = useTheme();
  return (
    <View style={styles.socialContainer}>
      <Pressable onPress={onAppleClick}>
        <View
          style={[
            styles.socialItem,
            {
              borderColor: colors.border,
            },
          ]}>
          <AppleLogo
            height={SamagraScaller({
              value: 30,
              scaleBy: 'width',
            })}
          />
          <TextComponet
            title="Apple"
            fontVariant="bold"
            fontSize={16}></TextComponet>
        </View>
      </Pressable>
      <Pressable onPress={() => {}}>
        <View
          style={[
            styles.socialItem,
            {
              borderColor: colors.border,
            },
          ]}>
          <GoogleLogo width={heightPercentageToDP(4)} />
          <TextComponet
            title="Google"
            fontVariant="bold"
            fontSize={16}
            lineHeight={30}></TextComponet>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: SamagraScaller({
      value: 60,
      scaleBy: 'height',
    }),
  },
  socialItem: {
    flex: 1,
    paddingVertical: SamagraScaller({
      value: 12,
      scaleBy: 'width',
    }),
    paddingLeft: SamagraScaller({
      value: 48,
      scaleBy: 'height',
    }),
    paddingRight: SamagraScaller({
      value: 48,
      scaleBy: 'height',
    }),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: SamagraScaller({
      value: 1,
      scaleBy: 'height',
    }),
    borderRadius: SamagraScaller({
      value: 28,
      scaleBy: 'width',
    }),
    display: 'flex',
    flexDirection: 'row',
    // width:
  },
});
