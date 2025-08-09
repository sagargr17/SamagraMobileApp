import { useTheme } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import { OrderLandingScreen } from '../../Screens/Application/Order/OrderLandingScreen';

type ServiceStackParamList = {
  OrderLandingScreen: undefined;
  CategoriesScreen: undefined;
  AddServiceScreen: undefined;
  ServiceAddedScreen: undefined;
};

// Its The builder with the
export const OrderStackBuilder =
  createNativeStackNavigator<ServiceStackParamList>();

export type HomeStackNavigationProp<T extends keyof ServiceStackParamList> =
  NativeStackNavigationProp<ServiceStackParamList, T>;

export interface HomeStackProps<T extends keyof ServiceStackParamList> {
  navigation: HomeStackNavigationProp<T>;
}

const screenBuilder = (
  data: Array<{screenName: keyof ServiceStackParamList; component: any}>,
) => {
  return data.map(item => (
    <OrderStackBuilder.Screen
      key={item.screenName}
      navigationKey="LoginFormKey"
      name={item.screenName}
      component={item.component}></OrderStackBuilder.Screen>
  ));
};

export const OrderStackNavigator: React.FC = () => {
  const {colors, fonts} = useTheme();

  return (
    <>
      <OrderStackBuilder.Navigator
        screenOptions={{
          header: () => null,
        }}>
        {screenBuilder([
          {screenName: 'OrderLandingScreen', component: OrderLandingScreen},
        ])}
      </OrderStackBuilder.Navigator>
    </>
  );
};
