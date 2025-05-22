import {RouteProp, useTheme} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import {SearchBar} from 'react-native-screens';
import {InstantItemListScreen as OrderListItemListScreen} from '../../Screens/Application/Domain/OrderItemListScreen';
import {AddItemScreen} from '../../Screens/Application/More/Shop/AddItemScreen';
import {ShopItemsScreen} from '../../Screens/Application/More/ShopItemsScreen';
import {ItemDetailScreen} from '../../Screens/OnBoarding/ItemDetailScreen';
import {titleCase} from '../../Utilities/CustomMethods';
import {MyShopsScreen} from '../../Screens/Application/More/MyShopsScreen';
import {ProgressBar} from 'react-native-paper';
import {AddShopScreen} from '../../Screens/Application/More/Shop/AddShopScreen';

type ApplicationOverlayMoreStackParamList = {
  OrderListScreen: undefined;
  ItemDetailScreen: {
    name: string;
  };
  ShopItemsScreen: {
    shopName: string;
  };
  AddItemScreen: {
    shopName: string;
  };
  MyShopsScreen: undefined;
  AddShopScreen: undefined;
};

// Its The builder with the
export const ApplicationOverlayStackBuilder =
  createNativeStackNavigator<ApplicationOverlayMoreStackParamList>();

// While Calling useNnavigation we pass thi type
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

export type AddItemScreenRouteProp = RouteProp<
  ApplicationOverlayMoreStackParamList,
  'AddItemScreen'
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
              title: titleCase(''),
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontFamily: fonts.medium.fontFamily,
                fontSize: 16,
              },
              headerShadowVisible: false,
              SearchBar,
              header: () => null,
            }),
          },
          {
            screenName: 'MyShopsScreen',
            component: MyShopsScreen,
            option: ({route}: {route: any}) => ({
              title: titleCase(''),
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontFamily: fonts.medium.fontFamily,
                fontSize: 16,
              },
              headerShadowVisible: false,
              SearchBar,
              header: () => null,
            }),
          },
          {
            screenName: 'AddItemScreen',
            component: AddItemScreen,

            option: {
              header: () => null,
            },
          },

          {
            screenName: 'AddShopScreen',
            component: AddShopScreen,

            option: {
              header: () => null,
            },
          },
        ])}
      </ApplicationOverlayStackBuilder.Navigator>
    </>
  );
};
