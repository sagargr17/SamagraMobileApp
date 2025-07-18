import Geolocation from '@react-native-community/geolocation';
import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {IconButton} from 'react-native-paper';
import {Logos} from '../../Assets/SVG/Exports/Exports';
import {RowFlexLayout} from '../../Layout/PartationLayout/RowFlexLayout';
import {responseTheme, size} from '../../Prefrences/Prefrences';
import {useAppDispatch, useAppSelector} from '../../StateManagement/hooks';
import {titleRange} from '../../Utilities/CustomMethods';
import {AppText} from '../Elements/AppText';
import {NotifcaitonIcon} from '../Elements/NotifcaitonIcon';
import {setUserLocation} from '../../StateManagement/User/UserSlice';
import {showMessage} from 'react-native-flash-message';

interface AppHeaderProps {
  currentPosition: 'absolute' | 'relative' | 'static';
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  currentPosition = 'relative',
}) => {
  const {Location} = Logos;
  const {colors} = useTheme();
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const location = useAppSelector(state => state.user.userLocation?.address);

  // useEffect(() => {
  //   const reverseGeoCordinationHandle = async (
  //     latitude: number,
  //     longitude: number,
  //   ) => {
  //     console.log('API Calling', latitude, longitude);
  //     // try {
  //     //   let result = await fetch(
  //     //     `https://us1.api-bdc.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
  //     //   );
  //     //   const finalResult = await result.json();

  //     //   if (finalResult)
  //     //     dispatch(
  //     //       setUserLocation({
  //     //         lat: latitude,
  //     //         long: longitude,
  //     //         address: titleRange(
  //     //           `${finalResult.city} ${finalResult.principalSubdivision}`,
  //     //         ),
  //     //       }),
  //     //     );
  //     // } catch (e) {
  //     //   showMessage(
  //     //     responseTheme(
  //     //       'Location Couldnot Found',
  //     //       'We Will Reach You Later',
  //     //       'danger',
  //     //     ),
  //     //   );
  //     // }
  //   };

  //   // Configurations
  //   const config: any = {
  //     skipPermissionRequests: false, // Set to true if you handle permissions elsewhere
  //     authorizationLevel: 'whenInUse', // iOS only: 'whenInUse' or 'always'
  //     locationProvider: 'fused', // Android only: 'auto', 'gps', 'network', or 'fused'
  //   };
  //   Geolocation.setRNConfiguration(config);
  //   Geolocation.getCurrentPosition(result => {
  //     reverseGeoCordinationHandle(
  //       result.coords.latitude,
  //       result.coords.longitude,
  //     );
  //   });
  // }, []);

  return (
    <RowFlexLayout
      customStyle={{
        paddingLeft: size.spacing.xs,
        paddingRight: size.spacing.xxs,
      }}>
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
          title={`${location}`}
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
