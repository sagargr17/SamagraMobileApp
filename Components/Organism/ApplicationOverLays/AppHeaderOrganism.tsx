import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {Icon, IconButton} from 'react-native-paper';
import {Logos} from '../../../Assets/SVG/Exports/Exports';
import {RowFlexLayout} from '../../../Layout/PartationLayout/RowFlexLayout';
import {size} from '../../../Prefrences/Prefrences';
import {useAppDispatch, useAppSelector} from '../../../StateManagement/hooks';
import {AppTextElement} from '../../Elements/AppTextElement';
import {NotificationIconElement} from '../../Elements/NotificationIconElement';
import {SpacerElement} from '../../Elements/SpacerElement';
import {titleCase} from '../../../Utilities/CustomMethods';
import {TouchableOpacity} from 'react-native';

interface AppHeaderOrganismProps {
  currentPosition: 'absolute' | 'relative' | 'static';
}

export const AppHeaderOrganism: React.FC<AppHeaderOrganismProps> = ({
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
    <>
      <SpacerElement></SpacerElement>
      <SpacerElement></SpacerElement>
      <RowFlexLayout>
        <NotificationIconElement></NotificationIconElement>
        <RowFlexLayout
          customStyle={[
            {
              borderColor: colors.border,
              borderRadius: size.borderRadius.full,
              backgroundColor: colors.background,
              flex: 0.8,
              justifyContent: 'flex-start',
              padding: size.spacing.s + 2,
              alignItems: 'center',
            },
            size.elevation.s,
          ]}>
          <Location height={size.iconSize.small}></Location>
          <AppTextElement
            customStyle={{
              marginLeft: size.spacing.xs + 2,
            }}
            title={`${titleCase(location)}`}
            fontVariant="medium"
            fontSizeVariant="title"></AppTextElement>
        </RowFlexLayout>

        <TouchableOpacity
          style={[
            {
              borderWidth: size.borderWidth.xs,
              borderRadius: size.borderRadius.full,
              alignItems: 'center',
              paddingHorizontal: size.spacing.s - 1,
              paddingVertical: size.spacing.xs + 5,
              backgroundColor: colors.background,
            },

            size.elevation.s,
          ]}>
          <Icon size={size.iconSize.large} source={'cart-outline'}></Icon>
        </TouchableOpacity>
      </RowFlexLayout>
    </>
  );
};
