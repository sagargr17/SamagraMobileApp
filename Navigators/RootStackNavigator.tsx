import {useLazyQuery} from '@apollo/client';
import {useIsFocused, useNavigation, useTheme} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import FlashMessage from 'react-native-flash-message';
import {ProgressBar} from 'react-native-paper';
import {ImageNotFound} from '../Constants/UI/AssetsUrls';
import {getLoginUser} from '../GraphQL/Queries/UserQueries';
import {size} from '../Prefrences/Prefrences';
import {hideLoader} from '../StateManagement/Error&loadingHandle/LoaderStateSlice';
import {useAppDispatch, useAppSelector} from '../StateManagement/hooks';
import {login} from '../StateManagement/User/UserSlice';
import {AreaMapper} from '../Utilities/CustomMethods';
import {BottomTabNavigator} from './BottomTab/BottomTabNavigator';
import {ApplicationOverlayStackNavigator} from './Stack/ApplicationOverlayStackNavigator';
import {OnBoardingStackNavigator} from './Stack/OnBoardingStackNavigator';
import {State} from 'react-native-gesture-handler';
import {Button, Text} from 'react-native';

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

export const RootStack: React.FC = () => {
  const userSignInStatus = useAppSelector(state => state.user.isAuthenticated);
  const {colors, fonts} = useTheme();
  const loaderStatus = useAppSelector(state => state.loader.isLoading);
  const dispatch = useAppDispatch();
  const font = fonts['regular'];
  const errorResponse = useAppSelector(State => State.error.error);
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(hideLoader());
    }, 2000);
    return () => clearTimeout(timer);
  }, [loaderStatus]);

  // const [getLoginUserFn, {data, loading, error}] = useLazyQuery(getLoginUser);

  // // THis is for the Login USer DAta Retrival
  // useEffect(() => {
  //   getLoginUserFn().then(data => {
  //     dispatch(
  //       login({
  //         user: {
  //           username: data.data?.getUser?.username ?? 'Samagra',
  //           pofileImageUrl:
  //             data.data?.getUser?.profileImageUrl ?? ImageNotFound,
  //           email: 'sagar@gmail.com',
  //           location: 'Baneswor Kathmandu Nepal',
  //           phoneNumber: '9841150390',
  //         },
  //         isAuthenticated: true,
  //       }),
  //     );
  //   });
  // }, []);

  return (
    <>
      {loaderStatus ? (
        <ProgressBar
          visible={loaderStatus}
          color={colors.primary}
          indeterminate={true}
          style={{
            height: size.spacing.xxs,
          }}></ProgressBar>
      ) : null}

      {errorResponse.isErorr ? (
        <>
          <Text>{errorResponse.message}</Text>
          {/* <Button title="Back" onPress={() => navigation.goBack()}></Button> */}
        </>
      ) : (
        <RootStackBuilder.Navigator
          screenOptions={{
            header: () => null,
          }}>
          {/* {userSignInStatus === true //change this to true while deployment */}
          {true === true //change this to true while deployment
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
      )}
    </>
  );
};
