import {useTheme} from '@react-navigation/native';
import React from 'react';
import {useWindowDimensions} from 'react-native';
import {AppHeaderOrganism} from '../../../Components/Organism/ApplicationOverLays/AppHeaderOrganism';

import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {SpacerElement} from '../../../Components/Elements/SpacerElement';
import {OrdersScreen as LiveOrderScreen} from './OrdersListScreen';
import {RequestsScreen as RequestScreen} from './RequestScreen';
import {CategoryScreen} from '../Home/CategoryScreen';
interface SellModeScreenProps {}

export const SellModeScreen: React.FC<SellModeScreenProps> = ({}) => {
  const {colors} = useTheme();
  const renderScene = SceneMap({
    first: RequestScreen,
    second: LiveOrderScreen,
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
      <AppHeaderOrganism currentPosition="absolute"></AppHeaderOrganism>
      <SpacerElement height={10}></SpacerElement>
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
