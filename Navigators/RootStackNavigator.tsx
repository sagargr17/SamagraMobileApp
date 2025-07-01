import {useLazyQuery} from '@apollo/client';
import {useNavigation, useTheme} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {Text} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import {ImageNotFound} from '../Constants/UI/AssetsUrls';
import {getLoginUser} from '../GraphQL/Queries/UserQueries';
import {size} from '../Prefrences/Prefrences';
import {
  hideLoader,
  showLoader,
} from '../StateManagement/Error&loadingHandle/LoaderStateSlice';
import {useAppDispatch, useAppSelector} from '../StateManagement/hooks';
import {login} from '../StateManagement/User/UserSlice';
import {BottomTabNavigator} from './BottomTab/BottomTabNavigator';
import {ApplicationOverlayStackNavigator} from './Stack/ApplicationOverlayStackNavigator';
import {OnBoardingStackNavigator} from './Stack/OnBoardingStackNavigator';
import {Logos} from '../Assets/SVG/Exports/Exports';
import {SingnlePageInfo} from '../Components/Organism/SinglePageInfo';
import {AreaMapper} from '../Utilities/CustomMethods';
import {client} from '../App';
import {setError} from '../StateManagement/Error&loadingHandle/ErrorHandlingSlice';

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
  const {colors} = useTheme();
  const loaderStatus = useAppSelector(state => state.loader.isLoading);
  const errorResponse = useAppSelector(State => State.error.error);
  const {InternetUnAvailable} = Logos;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(hideLoader());
    }, 3000);
    return () => clearTimeout(timer);
  }, [loaderStatus]);

  // THis is for the Login USer DAta Retrival

  // It Checks and reset the internet if nentwork is restroed
  const handleResetInternet = () => {
    dispatch(showLoader());
    client.resetStore().then((x: any) => {
      if (x[0].data) {
        dispatch(
          setError({
            error: {
              isErorr: false,
            },
          }),
        );
      }
    });
  };

  return (
    <>
      {loaderStatus ? (
        <ProgressBar
          style={{
            height: 3,
          }}
          visible={loaderStatus}
          color={colors.primary}
          indeterminate={true}></ProgressBar>
      ) : null}

      <RootStackBuilder.Navigator
        screenOptions={{
          header: () => null,
        }}>
        {userSignInStatus === true ? ( //change this to true while deployment
          errorResponse.isErorr ? (
            <SingnlePageInfo
              icon={
                <InternetUnAvailable
                  height={AreaMapper({value: 180})}></InternetUnAvailable>
              }
              detail={{
                title: `${errorResponse.message}`,
                message: 'Please Check Your connectivity and try again',
                buttonTitle: 'Try Again!',
                onButtonPress: handleResetInternet,
              }}
            />
          ) : (
            screenBuilder([
              {screenName: 'BottomTab', component: BottomTabNavigator},
              {
                screenName: 'ApplicationOverlay',
                component: ApplicationOverlayStackNavigator,
              },
            ])
          )
        ) : (
          screenBuilder([
            {screenName: 'OnBoarding', component: OnBoardingStackNavigator},
          ])
        )}
      </RootStackBuilder.Navigator>
    </>
  );
};
