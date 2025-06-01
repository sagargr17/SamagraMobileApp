import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {TextComponet} from '../../Elements/TextComponet';
import {useTheme} from '@react-navigation/native';
import {AreaMapper} from '../../../Utilities/CustomMethods';

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
  size = 'large',
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
          height: AreaMapper({
            value: size === 'large' ? 100 : 70,
            scaleBy: 'average',
          }),

          marginRight: AreaMapper({
            value: 13,
            scaleBy: 'average',
          }),
          paddingVertical: AreaMapper({
            value: size === 'large' ? 23 : 12,
            scaleBy: 'average',
          }),
          borderRadius: AreaMapper({
            value: 12,
            scaleBy: 'average',
          }),
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          width: AreaMapper({
            value: size === 'large' ? 100 : 70,
            scaleBy: 'average',
          }),
        },
      ]}>
      {icon}
      <TextComponet
        fontVariant="medium"
        fontSize={size === 'large' ? 16 : 12}
        lineHeight={30}
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
