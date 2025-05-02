import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {useTheme} from '@react-navigation/native';
import {TextComponet} from '../../../Components/Elements/TextComponet';

interface ShopItemsScreenProps {}

export const ShopItemsScreen: React.FC<ShopItemsScreenProps> = ({}) => {
  const {colors} = useTheme();

  return (
    <>
      <TextComponet title="MySHopItems" fontVariant="regular"></TextComponet>
    </>
  );
};
