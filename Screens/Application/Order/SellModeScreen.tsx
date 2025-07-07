import { useTheme } from '@react-navigation/native';
import React from 'react';
import {
  useWindowDimensions
} from 'react-native';
import { AppHeader } from '../../../Components/Organism/AppHeader';

import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { Spacer } from '../../../Components/Elements/Spacer';
import { ReceivedorderListScreen } from '../ReceivedOrderListScreen';
import { ReceivedRequestListScreen } from '../ReceivedRequestListScreen';
interface SellModeScreenProps {}

export const SellModeScreen: React.FC<SellModeScreenProps> = ({}) => {
  const {colors} = useTheme();
  const renderScene = SceneMap({
    first: ReceivedRequestListScreen,
    second: ReceivedorderListScreen,
    // third: PendingOrderScreen,
  });

  const routes = [
    {key: 'first', title: 'Requests'},
    {key: 'second', title: 'Responses'},
    // {key: 'third', title: 'Deliveries'},
  ];
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(1);

  return (
    <>
      <AppHeader currentPosition="absolute"></AppHeader>
      <Spacer height={10}></Spacer>
      <TabView
        lazy={false}
        navigationState={{index, routes}}
        renderScene={renderScene}
        renderTabBar={props => (
          <TabBar
            activeColor={colors.primary}
            inactiveColor={colors.text}
            {...props}
            indicatorStyle={{
              backgroundColor: colors.primary,
              paddingRight: 200,
            }}
            style={{backgroundColor: colors.background}}
          />
        )}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
      />
    </>
  );
};
