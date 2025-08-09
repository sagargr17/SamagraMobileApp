import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { ActiveBuyerHomeScreen } from '../../../Components/Organism/ActiveBuyerHomeScreen';
import { ActiveSellerHomeScreen } from '../../../Components/Organism/ActiveSellerHomeScreen';
import { size } from '../../../Prefrences/Prefrences';
import { useAppSelector } from '../../../StateManagement/hooks';

interface HomeLandingScreenProps {}

export const HomeLandingScreen: React.FC<HomeLandingScreenProps> = ({}) => {
  const navigation: any = useNavigation();
  const isBuyMode = useAppSelector(state => state.user.Profile.isBuyMode);

  return (
    <>
      {isBuyMode ? (
        <ActiveSellerHomeScreen></ActiveSellerHomeScreen>
      ) : (
        <ActiveBuyerHomeScreen> </ActiveBuyerHomeScreen>
      )}
    </>   
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  footerLoader: {
    paddingVertical: size.spacing.xs,
  },
});
