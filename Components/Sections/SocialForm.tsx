import React from 'react';
import {StyleSheet, View, Pressable} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Logos} from '../../Assets/SVG/Exports/Exports';

interface SocialProps {
  onAppleClick?: () => void;
}

export const SocialForm: React.FC<SocialProps> = ({onAppleClick}) => {
  const {AppleLogo, GoogleLogo} = Logos;
  return (
    <View style={styles.social}>
      <View style={styles.socialItem}>
        <Pressable onPress={onAppleClick}>
          <AppleLogo width={heightPercentageToDP(4)} />
        </Pressable>
      </View>
      <View style={styles.socialItem}>
        <Pressable onPress={() => {}}>
          <GoogleLogo width={heightPercentageToDP(4)} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  social: {
    flexDirection: 'row',
    gap: widthPercentageToDP(6),
    overflow: 'hidden',
  },
  socialItem: {
    paddingVertical: heightPercentageToDP(4),
    backgroundColor: '#EAEEFF',
    flex: 1,
    borderRadius: widthPercentageToDP(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
