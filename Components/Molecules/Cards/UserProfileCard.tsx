import FastImage from '@d11/react-native-fast-image';
import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import {AreaMapper} from '../../../Utilities/CustomMethods';
import {TextComponet} from '../../Elements/TextComponet';
import {size} from '../../../Prefrences/Prefrences';
import {Icon, IconButton, TouchableRipple} from 'react-native-paper';
interface UserProfileCardProps {
  user: {
    username: string;
    profileImageUrl: string;
  };
  onIconPress?: () => void;
  customStyle?: ViewStyle;
  onCardPressed?: () => void;
}

export const UserProfileCard: React.FC<UserProfileCardProps> = ({
  user,
  onIconPress,
  customStyle,
  onCardPressed,
}) => {
  const {colors} = useTheme();

  return (
    <TouchableOpacity
      onPress={onCardPressed}
      style={[
        style.wrapper,
        size.elevation.l,
        {
          backgroundColor: colors.card,
          borderRadius: size.borderRadius.m,
          borderWidth: size.borderWidth.l,
          borderColor: colors.card,
        },
        customStyle,
      ]}>
      <FastImage
        style={[
          style.image,
          {
            borderColor: colors.background,
          },
        ]}
        source={{
          uri: user.profileImageUrl,
        }}
        resizeMode="cover"></FastImage>
      <View style={style.detailContainer}>
        <TextComponet
          title={user.username}
          fontVariant="medium"
          fontSizeVariant={'title'}></TextComponet>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TextComponet
            title="12 Shops"
            customStyle={{
              textAlign: 'left',
            }}
            fontVariant="regular"
            fontSizeVariant={'regular'}></TextComponet>
          <TextComponet
            title="1009 Items"
            customStyle={{
              textAlign: 'left',
              marginLeft: AreaMapper({
                value: 5,
                scaleBy: 'average',
              }),
            }}
            fontVariant="regular"
            fontSizeVariant={'regular'}></TextComponet>
        </View>
      </View>
      {onIconPress ? (
        <IconButton
          rippleColor={'#f7fffa'}
          icon={'arrow-expand-right'}
          size={size.iconSize.small}
          onPress={onIconPress}
        />
      ) : null}
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: size.spacing.m,
    paddingHorizontal: size.spacing.s,
    marginBottom: size.spacing.xs,
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 100,
    borderWidth: size.borderWidth.xl,
  },
  detailContainer: {
    marginLeft: size.spacing.s,
    flex: 1,
  },
});
