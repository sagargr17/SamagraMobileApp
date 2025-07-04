import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {AppHeader} from '../../../Components/Organism/AppHeader';
import {Spacer} from '../../../Components/Elements/Spacer';
import {OrderBottomSheet} from '../../../Components/Organism/OrderBottomSheet';
import AppBanner from '../../../Components/Molecules/Global/AppBanner';
interface BuyModeScreenProps {}

export const BuyModeScreen: React.FC<BuyModeScreenProps> = ({}) => {
  const {colors} = useTheme();
  const navigation = useNavigation<any>();

  return (
    <>
      <AppHeader currentPosition="absolute"></AppHeader>
      <OrderBottomSheet navigation={navigation}></OrderBottomSheet>
    </>
  );
};
