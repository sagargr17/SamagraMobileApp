import {useIsFocused, useTheme} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React, {useCallback, useEffect} from 'react';
import {hideLoader} from '../StateManagement/Error&loadingHandle/LoaderState';
import {useAppDispatch, useAppSelector} from '../StateManagement/hooks';
import {BottomTabNavigator} from './BottomTab/BottomTabNavigator';
import {ApplicationOverlayStackNavigator} from './Stack/ApplicationOverlayStackNavigator';
import {OnBoardingStackNavigator} from './Stack/OnBoardingStackNavigator';
import {useQuery} from '@apollo/client';
import {getLoginUser} from '../GraphQL/Queries/UserQueries';
import {login} from '../StateManagement/User/UserSlice';
import {State} from 'react-native-gesture-handler';
import {getTokens} from '../client/Token/TokenAccess';
import FlashMessage from 'react-native-flash-message';
import {SamagraScaller} from '../Utilities/CustomMethods';
import {ProgressBar} from 'react-native-paper';

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

  useCallback(() => {
    dispatch(hideLoader());
  }, [isFocused]);

  // UserBased Login

  return (
    <>
      {loaderStatus ? (
        <ProgressBar indeterminate color={colors.primary}></ProgressBar>
      ) : null}
      <RootStackBuilder.Navigator
        screenOptions={{
          header: () => null,
        }}>
        {userSignInStatus === true //change this to true
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
