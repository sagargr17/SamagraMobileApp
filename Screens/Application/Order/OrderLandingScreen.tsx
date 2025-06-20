import React, {useEffect, useState} from 'react';
import {Text} from 'react-native-paper';

import {MapView} from '@maplibre/maplibre-react-native';
import {StatusBar} from 'react-native';
import {OrderBottomSheet} from '../../../Components/Organism/OrderBottomSheet';
import {RootStackNavigationProp} from '../../../Navigators/RootStackNavigator';
import {UrlTile} from 'react-native-maps';
import {AppHeader} from '../../../Components/Organism/AppHeader';

interface OrderLandingScreenProps {
  navigation: RootStackNavigationProp<'ApplicationOverlay'>;
  // navigation: any;
}
import Geolocation from '@react-native-community/geolocation';
import {Spacer} from '../../../Components/Elements/Spacer';
import {OrderLandingSkeleton} from '../../../Components/Skeletons/Layout/OrderLandingSkeleton';

// MapLibreGL.setAccessToken(null);
export const OrderLandingScreen: React.FC<OrderLandingScreenProps> = ({
  navigation,
}) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log('Intervall is called');

    const timer = setTimeout(() => {
      setLoading(!loading);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <OrderLandingSkeleton></OrderLandingSkeleton>;

  return (
    <>
      <AppHeader currentPosition="absolute"></AppHeader>
      <Spacer></Spacer>
      <MapView style={{flex: 0.7}} />
      <OrderBottomSheet navigation={navigation}></OrderBottomSheet>
    </>
  );
};
