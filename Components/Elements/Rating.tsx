import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Icon, IconButton} from 'react-native-paper';
import {TextComponet} from './TextComponet';
import {titleCase} from '../../Utilities/CustomMethods';
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
        size={20}
        style={{
          marginRight: 0,
          paddingRight: 0,
        }}
        iconColor={'#FFA902'}
      />
      <TextComponet
        fontSize={14}
        title={titleCase(`${ratingNumber}`)}
        fontVariant="regular"></TextComponet>
    </View>
  );
};
