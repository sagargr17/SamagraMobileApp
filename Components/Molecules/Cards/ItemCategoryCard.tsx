import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {AreaMapper} from '../../../Utilities/CustomMethods';
import {AppText} from '../../Elements/AppText';
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
          marginRight: size.spacing.xs,
          paddingHorizontal: size.spacing.m,
          paddingBottom: size.spacing.xs,
          paddingTop: size.spacing.m,
          borderRadius: size.borderRadius.m,
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          width: AreaMapper({
            value: 106,
            scaleBy: 'width',
          }),
          height: AreaMapper({
            value: 105,
            scaleBy: 'height',
          }),
        },
      ]}>
      <View>{icon}</View>
      <AppText
        fontVariant="regular"
        fontSizeVariant={fontVariantSize}
        customStyle={{
          color: colors.background,
          // marginTop: size.spacing.s,
        }}
        title={title}></AppText>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  viewContainer: {},
});
