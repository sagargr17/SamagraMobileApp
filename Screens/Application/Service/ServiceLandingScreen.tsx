import React from 'react';
import {Text} from 'react-native-paper';

import {MapView} from '@maplibre/maplibre-react-native';
import {StatusBar} from 'react-native';
import {OrderBottomSheet} from '../../../Components/Layout/OrderBottomSheet';
import {RootStackNavigationProp} from '../../../Navigators/RootStackNavigator';
import {UrlTile} from 'react-native-maps';
import {AppHeader} from '../../../Components/Layout/AppHeader';
interface ServiceLandingScreenProps {
  navigation: RootStackNavigationProp<'ApplicationOverlay'>;
  // navigation: any;
}

// MapLibreGL.setAccessToken(null);
export const ServiceLandingScreen: React.FC<ServiceLandingScreenProps> = ({
  navigation,
}) => {
  const apiKey = '2334a549-2942-4103-a5fb-6cc3d2ff1780';
  const styleUrl = `https://tiles.stadiamaps.com/styles/alidade_smooth.json?api_key=${apiKey}`;
  return (
    <>
      <AppHeader currentPosition="absolute"></AppHeader>
      <MapView style={{flex: 0.7}} />
      <OrderBottomSheet navigation={navigation}></OrderBottomSheet>
    </>
  );
};
