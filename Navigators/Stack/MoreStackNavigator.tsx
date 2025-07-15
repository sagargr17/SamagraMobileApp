import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';

import {RouteProp, useRoute, useTheme} from '@react-navigation/native';
import {MoreLandingScreen} from '../../Screens/Application/More/MoreLandingScreen';
import {StockScreen} from '../../Screens/Application/More/StockScreen';
import {PendingOrderScreen} from '../../Screens/Application/More/PendingOrdersScreen';
import {StockUpdateScreen} from '../../Screens/Application/More/StockUpdateScreen';

type MoreStackParamList = {
  MoreLandingScreen: undefined;
  StockScreen: {
    shopId: string;
  };
  StockUpdateScreen: undefined;
  PendingOrderScreen: {
    shopId: string;
  };
};

// Its The builder with the
export const MoreStackBuilder =
  createNativeStackNavigator<MoreStackParamList>();

export type MoreStackNavigationProp<T extends keyof MoreStackParamList> =
  NativeStackNavigationProp<MoreStackParamList, T>;

export interface MoreStackProps<T extends keyof MoreStackParamList> {
  navigation: MoreStackNavigationProp<T>;
}

const screenBuilder = (
  data: Array<{
    screenName: keyof MoreStackParamList;
    component: any;
    // option?: NativeStackNavigationOptions;
    option?:
      | NativeStackNavigationOptions
      | ((props: {
          route: RouteProp<MoreStackParamList, keyof MoreStackParamList>;
          navigation: NativeStackNavigationProp<
            MoreStackParamList,
            keyof MoreStackParamList
          >;
        }) => NativeStackNavigationOptions);
  }>,
) => {
  return data.map(item => (
    <MoreStackBuilder.Screen
      options={item.option}
      key={item.screenName}
      navigationKey={item.screenName}
      name={item.screenName}
      component={item.component}></MoreStackBuilder.Screen>
  ));
};

export const MoreStackNavigator: React.FC = () => {
  const {colors, fonts} = useTheme();

  return (
    <>
      <MoreStackBuilder.Navigator
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
            screenName: 'MoreLandingScreen',
            component: MoreLandingScreen,
            option: {
              header: () => null,
            },
          },

          {
            screenName: 'PendingOrderScreen',
            component: PendingOrderScreen,
            option: {
              headerTitle: 'Pending Orders',
            },
          },
          {
            screenName: 'StockScreen',
            component: StockScreen,
            option: {
              headerTitle: "Stock's",
            },
          },
          {
            screenName: 'StockUpdateScreen',
            component: StockUpdateScreen,
            option: {
              headerTitle: 'Update Your Stock',
            },
          },
        ])}
      </MoreStackBuilder.Navigator>
    </>
  );
};
