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
import {CompleteOrderScreen} from '../../Screens/Application/CompleteOrderScreen';
import {ItemAddedScreen} from '../../Screens/Application/ItemAddedScreen';
import {OffersScreen} from '../../Screens/Application/OffersScreen';
import {PlaceOrderScreen} from '../../Screens/Application/PlaceOrderScreen';
import {SearchScreen} from '../../Screens/Application/SearchScreen';
import {ItemDetailScreen} from '../../Screens/OnBoarding/ItemDetailScreen';
import {titleCase} from '../../Utilities/CustomMethods';
import {OrderSuccessDetailScreen} from '../../Screens/Application/OrderSuccessDetailScreen';

type ApplicationOverlayMoreStackParamList = {
  OffersScreen: undefined;
  ItemDetailScreen: {
    id: string;
    name: string;
  };
  SearchItemScreen: {
    itemType: 'public' | 'shop';
  };
  AddItemScreen: {
    shopName: string;
  };
  MyShopsScreen: undefined;
  OrderScreen: undefined;
  CartScreen: undefined;
  PlaceOrderScreen: undefined;
  CompleteOrderScreen: undefined;
  SelectProfile: undefined;
  ShopCreatedScreen: {
    shopID: string;
  };
  ItemAddedScreen: undefined;
  OrderSuccessDetailScreen: undefined;
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
            screenName: 'OffersScreen',
            component: OffersScreen,
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
            screenName: 'AddItemScreen',
            component: AddItemScreen,
            option: ({route}: {route: any}) => ({
              title: 'Add Item',
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
            screenName: 'CompleteOrderScreen',
            component: CompleteOrderScreen,

            option: ({route}: {route: any}) => ({
              title: titleCase('Receipt'),
            }),
          },

          {
            screenName: 'ItemAddedScreen',
            component: ItemAddedScreen,
            option: {
              headerTitle: 'Receipt',
            },
          },
          {
            screenName: 'OrderSuccessDetailScreen',
            component: OrderSuccessDetailScreen,
            option: {
              headerTitle: 'Confirmation',
            },
          },
        ])}
      </ApplicationOverlayStackBuilder.Navigator>
    </>
  );
};
