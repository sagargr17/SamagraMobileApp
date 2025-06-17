import React from 'react';
import {StyleSheet, TextStyle, TouchableOpacity, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Icon, IconButton} from 'react-native-paper';
import {AppText} from './AppText';
import {titleCase} from '../../Utilities/CustomMethods';
import {size} from '../../Prefrences/Prefrences';
interface RatingProps {
  ratingNumber?: number;
  textStyle?: TextStyle;
}

export const Rating: React.FC<RatingProps> = ({
  ratingNumber = 3.5,
  textStyle,
}) => {
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
        size={size.iconSize.small+4}
        style={{
          marginRight: 0,
          paddingRight: 0,
          left: 5,
        }}
        iconColor={'#FFA902'}
      />
      <AppText
        fontSizeVariant={'regular'}
        customStyle={textStyle}
        title={titleCase(`${ratingNumber}`)}
        fontVariant="regular"></AppText>
    </View>
  );
};
