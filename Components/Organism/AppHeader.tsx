import {useNavigation, useTheme} from '@react-navigation/native';
import {View} from 'moti';
import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {IconButton, TouchableRipple} from 'react-native-paper';
import {Logos} from '../../Assets/SVG/Exports/Exports';
import {AreaMapper, titleCase, titleRange} from '../../Utilities/CustomMethods';
import {NotifcaitonIcon} from '../Elements/NotifcaitonIcon';
import {AppText} from '../Elements/AppText';
import {RowFlexLayout} from '../../Layout/PartationLayout/RowFlexLayout';
import {size} from '../../Prefrences/Prefrences';
import {Spacer} from '../Elements/Spacer';
import Geolocation from '@react-native-community/geolocation';
import {useAppSelector} from '../../StateManagement/hooks';

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

  // useEffect(() => {
  //   // const test = async () => {
  //   //   let result = await fetch(
  //   //     'https://nominatim.openstreetmap.org/reverse?lat=27.6981641&lon=83.4677009&format=jsonv2',
  //   //   );
  //   //   const f = await JSON.stringify(result);
  //   //   console.log('Location Result', f);
  //   // };
  //   // test();
  //   // const apiKey = '2334a549-2942-4103-a5fb-6cc3d2ff1780';
  //   // const config: any = {
  //   //   skipPermissionRequests: false, // Set to true if you handle permissions elsewhere
  //   //   authorizationLevel: 'whenInUse', // iOS only: 'whenInUse' or 'always'
  //   //   locationProvider: 'fused', // Android only: 'auto', 'gps', 'network', or 'fused'
  //   // };
  //   // Geolocation.setRNConfiguration(config);
  //   // let rrr = Geolocation.getCurrentPosition(async info => {
  //   // });
  //   // console.log('RRRR', rrr);
  // }, []);

  const userLocation = useAppSelector(state => state.user.user?.location);
  return (
    <RowFlexLayout>
      <NotifcaitonIcon></NotifcaitonIcon>
      <RowFlexLayout
        customStyle={{
          borderWidth: size.borderWidth.s,
          borderColor: colors.border,
          padding: size.spacing.m,
          borderRadius: size.borderRadius.full,
        }}>
        <Location height={size.iconSize.small}></Location>
        <AppText
          title={titleRange(`${userLocation}`, 25)}
          fontVariant="medium"
          fontSizeVariant="regular"></AppText>
      </RowFlexLayout>

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
        style={[
          {
            borderWidth: size.borderWidth.s,
            borderColor: colors.border,
          },
        ]}></IconButton>
    </RowFlexLayout>
  );
};
