import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {AreaMapper} from '../../../Utilities/CustomMethods';
import FastImage from '@d11/react-native-fast-image';
import {TextComponet} from '../../Elements/TextComponet';
interface UserProfileMiniCardProps {
  user: {
    username: string;
    profileImageUrl: string;
  };
}

export const UserProfileMiniCard: React.FC<UserProfileMiniCardProps> = ({
  user,
}) => {
  const {colors} = useTheme();

  return (
    <>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingVertical: AreaMapper({
            value: 20,
            scaleBy: 'average',
          }),
          borderWidth: 0.3,
          paddingHorizontal: AreaMapper({
            value: 10,
            scaleBy: 'average',
          }),
          borderRadius: 10,
          borderColor: colors.border,
        }}>
        <FastImage
          style={{
            height: 60,
            width: 60,
            borderRadius: AreaMapper({
              scaleBy: 'width',
              value: 100,
            }),
          }}
          source={{
            uri: user.profileImageUrl,
          }}
          resizeMode="cover"></FastImage>
        <View
          style={{
            marginLeft: AreaMapper({
              value: 8,
              scaleBy: 'average',
            }),
            flex: 0.45,
          }}>
          <TextComponet
            title={user.username}
            customStyle={{
              textAlign: 'left',
              marginLeft: AreaMapper({
                value: 5,
                scaleBy: 'average',
              }),
            }}
            fontVariant="medium"
            fontSizeVariant={30}
            lineHeight={35}></TextComponet>
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
                marginLeft: AreaMapper({
                  value: 5,
                  scaleBy: 'average',
                }),
              }}
              fontVariant="regular"
              fontSizeVariant={14}
              lineHeight={20}></TextComponet>
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
              fontSizeVariant={14}
              lineHeight={20}></TextComponet>
          </View>
        </View>
      </View>
    </>
  );
};
