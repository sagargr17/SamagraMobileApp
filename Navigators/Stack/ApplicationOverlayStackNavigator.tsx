import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import {MoreScreen} from '../../Screens/Application/More/MoreScreen';
import {InstantItemListScreen} from '../../Screens/Application/Domain/OrderItemListScreen';
import {RouteProp, useTheme} from '@react-navigation/native';
import {HomeItemDetailScreen} from '../../Screens/Application/Home/HomeItemDetailScreen';
import {titleCase} from '../../Utilities/CustomMethods';
import {ItemDetailScreen} from '../../Screens/OnBoarding/ItemDetailScreen';

type ApplicationOverlayMoreStackParamList = {
  ServiceListScreen: undefined;
  ItemDetailScreen: {
    name: string;
  };
};

// Its The builder with the
export const ApplicationOverlayStackBuilder =
  createNativeStackNavigator<ApplicationOverlayMoreStackParamList>();

export type ApplicationOverlayStackNavigationProp<
  T extends keyof ApplicationOverlayMoreStackParamList,
> = NativeStackNavigationProp<ApplicationOverlayMoreStackParamList, T>;

export interface HomeStackProps<
  T extends keyof ApplicationOverlayMoreStackParamList,
> {
  navigation: ApplicationOverlayStackNavigationProp<T>;
}

export type ItemDetailScreenRouteProp = RouteProp<
  ApplicationOverlayMoreStackParamList,
  'ItemDetailScreen'
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
            screenName: 'ServiceListScreen',
            component: InstantItemListScreen,
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
        ])}
      </ApplicationOverlayStackBuilder.Navigator>
    </>
  );
};
