import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {AreaMapper} from '../../../Utilities/CustomMethods';
import {AppText} from '../../Elements/AppText';
import {size} from '../../../Prefrences/Prefrences';
import {Surface} from 'react-native-paper';
import {Spacer} from '../../Elements/Spacer';

interface ItemCategoryCardProps {
  title: string;
  icon: any;
  size: 'large' | 'regular';
  selectedCategory: string;
  onPress: any;
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
  const height = variant === 'large' ? 95 : 85;
  const width = variant === 'large' ? 95 : 85;
  const navigation: any = useNavigation();

  // Navigation press

  return (
    <TouchableOpacity
      // onPress={() => {
      //   navigation.navigate('CategoryListScreen');
      // }}
      onPress={onPress}
      style={[
        {
          marginRight: size.spacing.xs,
        },
        size.elevation.l,
      ]}>
      <View
        style={[
          {
            backgroundColor:
              selectedCategory === title ? colors.primary : 'gray',

            paddingTop: size.spacing.m + 2,
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
        <Spacer height={5}></Spacer>
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
