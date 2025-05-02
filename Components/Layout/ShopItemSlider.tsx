import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {TextComponet} from '../Elements/TextComponet';
import {useTheme} from '@react-navigation/native';
import {SamagraScaller} from '../../Utilities/CustomMethods';
interface MyShopItemsSliderProps {}

export const ShopItemsSlider: React.FC<MyShopItemsSliderProps> = ({}) => {
  const {colors} = useTheme();

  return (
    <>
      <TextComponet title="My slider" fontVariant="regular"></TextComponet>
    </>
  );
};
