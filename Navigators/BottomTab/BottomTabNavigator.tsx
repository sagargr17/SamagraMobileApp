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

import {Alert, TouchableHighlight} from 'react-native';
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
  const {BuyFrame, SellFrame} = Logos;
  const isBuy = useAppSelector(state => state.user.user.isBuyMode);
  const dispatch = useAppDispatch();
  const [isBuyFrameVisible, setIsBuyFrameVisible] = useState<boolean>(false);

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
              setIsBuyFrameVisible(!isBuyFrameVisible);
            } else {
              setIsBuyFrameVisible(false);
            }
          },
        })}
        options={({route}) => ({
          tabBarLabel:
            route.name === 'Order'
              ? isBuy === false
                ? 'Buy'
                : 'Sell'
              : route.path,
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
            console.log('IsBuyFrame', isBuyFrameVisible);

            return (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {isBuyFrameVisible ? (
                  <TouchableHighlight
                    onPress={() => {
                      dispatch(setIsBuyMode(!isBuy));
                      setIsBuyFrameVisible(!isBuyFrameVisible);
                    }}
                    style={{
                      bottom: 2,
                      position: 'absolute',
                      justifyContent: 'center',
                      alignItems: 'center',
                      zIndex: 1,
                    }}>
                    {isBuy === true ? (
                      <BuyFrame height={85} width={85}></BuyFrame>
                    ) : (
                      <SellFrame height={85} width={85}></SellFrame>
                    )}
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
            height: 65,
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
        tabBarHideOnKeyboard: false,
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
