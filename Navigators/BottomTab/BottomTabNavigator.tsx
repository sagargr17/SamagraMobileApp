import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import React, {useState} from 'react';

import {useNavigation, useTheme} from '@react-navigation/native';
import {View} from 'moti';
import {Logos} from '../../Assets/SVG/Exports/Exports';
import {size} from '../../Prefrences/Prefrences';
import {HomeStackNavigator} from '../Stack/HomeStackNavigator';
import {MoreStackNavigator} from '../Stack/MoreStackNavigator';
import {ServiceStackNavigator} from '../Stack/ServiceStackNavigator';

import {TouchableRipple} from 'react-native-paper';
import {AppText} from '../../Components/Elements/AppText';
import {Alert, TouchableHighlight} from 'react-native';
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

export const BottomTabNavigator: React.FC = () => {
  const {colors, fonts} = useTheme();
  const [isToggleVisible, setToggleVisible] = useState<boolean>();
  const [toggledName, setToggledName] = useState<string>('Buy');
  const navigation = useNavigation<any>();
  const {CommentFrame} = Logos;

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
        listeners={({navigation, route}) => ({
          tabPress: e => {
            if (route.name === 'Order') {
              setToggleVisible(!isToggleVisible);
              setToggledName(toggledName === 'Buy' ? 'Sell' : 'Buy');
            }
          },
        })}
        options={({route}) => ({
          tabBarLabel: route.name === 'Order' ? toggledName : route.name,
        })}
      />
    ));
  };
  return (
    <BottomTabBuilder.Navigator
      screenOptions={({route}) => ({
        header: () => null,
        tabBarIcon: ({focused, color, size: sizes}) => {
          const {Home, Service, More} = Logos;

          const iconSize = size.iconSize.small;

          if (route.name === 'Home') {
            return (
              <Home
                height={iconSize}
                focused={focused}
                color={color}
                // size={sizes}
              />
            );
          }
          if (route.name === 'More') {
            return (
              <More
                height={iconSize}
                focused={focused}
                color={color}
                size={sizes}
              />
            );
          }
          if (route.name === 'Order') {
            return (
              <View>
                {isToggleVisible ? (
                  <TouchableHighlight
                    onPress={() => {}}
                    style={{
                      bottom: 25,
                      borderWidth: 0.1,
                    }}>
                    <View>
                      <CommentFrame height={120} width={120}></CommentFrame>
                      <AppText
                        customStyle={{
                          bottom: 5,
                          position: 'absolute',
                          zIndex: 2,
                        }}
                        title={toggledName}></AppText>
                    </View>
                  </TouchableHighlight>
                ) : null}
                <Service
                  height={iconSize}
                  focused={focused}
                  color={color}
                  size={sizes}
                />
              </View>
            );
          }
          return null;
        },
        tabBarStyle: [
          {
            paddingBottom: size.spacing.xxs - 2,
            height: 70,
            backgroundColor: colors.background,
            borderTopColor: colors.background,
            borderWidth: 0,
            shadowColor: 'white',
          },
        ],

        tabBarLabelStyle: {
          fontSize: size.textVariants.display.fontSize - 4,
          lineHeight: size.textVariants.caption.lineHeight,
          fontFamily: 'Poppins-Regular',
        },
        tabBarHideOnKeyboard: true,
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
