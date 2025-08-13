import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {AppHeaderOrganism} from '../../../Components/Organism/ApplicationOverLays/AppHeaderOrganism';
import {SpacerElement} from '../../../Components/Elements/SpacerElement';
import {OrderBottomSheet} from '../../../Components/Organism/ApplicationOverLays/OrderBottomSheetOrganism';
import AppBannerMolecule from '../../../Components/Molecules/Global/AppBannerMolecule';
import {OrderLandingSkeleton} from '../../../Components/Skeletons/Layout/OrderLandingSkeleton';
import {MapView} from '@maplibre/maplibre-react-native';
import {size} from '../../../Prefrences/Prefrences';
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
      <SpacerElement height={10}></SpacerElement>
      <View
        style={{
          paddingHorizontal: size.spacing.s,
        }}>
        <AppHeaderOrganism currentPosition="absolute"></AppHeaderOrganism>
      </View>
      <SpacerElement height={16}></SpacerElement>
      <MapView style={{flex: 0.7}} />
      <OrderBottomSheet navigation={navigation}></OrderBottomSheet>
    </>
  );
};
