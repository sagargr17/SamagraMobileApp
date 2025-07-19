import {RouteProp, useNavigation, useTheme} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import {size} from '../../Prefrences/Prefrences';
import {AddItemScreen} from '../../Screens/Application/AddItemScreen';
import {CartScreen} from '../../Screens/Application/CartScreen';
import {MyShopsScreen} from '../../Screens/Application/More/MyShopsScreen';
import {ProfileSelectScreen} from '../../Screens/Application/More/ProfileSelectScreen';
import {OrderSuccessDetailScreen} from '../../Screens/Application/OrderSuccessDetailScreen';
import {PlaceOrderScreen} from '../../Screens/Application/PlaceOrderScreen';
import {ReceivedOffersListScreen} from '../../Screens/Application/ReceivedOffersListScreen';
import {ReceivedRequestListScreen} from '../../Screens/Application/ReceivedRequestListScreen';
import {ReceivedSuccessOrderScreen} from '../../Screens/Application/ReceivedSuccessOrderScreen';
import {SearchScreen} from '../../Screens/Application/SearchScreen';
import {ShopCreatedScreen} from '../../Screens/Application/ShopCreatedScreen';
import {ItemDetailScreen} from '../../Screens/OnBoarding/ItemDetailScreen';
import {titleCase} from '../../Utilities/CustomMethods';

type ApplicationOverlayMoreStackParamList = {
  ReceivedOrderListScreen: undefined;
  ReceivedOfferListScreen: undefined;
  ReceivedSuccessOrderScreen: undefined;
  ItemDetailScreen: {
    id: string;
    name: string;
  };
  SearchItemScreen: {
    itemType: 'public' | 'shop';
  };
  AddItemScreen: {
    shopId: string;
    shopName: string;
  };
  MyShopsScreen: undefined;
  OrderScreen: undefined;
  CartScreen: undefined;
  PlaceOrderScreen: undefined;
  OrderSuccessDetailScreen: undefined;
  SelectProfile: undefined;
  ShopCreatedScreen: {
    shopID: string;
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
            screenName: 'SearchItemScreen',
            component: SearchScreen,
            option: ({route}: {route: any}) => ({
              title: titleCase('Search Item'),
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontFamily: fonts.medium.fontFamily,
                fontSize: 16,
              },
              headerShadowVisible: false,
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
        ])}
      </ApplicationOverlayStackBuilder.Navigator>
    </>
  );
};
