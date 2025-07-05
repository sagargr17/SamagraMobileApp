import React from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {AppHeader} from '../../../Components/Organism/AppHeader';

import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {OrderBottomSheet} from '../../../Components/Organism/OrderBottomSheet';
import {HomeLandingScreen} from '../Home/HomeLandingScreen';
import {Spacer} from '../../../Components/Elements/Spacer';
import {SamagraLoader} from '../../../Components/Molecules/Response/SamagraLoader';
import {ProviderCardSkeleton} from '../../../Components/Skeletons/Components/ProviderCardSkeleton';
import {ReceivedOffersListScreen} from '../ReceivedOffersListScreen';
import {ReceivedOrderListScreen} from '../ReceivedOrdersListScreen';
import {PendingOrderScreen} from '../More/PendingOrdersScreen';
import {Divider} from 'react-native-paper';
import {ListCardSkeleton} from '../../../Components/Skeletons/Layout/ListCardSkeleton';
import {size} from '../../../Prefrences/Prefrences';
interface SellModeScreenProps {}

export const SellModeScreen: React.FC<SellModeScreenProps> = ({}) => {
  const {colors} = useTheme();
  const renderScene = SceneMap({
    first: ReceivedOrderListScreen,
    second: ProviderCardSkeleton,
    third: PendingOrderScreen,
  });

  const routes = [
    {key: 'first', title: 'Requests'},
    {key: 'second', title: 'Responses'},
    {key: 'third', title: 'Deliveries'},
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
