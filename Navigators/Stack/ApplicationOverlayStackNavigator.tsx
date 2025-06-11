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
import {TextComponet} from '../../Components/Elements/TextComponet';
import {ReceivedOrderListScreen} from '../../Screens/Application/ReceivedOrdersListScreen';
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

type ApplicationOverlayMoreStackParamList = {
  ReceivedOrderListScreen: undefined;
  ReceivedOfferListScreen: undefined;
  ItemDetailScreen: {
    id: string;
    name: string;
  };
  MyShopItemsScreen: {
    shopName: string;
  };
  AddItemScreen: {
    shopName: string;
  };
  MyShopsScreen: undefined;
  AddShopScreen: undefined;
  OrderScreen: undefined;
  CartScreen: undefined;
  PlaceOrderScreen: undefined;
  OrderSuccessDetailScreen: undefined;
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
          headerRight: () => (
            <TouchableRipple
              onPress={() => {
                console.log('Nanvigation');
                navigation.navigate('ApplicationOverlay', {
                  screen: 'AddShopScreen',
                });
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 0.8,
                  borderRadius: 8,
                  padding: AreaMapper({
                    value: 8,
                    scaleBy: 'average',
                  }),
                  borderColor: colors.border,
                }}>
                <Icon
                  source={'home-edit'}
                  size={20}
                  color={colors.primary}></Icon>
                <TextComponet
                  title="New Shop"
                  fontSizeVariant={'regular'}
                  fontVariant="regular"></TextComponet>
              </View>
            </TouchableRipple>
          ),
          headerBackButtonDisplayMode: 'minimal',
          headerTitleStyle: {
            fontWeight: 'normal',
            color: 'orange',
          },
        }}>
        {screenBuilder([
          {
            screenName: 'ReceivedOrderListScreen',
            component: ReceivedOrderListScreen,
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
          {
            screenName: 'CartScreen',
            component: CartScreen,

            option: {
              header: () => null,
            },
          },
          {
            screenName: 'PlaceOrderScreen',
            component: PlaceOrderScreen,

            option: {
              header: () => null,
            },
          },
          {
            screenName: 'OrderSuccessDetailScreen',
            component: OrderSuccessDetailScreen,

            option: {
              header: () => null,
            },
          },
        ])}
      </ApplicationOverlayStackBuilder.Navigator>
    </>
  );
};
