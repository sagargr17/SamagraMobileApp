import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {useNavigation, useRoute, useTheme} from '@react-navigation/native';
import {FlatListScreen} from '../../../Layout/ScreenLayout/FlatListScreenLayout';
import {useQuery} from '@apollo/client';
import {GetItemsByShopId} from '../../../GraphQL/Queries/ItemQueries';
import {ListCard} from '../../../Components/Molecules/Cards/ListCard';
import {ImageNotFound} from '../../../Constants/UI/AssetsUrls';
import {
  NoCartItemTitle,
  NoItemInShop,
  NotMentioned,
} from '../../../Constants/UI/Messages';
import {SingnlePageInfo} from '../../../Components/Organism/SinglePageInfo';
import {Logos} from '../../../Assets/SVG/Exports/Exports';
import {AreaMapper} from '../../../Utilities/CustomMethods';
interface StockScreenProps {}

export const StockScreen: React.FC<StockScreenProps> = ({}) => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const {NoItemFound} = Logos;
  const {data, loading, error} = useQuery(GetItemsByShopId, {
    variables: {
      shopId: route.params.shopId,
    },
  });

  const handleNavigation = () => {
    // Navigation navigate
    navigation.navigate('ApplicationOverlay', {
      screen: 'AddItemScreen',
      params: {
        shopId: route.params.shopId,
        shopName: 'Add Item',
      },
    });
  };

  const emptyNode = (
    <SingnlePageInfo
      icon={<NoItemFound height={AreaMapper({value: 150})} width={'90%'} />}
      detail={{
        title: NoCartItemTitle,
        message: NoItemInShop,
        onButtonPress: () => handleNavigation(),
        buttonTitle: 'Add Item',
      }}></SingnlePageInfo>
  );

  return (
    <FlatListScreen
      ListEmptyComponent={emptyNode}
      data={data?.getItems?.nodes}
      renderItem={({item, index}) => (
        <ListCard
          id={item?.id ?? NotMentioned}
          imageUrl={ImageNotFound}
          list={[
            {
              type: 'regular',
              value: item?.name ?? NotMentioned,
            },
            {
              type: 'regular',
              value: `${item?.stockQuantity ?? NotMentioned}`,
            },
          ]}></ListCard>
      )}></FlatListScreen>
  );
};
