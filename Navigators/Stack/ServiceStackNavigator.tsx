import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import {TestScreen} from '../../Screens/Application/User/TestScreen';
import {ServiceLandingScreen} from '../../Screens/Application/Service/ServiceLandingScreen';
import {ServiceDetailScreen} from '../../Screens/Application/Service/ServiceDetailScreen';

type ServiceStackParamList = {
  ServiceScreen: undefined;
  ServiceDetailScreen: undefined;
};

// Its The builder with the
export const ServiceStackBuilder =
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
    <ServiceStackBuilder.Screen
      key={item.screenName}
      navigationKey="LoginFormKey"
      name={item.screenName}
      component={item.component}></ServiceStackBuilder.Screen>
  ));
};

export const ServiceStackNavigator: React.FC = () => {
  return (
    <>
      <ServiceStackBuilder.Navigator
        screenOptions={{
          header: () => null,
        }}>
        {screenBuilder([
          {screenName: 'ServiceScreen', component: ServiceLandingScreen},
          {screenName: 'ServiceDetailScreen', component: ServiceDetailScreen},
        ])}
      </ServiceStackBuilder.Navigator>
    </>
  );
};
