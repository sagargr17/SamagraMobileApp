import React, {useEffect, useState} from 'react';

import {OrderLandingSkeleton} from '../../../Components/Skeletons/Layout/OrderLandingSkeleton';
import {RootStackNavigationProp} from '../../../Navigators/RootStackNavigator';
import {useAppDispatch, useAppSelector} from '../../../StateManagement/hooks';
import {BuyModeScreen} from './BuyModeScreen';
import {SellModeScreen} from './SellModeScreen';
import {useLazyQuery} from '@apollo/client';
import {getLoginUser} from '../../../GraphQL/Queries/UserQueries';
import {setUserProfile} from '../../../StateManagement/User/UserSlice';
import {ImageNotFound} from '../../../Constants/UI/AssetsUrls';
import {showMessage} from 'react-native-flash-message';
import {responseTheme} from '../../../Prefrences/Prefrences';

interface OrderLandingScreenProps {
  navigation: RootStackNavigationProp<'ApplicationOverlay'>;
  // navigation: any;
}

// MapLibreGL.setAccessToken(null);
export const OrderLandingScreen: React.FC<OrderLandingScreenProps> = ({
  navigation,
}) => {
  const isBuyMode = useAppSelector(state => state.user.Profile.isBuyMode);
  const dispatch = useAppDispatch();

  const [getLoginUserFn] = useLazyQuery(getLoginUser);

  useEffect(() => {
    getLoginUserFn()
      .then(data => {
        console.log('Result....', data);
        dispatch(
          setUserProfile({
            username: data.data?.getUser?.username ?? 'Not Mention',
            pofileImageUrl:
              data.data?.getUser?.profileImageUrl ?? ImageNotFound,
            email: 'sagar@gmail.com',
            phoneNumber: '9841150390',
            isBuyMode: false,
          }),
        );
      })
      .catch(error => {
        showMessage(
          responseTheme(
            'User Couldnot be update',
            'We Will fix soon',
            'danger',
          ),
        );
      });
  }, []);

  return (
    <>
      {isBuyMode ? (
        <SellModeScreen></SellModeScreen>
      ) : (
        <BuyModeScreen></BuyModeScreen>
      )}
    </>
  );
};
