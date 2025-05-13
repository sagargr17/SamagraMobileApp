import {useTheme} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import {useSelector} from 'react-redux';
import {BottomTabNavigator} from './BottomTab/BottomTabNavigator';
import {ApplicationOverlayStackNavigator} from './Stack/ApplicationOverlayStackNavigator';
import {OnBoardingStackNavigator} from './Stack/OnBoardingStackNavigator';
import {useNetInfo} from '@react-native-community/netinfo';

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
  const userSignInStatus = useSelector(
    (state: any) => state.user.isAuthenticated,
  );

  const {colors} = useTheme();

  const netInfo = useNetInfo({
    // reachabilityUrl: 'http://api.samagranepal.com/graphql/',
    reachabilityUrl: 'https://clients3.google.com/generate_204',
    reachabilityTest: async response => response.status === 204,
    reachabilityLongTimeout: 60 * 1000, // 60s
    reachabilityShortTimeout: 5 * 1000, // 5s
    reachabilityRequestTimeout: 15 * 1000, // 15s
    reachabilityShouldRun: () => true,
    shouldFetchWiFiSSID: true, // met iOS requirements to get SSID
    useNativeReachability: false,
  });

  console.log('NetINfo', netInfo);

  return (
    <>
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


