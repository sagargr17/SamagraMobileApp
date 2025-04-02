import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

import {View, Text} from 'react-native'; // Import for Tab bar icons or labels
import {HomeStackNavigator} from '../Stack/HomeStackNavigator';
import {ServiceStackNavigator} from '../Stack/ServiceStackNavigator';

type BottomTabParamList = {
  Home: undefined;
  Service: undefined;
  More: undefined;
};

export const BottomTabBuilder = createBottomTabNavigator<BottomTabParamList>();

export type BottomTabNavProp<T extends keyof BottomTabParamList> =
  BottomTabNavigationProp<BottomTabParamList, T>;

export interface BottomTabProps<T extends keyof BottomTabParamList> {
  navigation: BottomTabNavProp<T>;
}

const screenBuilder = (
  data: Array<{
    screenName: keyof BottomTabParamList;
    component: any;
  }>,
) => {
  return data.map(item => (
    <BottomTabBuilder.Screen
      key={item.screenName}
      name={item.screenName}
      component={item.component}
    />
  ));
};

export const BottomTabNavigator: React.FC = () => {
  return (
    <BottomTabBuilder.Navigator
      screenOptions={{
        // headerStyle: {height: 20},
        header: () => null,
        tabBarStyle: {
          borderWidth: 0,
          // backgroundColor: ,
        },
      }}>
      {screenBuilder([
        {screenName: 'Home', component: HomeStackNavigator},
        {screenName: 'Service', component: ServiceStackNavigator},
        {screenName: 'More', component: ServiceStackNavigator},
      ])}
    </BottomTabBuilder.Navigator>
  );
};
