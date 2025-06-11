import {useNavigation, useTheme} from '@react-navigation/native';
import {View} from 'moti';
import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {IconButton, TouchableRipple} from 'react-native-paper';
import {Logos} from '../../Assets/SVG/Exports/Exports';
import {AreaMapper, titleCase, titleRange} from '../../Utilities/CustomMethods';
import {NotifcaitonIcon} from '../Elements/NotifcaitonIcon';
import {TextComponet} from '../Elements/TextComponet';
import {RowFlexLayout} from '../../Layout/PartationLayout/RowFlexLayout';
import {size} from '../../Prefrences/Prefrences';
import {Spacer} from '../Elements/Spacer';
import Geolocation from '@react-native-community/geolocation';

interface AppHeaderProps {
  currentPosition: 'absolute' | 'relative' | 'static';
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  currentPosition = 'relative',
}) => {
  const {Location} = Logos;
  const {colors} = useTheme();
  const [location, setLocation] = useState<string>('Nepal');
  const navigation = useNavigation<any>();

  useEffect(() => {
    // const apiKey = '2334a549-2942-4103-a5fb-6cc3d2ff1780';
    // const styleUrl = `https://tiles.stadiamaps.com/styles/alidade_smooth.json?api_key=${apiKey}`;
    // const config: any = {
    //   skipPermissionRequests: false, // Set to true if you handle permissions elsewhere
    //   authorizationLevel: 'whenInUse', // iOS only: 'whenInUse' or 'always'
    //   locationProvider: 'fused', // Android only: 'auto', 'gps', 'network', or 'fused'
    // };
    // Geolocation.setRNConfiguration(config);
    // let rrr = Geolocation.getCurrentPosition(async info => {
    //   let result = await fetch(
    //     'https://nominatim.openstreetmap.org/reverse?lat=27.6981641&lon=83.4677009&format=jsonv2',
    //   )
    //     .then(qqq => console.log('qqqq', qqq))
    //     .catch(lll => console.log('LLL', lll));
    //   console.log('USER Coord ', info.coords, result);
    // });
    // console.log('RRRR', rrr);
  }, []);

  return (
    <RowFlexLayout
      elevationStyle={{
        backgroundColor: colors.background,
      }}>
      <NotifcaitonIcon></NotifcaitonIcon>
      <RowFlexLayout
        customStyle={{
          borderWidth: size.borderWidth.xs,
          borderColor: colors.border,
          padding: size.spacing.m,
          borderRadius: size.borderRadius.full,
        }}>
        <Location height={size.iconSize.small}></Location>
        <TextComponet
          title={titleCase('Baneswor, Kathmandu')}
          fontVariant="regular"
          fontSizeVariant="regular"></TextComponet>
      </RowFlexLayout>

      <View>
        <IconButton
          rippleColor={colors.card}
          iconColor={colors.text}
          onPress={() =>
            navigation.navigate('ApplicationOverlay', {
              screen: 'CartScreen',
            })
          }
          icon={'cart-outline'}
          size={size.iconSize.medium}
          style={{
            backgroundColor: colors.background,
            borderWidth: 0.3,
            borderColor: colors.border,
          }}></IconButton>
      </View>
    </RowFlexLayout>
  );
};
