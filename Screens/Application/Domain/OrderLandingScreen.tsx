import React, {useEffect} from 'react';
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

// MapLibreGL.setAccessToken(null);
export const OrderLandingScreen: React.FC<OrderLandingScreenProps> = ({
  navigation,
}) => {
  return (
    <>
      <AppHeader currentPosition="absolute"></AppHeader>
      <Spacer height={5}></Spacer>

      <MapView style={{flex: 0.7}} />
      <OrderBottomSheet navigation={navigation}></OrderBottomSheet>
    </>
  );
};
