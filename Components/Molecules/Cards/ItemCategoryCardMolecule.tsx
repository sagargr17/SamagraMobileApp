import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {AreaMapper} from '../../../Utilities/CustomMethods';
import {AppTextElement} from '../../Elements/AppTextElement';
import {size} from '../../../Prefrences/Prefrences';
import {Surface} from 'react-native-paper';

interface ItemCategoryCardMoleculeProps {
  title: string;
  icon: any;
  size: 'large' | 'regular';
  selectedCategory: string;
  onPress: () => void;
}

export const ItemCategoryCardMolecule: React.FC<
  ItemCategoryCardMoleculeProps
> = ({title, icon, size: variant = 'large', selectedCategory, onPress}) => {
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
        size.elevation.m,
      ]}>
      <View
        style={[
          {
            backgroundColor:
              selectedCategory === title ? colors.primary : 'gray',

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
          },
        ]}>
        <View>{icon}</View>
        <AppTextElement
          fontSizeVariant={'regular'}
          customStyle={{
            color: colors.background,
            marginTop: size.spacing.xs,
          }}
          title={title}></AppTextElement>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  viewContainer: {},
});
