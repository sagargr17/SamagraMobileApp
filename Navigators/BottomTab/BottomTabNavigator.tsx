import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import React from 'react';

import {useTheme} from '@react-navigation/native';
import {Logos} from '../../Assets/SVG/Exports/Exports';
import {AreaMapper} from '../../Utilities/CustomMethods';
import {HomeStackNavigator} from '../Stack/HomeStackNavigator';
import {MoreStackNavigator} from '../Stack/MoreStackNavigator';
import {ServiceStackNavigator} from '../Stack/ServiceStackNavigator';
import {size} from '../../Prefrences/Prefrences';
import {View} from 'moti';

type BottomTabParamList = {
  Home: undefined;
  Order: undefined;
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
  const {colors, fonts} = useTheme();
  return (
    <BottomTabBuilder.Navigator
      
      screenOptions={({route}) => ({
        header: () => null,
        tabBarIcon: ({focused, color, size}) => {
          const {Home, Service, More} = Logos;

          const iconSize = AreaMapper({value: 22, scaleBy: 'width'});

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
          if (route.name === 'Order') {
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
        tabBarStyle: [
          {
            paddingBottom: size.spacing.xl,
            borderRadius: size.borderRadius.full,
            margin: size.spacing.s,
            height: 58,
            backgroundColor: colors.background,
          },
          size.elevation.m,
        ],
        tabBarLabelStyle: {
          fontSize: size.textVariants.caption.fontSize,
          lineHeight: size.textVariants.caption.lineHeight,
          fontFamily: 'Poppins-Regular',
          fontWeight: 'condensed',
        },
        // tabBarHideOnKeyboard: true,
        tabBarAllowFontScaling: true,
        tabBarPosition: 'bottom',
      })}
      initialRouteName="Order">
      {screenBuilder([
        {screenName: 'Home', component: HomeStackNavigator},
        {screenName: 'Order', component: ServiceStackNavigator},
        {screenName: 'More', component: MoreStackNavigator},
      ])}
    </BottomTabBuilder.Navigator>
  );
};
