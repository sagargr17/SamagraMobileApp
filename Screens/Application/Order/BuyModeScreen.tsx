import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {AppHeader} from '../../../Components/Organism/AppHeader';
import {Spacer} from '../../../Components/Elements/Spacer';
import {OrderBottomSheet} from '../../../Components/Organism/OrderBottomSheet';
import AppBanner from '../../../Components/Molecules/Global/AppBanner';
import {OrderLandingSkeleton} from '../../../Components/Skeletons/Layout/OrderLandingSkeleton';
interface BuyModeScreenProps {}

export const BuyModeScreen: React.FC<BuyModeScreenProps> = ({}) => {
  const {colors} = useTheme();
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(!loading);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <OrderLandingSkeleton></OrderLandingSkeleton>;

  return (
    <>
      <AppHeader currentPosition="absolute"></AppHeader>
      <OrderBottomSheet navigation={navigation}></OrderBottomSheet>
    </>
  );
};
