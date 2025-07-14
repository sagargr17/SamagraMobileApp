import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';

import {RouteProp, useTheme} from '@react-navigation/native';
import {CategoryListScreen} from '../../Screens/Application/Home/CategoryListScreen';
import {HomeLandingScreen} from '../../Screens/Application/Home/HomeLandingScreen';

type HomeStackParamList = {
  HomeLandingScreen: undefined;
  CategoryListScreen: undefined;
};

export const HomeStackNavigator: React.FC = () => {
  // Its The builder with the
  const HomeStackBuilder = createNativeStackNavigator<HomeStackParamList>();

  type HomeStackNavigationProp<T extends keyof HomeStackParamList> =
    NativeStackNavigationProp<HomeStackParamList, T>;

  interface HomeStackProps<T extends keyof HomeStackParamList> {
    navigation: HomeStackNavigationProp<T>;
  }
  const {colors, fonts} = useTheme();

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
        key={item.screenName}
        options={item.option}
        name={item.screenName}
        component={item.component}></HomeStackBuilder.Screen>
    ));
  };

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

          {
            screenName: 'CategoryListScreen',
            component: CategoryListScreen,
            option: {
              headerTitle: 'Category',
            },
          },
        ])}
      </HomeStackBuilder.Navigator>
    </>
  );
};
