import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import {MoreScreen} from '../../Screens/Application/More/MoreScreen';
import {InstantItemListScreen as OrderListItemListScreen} from '../../Screens/Application/Domain/OrderItemListScreen';
import {RouteProp, useTheme} from '@react-navigation/native';
import {HomeItemDetailScreen} from '../../Screens/Application/Home/HomeItemDetailScreen';
import {titleCase} from '../../Utilities/CustomMethods';
import {ItemDetailScreen} from '../../Screens/OnBoarding/ItemDetailScreen';
import {SearchBar} from 'react-native-screens';
import {ShopItemsScreen} from '../../Screens/Application/More/ShopItemsScreen';

type ApplicationOverlayMoreStackParamList = {
  OrderListScreen: undefined;
  ItemDetailScreen: {
    name: string;
  };
  ShopItemsScreen: {
    shopName: string;
  };
};

// Its The builder with the
export const ApplicationOverlayStackBuilder =
  createNativeStackNavigator<ApplicationOverlayMoreStackParamList>();

export type ApplicationOverlayStackNavigationProp<
  T extends keyof ApplicationOverlayMoreStackParamList,
> = NativeStackNavigationProp<ApplicationOverlayMoreStackParamList, T>;

export interface ApplicationOverlayStackProps<
  T extends keyof ApplicationOverlayMoreStackParamList,
> {
  navigation: ApplicationOverlayStackNavigationProp<T>;
}


// This are the extraction of the individual pros
export type ItemDetailScreenRouteProp = RouteProp<
  ApplicationOverlayMoreStackParamList,
  'ItemDetailScreen'
>;

export type ShopItemScreenRouteProp = RouteProp<
  ApplicationOverlayMoreStackParamList,
  'ShopItemsScreen'
>;






const screenBuilder = (
  data: Array<{
    screenName: keyof ApplicationOverlayMoreStackParamList;
    component: any;
    option?: NativeStackNavigationOptions | any;
  }>,
) => {
  return data.map(item => (
    <ApplicationOverlayStackBuilder.Screen
      options={item.option}
      key={item.screenName}
      navigationKey="LoginFormKey"
      name={item.screenName}
      component={item.component}></ApplicationOverlayStackBuilder.Screen>
  ));
};

export const ApplicationOverlayStackNavigator: React.FC = () => {
  const {fonts, colors} = useTheme();

  return (
    <>
      <ApplicationOverlayStackBuilder.Navigator>
        {screenBuilder([
          {
            screenName: 'OrderListScreen',
            component: OrderListItemListScreen,
            option: {
              header: () => null,
            },
          },
          {
            screenName: 'ItemDetailScreen',
            component: ItemDetailScreen,
            option: ({route}: {route: any}) => ({
              title: titleCase(route.params.name),
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontFamily: fonts.medium.fontFamily,
                fontSize: 16,
              },
              headerShadowVisible: false,
            }),
          },
          {
            screenName: 'ShopItemsScreen',
            component: ShopItemsScreen,
            option: ({route}: {route: any}) => ({
              title: titleCase(route.params.name),
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontFamily: fonts.medium.fontFamily,
                fontSize: 16,
              },
              headerShadowVisible: false,
              SearchBar,
            }),
          },
        ])}
      </ApplicationOverlayStackBuilder.Navigator>
    </>
  );
};
