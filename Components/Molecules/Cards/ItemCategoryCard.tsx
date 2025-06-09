import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {TextComponet} from '../../Elements/TextComponet';
import {useTheme} from '@react-navigation/native';
import {AreaMapper} from '../../../Utilities/CustomMethods';
import { size } from '../../../Prefrences/Prefrences';

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

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          backgroundColor: selectedCategory === title ? colors.primary : 'gray',
          height:70,
          marginRight:size.spacing.xs,
          borderRadius:size.borderRadius.m,
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          width: AreaMapper({
            value: variant === 'large' ? 100 : 70,
            scaleBy: 'average',
          }),
        },
      ]}>
      <View
        style={
          {
            // marginVertical:
          }
        }>
        {icon}
      </View>
      <TextComponet
        fontVariant="regular"
        fontSizeVariant="caption"
        customStyle={{
          color: colors.background,
        }}
        title={title}></TextComponet>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  viewContainer: {},
});
