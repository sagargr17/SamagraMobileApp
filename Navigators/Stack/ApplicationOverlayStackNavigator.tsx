import {RouteProp, useNavigation, useTheme} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import {View} from 'react-native';
import {Icon, TouchableRipple} from 'react-native-paper';
import {SearchBar} from 'react-native-screens';
import {AppText} from '../../Components/Elements/AppText';
import {ReceivedRequestListScreen} from '../../Screens/Application/ReceivedRequestListScreen';
import {MyShopsScreen} from '../../Screens/Application/More/MyShopsScreen';
import {AddItemScreen} from '../../Screens/Application/AddItemScreen';
import {AddShopScreen} from '../../Screens/Application/AddShopScreen';
import {MyShopItemsScreen} from '../../Screens/Application/More/MyShopItemsScreen';
import {ItemDetailScreen} from '../../Screens/OnBoarding/ItemDetailScreen';
import {AreaMapper, titleCase} from '../../Utilities/CustomMethods';
import {ReceivedOffersListScreen} from '../../Screens/Application/ReceivedOffersListScreen';
import {CartScreen} from '../../Screens/Application/CartScreen';
import {PlaceOrderScreen} from '../../Screens/Application/PlaceOrderScreen';
import {OrderSuccessDetailScreen} from '../../Screens/Application/OrderSuccessDetailScreen';
import {ProfileSelectScreen} from '../../Screens/Application/More/ProfileSelectScreen';
import {size} from '../../Prefrences/Prefrences';
import {ShopCreatedScreen} from '../../Screens/Application/ShopCreatedScreen';
import {ReceivedSuccessOrderScreen} from '../../Screens/Application/ReceivedSuccessOrderScreen';
import {StockScreen} from '../../Screens/Application/More/StockScreen';
import {StockUpdateScreen} from '../../Screens/Application/More/StockUpdateScreen';

type ApplicationOverlayMoreStackParamList = {
  ReceivedOrderListScreen: undefined;
  ReceivedOfferListScreen: undefined;
  ReceivedSuccessOrderScreen: undefined;
  ItemDetailScreen: {
    id: string;
    name: string;
  };
  MyShopItemsScreen: {
    shopName: string;
    shopId: string;
  };
  AddItemScreen: {
    shopId: string;
    shopName: string;
  };
  MyShopsScreen: undefined;
  AddShopScreen: undefined;
  OrderScreen: undefined;
  CartScreen: undefined;
  PlaceOrderScreen: undefined;
  OrderSuccessDetailScreen: undefined;
  SelectProfile: undefined;
  ShopCreatedScreen: {
    shopID: string;
  };
  StockScreen: {
    shopId: string;
  };
  StockUpdateScreen: undefined;
  PendingOrderScreen: {
    shopId: string;
  };
};

// Its The builder with the
export const ApplicationOverlayStackBuilder =
  createNativeStackNavigator<ApplicationOverlayMoreStackParamList>();

// While Calling useNnavigation we pass this type
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
  'MyShopItemsScreen'
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
  const navigation = useNavigation<any>();

  return (
    <>
      <ApplicationOverlayStackBuilder.Navigator
        screenOptions={{
          headerBackButtonDisplayMode: 'minimal',
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: size.textVariants.title.fontSize,
            fontFamily: fonts.regular.fontFamily,
            fontWeight: fonts.regular.fontWeight,
          },
          headerShadowVisible: false,
        }}>
        {screenBuilder([
          {
            screenName: 'ReceivedOrderListScreen',
            component: ReceivedRequestListScreen,
            option: {
              header: () => null,
            },
          },
          {
            screenName: 'ReceivedOfferListScreen',
            component: ReceivedOffersListScreen,
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
            screenName: 'MyShopItemsScreen',
            component: MyShopItemsScreen,
            option: ({route}: {route: any}) => ({
              title: titleCase(route.params.shopName),
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontFamily: fonts.medium.fontFamily,
                fontSize: 16,
              },
              headerShadowVisible: false,
              SearchBar,
            }),
          },
          {
            screenName: 'MyShopsScreen',
            component: MyShopsScreen,
            option: ({route}: {route: any}) => ({
              title: titleCase('My Shops'),
              headerTitleAlign: 'left',
              headerTitleStyle: {
                fontFamily: fonts.medium.fontFamily,
                fontSize: 16,
              },
              headerShadowVisible: false,
            }),
          },
          {
            screenName: 'AddItemScreen',
            component: AddItemScreen,
            option: ({route}: {route: any}) => ({
              title: titleCase(route.params.shopName),
            }),
          },

          {
            screenName: 'AddShopScreen',
            component: AddShopScreen,
          },
          {
            screenName: 'CartScreen',
            component: CartScreen,
            option: ({route}: {route: any}) => ({
              title: titleCase('Cart'),
            }),
          },
          {
            screenName: 'PlaceOrderScreen',
            component: PlaceOrderScreen,

            option: ({route}: {route: any}) => ({
              title: titleCase('Order'),
            }),
          },
          {
            screenName: 'OrderSuccessDetailScreen',
            component: OrderSuccessDetailScreen,

            option: ({route}: {route: any}) => ({
              title: titleCase('Receipt'),
            }),
          },
          {
            screenName: 'ReceivedSuccessOrderScreen',
            component: ReceivedSuccessOrderScreen,

            option: ({route}: {route: any}) => ({
              title: titleCase('Receipt'),
            }),
          },
          {
            screenName: 'SelectProfile',
            component: ProfileSelectScreen,
            option: {
              headerTitle: "Profile's",
            },
          },
          {
            screenName: 'ShopCreatedScreen',
            component: ShopCreatedScreen,
            option: {
              header: () => null,
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
      </ApplicationOverlayStackBuilder.Navigator>
    </>
  );
};
