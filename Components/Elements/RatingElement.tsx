import React from 'react';
import {StyleSheet, TextStyle, TouchableOpacity, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Icon, IconButton} from 'react-native-paper';
import {AppTextElement} from './AppTextElement';
import {titleCase} from '../../Utilities/CustomMethods';
import {size} from '../../Prefrences/Prefrences';
interface RatingProps {
  ratingNumber?: number;
  textStyle?: TextStyle;
}

export const RatingElement: React.FC<RatingProps> = ({
  ratingNumber = 1 | 2 | 3 | 4 | 5,
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
        // paddingHorizontal: size.spacing.xxs,
      }}>
      {Array(ratingNumber)
        .fill(ratingNumber)
        .map((_, index) => (
          <Icon
            key={index}
            source={'star'}
            size={size.iconSize.medium - 5}
            color={'#FFB401'}></Icon>
        ))}
    </View>
  );
};
