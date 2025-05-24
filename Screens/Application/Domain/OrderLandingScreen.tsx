import React, {useEffect} from 'react';
import {Text} from 'react-native-paper';

import {MapView} from '@maplibre/maplibre-react-native';
import {StatusBar} from 'react-native';
import {OrderBottomSheet} from '../../../Components/Layout/OrderBottomSheet';
import {RootStackNavigationProp} from '../../../Navigators/RootStackNavigator';
import {UrlTile} from 'react-native-maps';
import {AppHeader} from '../../../Components/Layout/AppHeader';

interface OrderLandingScreenProps {
  navigation: RootStackNavigationProp<'ApplicationOverlay'>;
  // navigation: any;
}
import Geolocation from '@react-native-community/geolocation';

// MapLibreGL.setAccessToken(null);
export const OrderLandingScreen: React.FC<OrderLandingScreenProps> = ({
  navigation,
}) => {
  const apiKey = '2334a549-2942-4103-a5fb-6cc3d2ff1780';
  const styleUrl = `https://tiles.stadiamaps.com/styles/alidade_smooth.json?api_key=${apiKey}`;

  useEffect(() => {
    const config: any = {
      skipPermissionRequests: false, // Set to true if you handle permissions elsewhere
      authorizationLevel: 'whenInUse', // iOS only: 'whenInUse' or 'always'
      locationProvider: 'fused', // Android only: 'auto', 'gps', 'network', or 'fused'
    };

    Geolocation.setRNConfiguration(config);

    let rrr = Geolocation.getCurrentPosition(info =>
      console.log('USER LOCATION ', info),
    );
  }, []);

  return (
    <>
      <AppHeader currentPosition="absolute"></AppHeader>
      <MapView style={{flex: 0.7}} />
      <OrderBottomSheet navigation={navigation}></OrderBottomSheet>
    </>
  );
};
