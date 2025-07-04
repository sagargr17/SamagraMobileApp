import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import React from 'react';

import {useNavigation, useTheme} from '@react-navigation/native';
import {View} from 'moti';
import {Logos} from '../../Assets/SVG/Exports/Exports';
import {size} from '../../Prefrences/Prefrences';
import {HomeStackNavigator} from '../Stack/HomeStackNavigator';
import {MoreStackNavigator} from '../Stack/MoreStackNavigator';
import {ServiceStackNavigator} from '../Stack/ServiceStackNavigator';

import {TouchableHighlight} from 'react-native';
import {AppText} from '../../Components/Elements/AppText';
import {useAppDispatch, useAppSelector} from '../../StateManagement/hooks';
import {setIsBuyMode} from '../../StateManagement/User/UserSlice';
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
  const navigation = useNavigation<any>();
  const {CommentFrame} = Logos;
  const isBuy = useAppSelector(state => state.user.user.isBuyMode);
  const dispatch = useAppDispatch();

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
              dispatch(setIsBuyMode(!isBuy));
            }
          },
        })}
        options={({route}) => ({
          tabBarLabel:
            route.name === 'Order'
              ? isBuy === true
                ? 'Sell'
                : 'Buy'
              : route.name,
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
                {isBuy ? (
                  <TouchableHighlight
                    onPress={() => {}}
                    style={{
                      bottom: 25,
                      borderWidth: 0.1,
                    }}>
                    <View>
                      {/* <CommentFrame height={120} width={120}></CommentFrame> */}
                      {/* <AppText
                        customStyle={{
                          bottom: 5,
                          position: 'absolute',
                          zIndex: 2,
                        }}
                        title={!isBuy ? 'Buy' : 'Selll'}></AppText> */}
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
