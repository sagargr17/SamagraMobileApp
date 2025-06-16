import {useIsFocused, useTheme} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {ProgressBar} from 'react-native-paper';
import {size} from '../Prefrences/Prefrences';
import {useAppDispatch, useAppSelector} from '../StateManagement/hooks';
import {BottomTabNavigator} from './BottomTab/BottomTabNavigator';
import {ApplicationOverlayStackNavigator} from './Stack/ApplicationOverlayStackNavigator';
import {OnBoardingStackNavigator} from './Stack/OnBoardingStackNavigator';
import {useLazyQuery} from '@apollo/client';
import {getLoginUser} from '../GraphQL/Queries/UserQueries';
import {login} from '../StateManagement/User/UserSlice';
import {ImageNotFound} from '../Constants/UI/AssetsUrls';
import {hideLoader} from '../StateManagement/Error&loadingHandle/LoaderStateSlice';

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

  const [getLoginUserFn, {data, loading, error}] = useLazyQuery(getLoginUser);
  // THis is for the Login USer DAta Retrival
  useEffect(() => {
    getLoginUserFn().then(data => {
      console.log('Updated Data', data);
      dispatch(
        login({
          user: {
            username: data.data?.getUser?.username ?? 'Samagra',
            pofileImageUrl:
              data.data?.getUser?.profileImageUrl ?? ImageNotFound,
            email: 'sagar@gmail.com',
            location: 'Butwal',
          },
          isAuthenticated: true,
        }),
      );
    });
  }, []);

  return (
    <>
      <ProgressBar
        visible={loaderStatus}
        color={colors.primary}
        indeterminate={true}
        style={{
          height: size.spacing.xxs,
        }}></ProgressBar>
      {/* {loaderStatus ?? (
      )} */}

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
