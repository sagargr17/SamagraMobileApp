import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';

import {RouteProp, useTheme} from '@react-navigation/native';
import {CategoryScreen} from '../../Screens/Application/Home/CategoryScreen';
import {HomeLandingScreen} from '../../Screens/Application/Home/HomeLandingScreen';
import {MyItemsScreen} from '../../Screens/Application/More/MyItemsScreen';
import {CategoryScreenItems} from '../../Screens/Application/Home/CategoryItemsScreen';
import {titleCase} from '../../Utilities/CustomMethods';

type HomeStackParamList = {
  HomeLandingScreen: undefined;
  CategoriesScreen: undefined;
  AddServiceScreen: undefined;
  ManageServices: undefined;
  CategoriesItems: {
    title: string;
    categoryId: string;
  };
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
        initialRouteName="HomeLandingScreen"
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
            screenName: 'ManageServices',
            component: MyItemsScreen,
            option: {
              headerTitle: 'Manage Services',
            },
          },
          {
            screenName: 'HomeLandingScreen',
            component: HomeLandingScreen,
            option: {
              header: () => null,
            },
          },

          {
            screenName: 'CategoriesScreen',
            component: CategoryScreen,
            option: {
              headerTitle: 'Categories',
            },
          },
          {
            screenName: 'CategoriesItems',
            component: CategoryScreenItems,
            option: ({route}: {route: any}) => ({
              title: route.params.title,
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontFamily: fonts.medium.fontFamily,
                fontSize: 16,
              },
              headerShadowVisible: false,
            }),
          },
        ])}
      </HomeStackBuilder.Navigator>
    </>
  );
};
