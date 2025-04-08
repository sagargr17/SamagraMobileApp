import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import {MoreScreen} from '../../Screens/Application/More/MoreScreen';
import {ServiceListScreen} from '../../Screens/Application/Home/ServiceListScreen';

type ApplicationOverlayMoreStackParamList = {
  ServiceListScreen: undefined;
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

const screenBuilder = (
  data: Array<{
    screenName: keyof ApplicationOverlayMoreStackParamList;
    component: any;
    option?: NativeStackNavigationOptions;
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
  return (
    <>
      <ApplicationOverlayStackBuilder.Navigator>
        {screenBuilder([
          {
            screenName: 'ServiceListScreen',
            component: ServiceListScreen,
            option: {
              header: () => null,
            },
          },
        ])}
      </ApplicationOverlayStackBuilder.Navigator>
    </>
  );
};
