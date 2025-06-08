import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Icon, IconButton} from 'react-native-paper';
import {TextComponet} from './TextComponet';
import {titleCase} from '../../Utilities/CustomMethods';
import {size} from '../../Prefrences/Prefrences';
interface RatingProps {
  ratingNumber?: number;
}

export const Rating: React.FC<RatingProps> = ({ratingNumber = 3.5}) => {
  const {colors} = useTheme();

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 24,
        justifyContent: 'flex-start',
      }}>
      <IconButton
        icon="star"
        size={size.iconSize.medium}
        style={{
          marginRight: 0,
          paddingRight: 0,
        }}
        iconColor={'#FFA902'}
      />
      <TextComponet
        fontSizeVariant={'regular'}
        title={titleCase(`${ratingNumber}`)}
        fontVariant="regular"></TextComponet>
    </View>
  );
};
