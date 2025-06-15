import FastImage from '@d11/react-native-fast-image';
import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AreaMapper} from '../../../Utilities/CustomMethods';
import {TextComponet} from '../../Elements/TextComponet';
import {size} from '../../../Prefrences/Prefrences';
import {Icon, IconButton} from 'react-native-paper';
interface UserProfileCardProps {
  user: {
    username: string;
    profileImageUrl: string;
  };
}

export const UserProfileCard: React.FC<UserProfileCardProps> = ({user}) => {
  const {colors} = useTheme();

  return (
    <View
      style={[
        style.wrapper,
        size.elevation.l,
        {
          backgroundColor: colors.card,
          borderRadius: size.borderRadius.m,
          borderWidth: size.borderWidth.xss,
          borderColor: colors.border,
          marginBottom: size.spacing.xl,
        },
      ]}>
      <FastImage
        style={[
          style.image,
          {
            borderColor: colors.border,
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
      <IconButton
      rippleColor={"#f7fffa"}
        icon={'arrow-expand-right'}
        size={size.iconSize.small}
        onPress={() => console.log('<<>>MMM')}
      />
    </View>
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
    marginTop: size.spacing.m,
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
