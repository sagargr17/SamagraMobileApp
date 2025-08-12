import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet} from 'react-native';
import {BuyerHomeLandingScreen} from '../../../Components/Organism/ApplicationOverLays/Home/BuyerHomeLandingOrganism';
import {SellerHomeLandingScreen} from '../../../Components/Organism/ApplicationOverLays/Home/SellerHomeLandingOrganism';
import {size} from '../../../Prefrences/Prefrences';
import {useAppSelector} from '../../../StateManagement/hooks';

interface HomeLandingScreenProps {}

export const HomeLandingScreen: React.FC<HomeLandingScreenProps> = ({}) => {
  const isBuyMode = useAppSelector(state => state.user.Profile.isBuyMode);

  return (
    <>
      {isBuyMode ? (
        <SellerHomeLandingScreen></SellerHomeLandingScreen>
      ) : (
        <BuyerHomeLandingScreen> </BuyerHomeLandingScreen>
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

