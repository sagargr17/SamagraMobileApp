import {useIsFocused, useTheme} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React, {useCallback, useEffect} from 'react';
import {ProgressBar} from 'react-native-paper';
import {
  hideLoader,
  setLoader,
} from '../StateManagement/Error&loadingHandle/LoaderStateSlice';
import {useAppDispatch, useAppSelector} from '../StateManagement/hooks';
import {BottomTabNavigator} from './BottomTab/BottomTabNavigator';
import {ApplicationOverlayStackNavigator} from './Stack/ApplicationOverlayStackNavigator';
import {OnBoardingStackNavigator} from './Stack/OnBoardingStackNavigator';
import {useSubscription} from '@apollo/client';
import {getSubscribedData} from '../GraphQL/Subscription/Subscription';
import {onDisplayNotification} from '../Screens/Application/ReceivedOrdersListScreen';
import {showMessage} from 'react-native-flash-message';
import {size} from '../Prefrences/Prefrences';

type RootStackParamList = {
  ApplicationOverlay: undefined;
  BottomTab: undefined;
  OnBoarding: undefined;
};

// Its The builder with the
export const RootStackBuilder =
  createNativeStackNavigator<RootStackParamList>();

export type RootStackNavigationProp<T extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, T>;

export interface RootStackProps<T extends keyof RootStackParamList> {
  navigation: RootStackNavigationProp<T>;
}

const screenBuilder = (
  data: Array<{screenName: keyof RootStackParamList; component: any}>,
) => {
  return data.map(item => (
    <RootStackBuilder.Screen
      key={item.screenName}
      navigationKey="LoginFormKey"
      name={item.screenName}
      component={item.component}
    />
  ));
};

export const RootStack: React.FC = () => {
  const userSignInStatus = useAppSelector(state => state.user.isAuthenticated);
  const {colors, fonts} = useTheme();
  const loaderStatus = useAppSelector(state => state.loader.isLoading);
  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();
  const font = fonts['regular'];

  // const {data, loading, error} = useSubscription(getSubscribedData, {
  //   onData: ({client, data}) => {
  //     console.log('Root Sub Data', data);

  //     if (
  //       data.data &&
  //       data.data.events?.eventName &&
  //       data.data.events.data?.itemRequestReceived
  //     ) {
  //       onDisplayNotification(
  //         `${data.data.events.data.itemRequestReceived.name} is requesting from Sagar`,
  //       );
  //       showMessage({
  //         message: `${data.data.events.data.itemRequestReceived.name} is requesting from Sagar`,
  //         type: 'success',
  //       });
  //     }
  //   },
  // });

  // loader Off
  // useCallback(() => {
  //   dispatch(hideLoader());
  // }, [loaderStatus]);

  useEffect(() => {
    console.log('Intervall is called');

    const timer = setTimeout(() => {
      dispatch(hideLoader());
    }, 6000);
    return () => clearTimeout(timer);
  }, [loaderStatus]);

  return (
    <>
      <ProgressBar
        visible={loaderStatus}
        color={colors.primary}
        indeterminate={true}
        style={{
          height: size.spacing.xxs,
        }}></ProgressBar>

      <RootStackBuilder.Navigator
        screenOptions={{
          header: () => null,
        }}>
        {userSignInStatus === true //change this to true while deployment
          ? screenBuilder([
              {screenName: 'BottomTab', component: BottomTabNavigator},
              {
                screenName: 'ApplicationOverlay',
                component: ApplicationOverlayStackNavigator,
              },
            ])
          : screenBuilder([
              {screenName: 'OnBoarding', component: OnBoardingStackNavigator},
            ])}
      </RootStackBuilder.Navigator>
    </>
  );
};
