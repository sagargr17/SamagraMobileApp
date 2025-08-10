import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {AreaMapper} from '../../../Utilities/CustomMethods';
import {AppText} from '../../Elements/AppText';
import {size} from '../../../Prefrences/Prefrences';
import {Surface} from 'react-native-paper';

interface ItemCategoryCardProps {
  title: string;
  icon: any;
  size: 'large' | 'regular';
  selectedCategory: string;
  onPress: () => void;
}

export const ItemCategoryCard: React.FC<ItemCategoryCardProps> = ({
  title,
  icon,
  size: variant = 'large',
  selectedCategory,
  onPress,
}) => {
  const {colors} = useTheme();
  const fontVariantSize = variant === 'large' ? 'regular' : 'caption';
  const height = variant === 'large' ? 105 : 80;
  const width = variant === 'large' ? 106 : 80;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          marginRight: size.spacing.xs,
        },
      ]}>
      <View
        style={[{
          backgroundColor: selectedCategory === title ? colors.primary : 'gray',

          paddingTop: size.spacing.m,
          width: AreaMapper({
            value: width,
            scaleBy: 'width',
          }),
          height: AreaMapper({
            value: height,
            scaleBy: 'height',
          }),
          alignItems: 'center',
          borderRadius: size.borderRadius.s,
        }, size.elevation.m]}>
        <View>{icon}</View>
        <AppText
          fontVariant="regular"
          fontSizeVariant={fontVariantSize}
          customStyle={{
            color: colors.background,
            // marginTop: size.spacing.s,
          }}
          title={title}></AppText>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  viewContainer: {},
});
