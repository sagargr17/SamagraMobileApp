import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

import {View, Text} from 'react-native'; // Import for Tab bar icons or labels
import {HomeStackNavigator} from '../Stack/HomeStackNavigator';
import {ServiceStackNavigator} from '../Stack/ServiceStackNavigator';
import {SamagraScaller} from '../../Utilities/CustomMethods';
import {useTheme} from '@react-navigation/native';
import {Logos} from '../../Assets/SVG/Exports/Exports';
import {ApplicationOverlayStackNavigator} from '../Stack/ApplicationOverlayStackNavigator';
import {HomeScreen} from '../../Screens/Application/Home/HomeScreen';

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
  const {colors} = useTheme();
  return (
    <BottomTabBuilder.Navigator
      screenOptions={({route}) => ({
        header: () => null,
        tabBarIcon: ({focused, color, size}) => {
          const {Home, Service, More} = Logos;
          const iconSize = SamagraScaller({value: 22, scaleBy: 'width'});

          if (route.name === 'Home') {
            return (
              <Home
                height={iconSize}
                focused={focused}
                color={color}
                size={size}
              />
            );
          }
          if (route.name === 'More') {
            return (
              <More
                height={iconSize}
                focused={focused}
                color={color}
                size={size}
              />
            );
          }
          if (route.name === 'Service') {
            return (
              <Service
                height={iconSize}
                focused={focused}
                color={color}
                size={size}
              />
            );
          }
          return null;
        },
        tabBarStyle: {
          borderColor: colors.background,
          backgroundColor: colors.background,
          shadowOpacity: 0, // Use shadowOpacity for iOS
          elevation: 0, // Use elevation for Android
          height: SamagraScaller({
            value: 80,
            scaleBy: 'height',
          }),
          paddingHorizontal: SamagraScaller({
            value: 15,
            scaleBy: 'height',
          }),
          paddingVertical: SamagraScaller({
            value: 30,
            scaleBy: 'height',
          }),
        },
        tabBarLabelStyle: {
          fontSize: SamagraScaller({
            value: 14,
            scaleBy: 'height',
          }),
          lineHeight: SamagraScaller({
            value: 19,
            scaleBy: 'height',
          }),
          fontFamily: 'Poppins-Regular',
        },
      })}
      initialRouteName="Service">
      {screenBuilder([
        {screenName: 'Home', component: HomeStackNavigator},
        {screenName: 'Service', component: ServiceStackNavigator},
        {screenName: 'More', component: HomeScreen},
      ])}
    </BottomTabBuilder.Navigator>
  );
};
