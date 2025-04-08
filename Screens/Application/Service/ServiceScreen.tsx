import React from 'react';
import {Text} from 'react-native-paper';

import {MapView} from '@maplibre/maplibre-react-native';
import {StatusBar} from 'react-native';
import {ServiceBottomSheet} from '../../../Components/Layout/ServiceBottomSheet';
import {RootStackNavigationProp} from '../../../Navigators/RootStackNavigator';
import {UrlTile} from 'react-native-maps';
interface ServiceScreenProps {
  // navigation: RootStackNavigationProp<'ApplicationOverlay'>;
  navigation: any;
}

// MapLibreGL.setAccessToken(null);
export const ServiceScreen: React.FC<ServiceScreenProps> = ({navigation}) => {
  const apiKey = '2334a549-2942-4103-a5fb-6cc3d2ff1780';
  const styleUrl = `https://tiles.stadiamaps.com/styles/alidade_smooth.json?api_key=${apiKey}`;
  return (
    <>
      <MapView style={{flex: 0.8}} />
      <ServiceBottomSheet navigation={navigation}></ServiceBottomSheet>
    </>
  );
};
