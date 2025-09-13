import FastImage from '@d11/react-native-fast-image';
import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import {Icon, TouchableRipple} from 'react-native-paper';
import {size} from '../../../Prefrences/Prefrences';
import {AreaMapper, titleCase} from '../../../Utilities/CustomMethods';
import {AppTextElement} from '../../Elements/AppTextElement';
interface ProfileCardMoleculeProps {
  user: {
    username: string;
    profileImageUrl: string;
  };
  onIconPress?: () => void;
  customStyle?: ViewStyle;
  onCardPressed?: () => void;
}

export const ProfileCardMolecule: React.FC<ProfileCardMoleculeProps> = ({
  user,
  onIconPress,
  customStyle,
  onCardPressed,
}) => {
  const {colors} = useTheme();

  return (
    <View
      style={[
        style.wrapper,
        // size.elevation.xs,
        {
          backgroundColor: colors.card,
          borderRadius: size.borderRadius.l,
        },
        customStyle,
      ]}>
      <FastImage
        style={[
          style.image,
          {
            borderColor: colors.background,
            borderRadius: size.borderRadius.full,
          },
        ]}
        source={{
          uri: user.profileImageUrl,
        }}
        resizeMode="cover"></FastImage>
      <View style={style.detailContainer}>
        <AppTextElement
          title={titleCase(user.username)}
          fontVariant="medium"
          fontSizeVariant={'display'}></AppTextElement>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <AppTextElement
            title="12 Shops"
            customStyle={{
              textAlign: 'left',
            }}
            fontVariant="regular"
            fontSizeVariant={'regular'}></AppTextElement>
          <AppTextElement
            title="1009 Items"
            customStyle={{
              textAlign: 'left',
              marginLeft: AreaMapper({
                value: 5,
                scaleBy: 'average',
              }),
            }}
            fontVariant="regular"
            fontSizeVariant={'regular'}></AppTextElement>
        </View>
      </View>
      {onIconPress ? (
        <TouchableRipple
          onPress={onIconPress}
          style={{
            borderRadius: 50,
          }}>
          <Icon size={35} source={'menu-down'}></Icon>
        </TouchableRipple>
      ) : null}
    </View>
  );
};

const style = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: size.spacing.s,
    paddingHorizontal: size.spacing.s,
    marginBottom: size.spacing.xs,
  },
  image: {
    height: 70,
    width: 70,
    borderWidth: size.borderWidth.xl,
  },
  detailContainer: {
    marginLeft: size.spacing.s,
    flex: 1.5,
  },
});
