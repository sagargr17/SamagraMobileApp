import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {AreaMapper} from '../../../Utilities/CustomMethods';
import {TextComponet} from '../../Elements/TextComponet';
import {size} from '../../../Prefrences/Prefrences';

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

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          backgroundColor: selectedCategory === title ? colors.primary : 'gray',
          marginRight: 10,
          paddingVertical: AreaMapper({
            value: variant === 'large' ? size.spacing.m : size.spacing.m,
            scaleBy: 'average',
          }),
          borderRadius: size.borderRadius.s,
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          width: AreaMapper({
            value: variant === 'large' ? 100 : 85,
            scaleBy: 'average',
          }),
        },
      ]}>
      <View>{icon}</View>
      <TextComponet
        fontVariant="regular"
        fontSizeVariant={fontVariantSize}
        customStyle={{
          color: colors.background,
          marginTop:size.spacing.xs
        }}
        title={title}></TextComponet>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  viewContainer: {},
});
