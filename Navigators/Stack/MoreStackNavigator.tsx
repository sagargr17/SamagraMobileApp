import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import {MoreScreen} from '../../Screens/Application/More/MoreScreen';

type MoreStackParamList = {
  MoreScreen: undefined;
  //   ServiceDetailScreen: undefined;
};

// Its The builder with the
export const MoreStackBuilder =
  createNativeStackNavigator<MoreStackParamList>();

export type MoreStackNavigationProp<T extends keyof MoreStackParamList> =
  NativeStackNavigationProp<MoreStackParamList, T>;

export interface HomeStackProps<T extends keyof MoreStackParamList> {
  navigation: MoreStackNavigationProp<T>;
}

const screenBuilder = (
  data: Array<{screenName: keyof MoreStackParamList; component: any}>,
) => {
  return data.map(item => (
    <MoreStackBuilder.Screen
      key={item.screenName}
      navigationKey="LoginFormKey"
      name={item.screenName}
      component={item.component}></MoreStackBuilder.Screen>
  ));
};

export const MoreStackNavigator: React.FC = () => {
  return (
    <>
      <MoreStackBuilder.Navigator
        screenOptions={{
        //   header: () => null,
        }}>
        {screenBuilder([{screenName: 'MoreScreen', component: MoreScreen}])}
      </MoreStackBuilder.Navigator>
    </>
  );
};
