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
        paddingHorizontal: size.spacing.xxs,

      }}>
      <Icon
        source={'star'}
        size={size.iconSize.medium-2}
        color={'#FFB401'}></Icon>
      <AppText
        fontSizeVariant={'regular'}
        customStyle={textStyle}
        title={titleCase(`${ratingNumber}`)}
        fontVariant="regular"></AppText>
    </View>
  );
};
