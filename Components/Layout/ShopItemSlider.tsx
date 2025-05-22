import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {TextComponet} from '../Elements/TextComponet';
import {useTheme} from '@react-navigation/native';
import {SamagraScaller} from '../../Utilities/CustomMethods';
import {ItemViewModel, PageInfo} from '../../src/__generated__/graphql';
interface MyShopItemsSliderProps {
  pageInfo: PageInfo;
}

export const ShopItemsSlider: React.FC<MyShopItemsSliderProps> = ({
  pageInfo,
}) => {
  const {colors} = useTheme();

  return (
    <>
      <TextComponet title="My slider" fontVariant="regular"></TextComponet>
    </>
  );
};
