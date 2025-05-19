import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import {TestScreen} from '../../Screens/Application/User/TestScreen';

import {heightPercentageToDP} from 'react-native-responsive-screen';
import {HomeLandingScreen} from '../../Screens/Application/Home/HomeLandingScreen';
import {RouteProp, useTheme} from '@react-navigation/native';
import {titleCase} from '../../Utilities/CustomMethods';
import {CategoryListScreen} from '../../Screens/Application/Home/CategoryListScreen';
import {ProgressBar, Provider} from 'react-native-paper';

type HomeStackParamList = {
  HomeLandingScreen: undefined;
  HomeDetailScreen: {
    name: string;
  };
  CategoryListScreen: undefined;
};

// Its The builder with the
export const HomeStackBuilder =
  createNativeStackNavigator<HomeStackParamList>();

export type HomeStackNavigationProp<T extends keyof HomeStackParamList> =
  NativeStackNavigationProp<HomeStackParamList, T>;

export interface HomeStackProps<T extends keyof HomeStackParamList> {
  navigation: HomeStackNavigationProp<T>;
}

const screenBuilder = (
  data: Array<{
    screenName: keyof HomeStackParamList;
    component: any;
    // option?: NativeStackNavigationOptions;
    option?:
      | NativeStackNavigationOptions
      | ((props: {
          route: RouteProp<HomeStackParamList, keyof HomeStackParamList>;
          navigation: NativeStackNavigationProp<
            HomeStackParamList,
            keyof HomeStackParamList
          >;
        }) => NativeStackNavigationOptions);
  }>,
) => {
  return data.map(item => (
    <HomeStackBuilder.Screen
      options={item.option}
      key={item.screenName}
      navigationKey={Math.random().toString()}
      name={item.screenName}
      component={item.component}></HomeStackBuilder.Screen>
  ));
};

export const HomeStackNavigator: React.FC = () => {
  const {colors, fonts} = useTheme();

  return (
    <>
      <HomeStackBuilder.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: fonts.medium.fontFamily,
            fontSize: 16,
          },
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: colors.background,
          },
        }}>
        {screenBuilder([
          {
            screenName: 'HomeLandingScreen',
            component: HomeLandingScreen,
            option: {
              header: () => null,
            },
          },

          {screenName: 'CategoryListScreen', component: CategoryListScreen},
        ])}
      </HomeStackBuilder.Navigator>
    </>
  );
};
