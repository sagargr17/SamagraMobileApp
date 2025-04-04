import React from 'react';
import {Text} from 'react-native-paper';

import {MapView} from '@maplibre/maplibre-react-native';
import {StatusBar} from 'react-native';
interface ServiceScreenProps {}

// MapLibreGL.setAccessToken(null);
export const ServiceScreen: React.FC<ServiceScreenProps> = ({}) => {
  const apiKey = '2334a549-2942-4103-a5fb-6cc3d2ff1780';
  const styleUrl = `https://tiles.stadiamaps.com/styles/alidade_smooth.json?api_key=${apiKey}`;
  return (
    <>
      <StatusBar hidden={true} animated={true} />
      <MapView style={{flex: 1}} />
    </>
  );
};
