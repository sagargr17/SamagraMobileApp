import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';
interface ShopCreatedScreenProps {}

export const ShopCreatedScreen: React.FC<ShopCreatedScreenProps> = ({}) => {
  const {colors} = useTheme();

  return (
    <>
      <Text>SHopCreate Screen</Text>
    </>
  );
};
