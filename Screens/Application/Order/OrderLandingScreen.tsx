import React, { useEffect, useState } from 'react';

import { OrderLandingSkeleton } from '../../../Components/Skeletons/Layout/OrderLandingSkeleton';
import { RootStackNavigationProp } from '../../../Navigators/RootStackNavigator';
import { useAppSelector } from '../../../StateManagement/hooks';
import { BuyModeScreen } from './BuyModeScreen';
import { SellModeScreen } from './SellModeScreen';

interface OrderLandingScreenProps {
  navigation: RootStackNavigationProp<'ApplicationOverlay'>;
  // navigation: any;
}

// MapLibreGL.setAccessToken(null);
export const OrderLandingScreen: React.FC<OrderLandingScreenProps> = ({
  navigation,
}) => {
  const isBuyMode = useAppSelector(state => state.user.user.isBuyMode);
  
 

  return (
    <>
      {isBuyMode ? (
        <SellModeScreen></SellModeScreen>
      ) : (
        <BuyModeScreen></BuyModeScreen>
      )}
    </>
  );
};
