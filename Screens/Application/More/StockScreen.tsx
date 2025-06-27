import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {useNavigation, useRoute, useTheme} from '@react-navigation/native';
import {FlatListScreen} from '../../../Layout/ScreenLayout/FlatListScreenLayout';
import {useQuery} from '@apollo/client';
import {
  GetItemsByShopId,
  getPersonalItems,
} from '../../../GraphQL/Queries/ItemQueries';
import {ListCard} from '../../../Components/Molecules/Cards/ListCard';
import {ImageNotFound, ItemImageNotFound} from '../../../Constants/UI/AssetsUrls';
import {
  NoCartItemTitle,
  NoItemInShop,
  NotMentioned,
} from '../../../Constants/UI/Messages';
import {SingnlePageInfo} from '../../../Components/Organism/SinglePageInfo';
import {Logos} from '../../../Assets/SVG/Exports/Exports';
import {AreaMapper, titleCase} from '../../../Utilities/CustomMethods';
import {SamagraLoader} from '../../../Components/Molecules/Response/SamagraLoader';
import {ListCardSkeleton} from '../../../Components/Skeletons/Layout/ListCardSkeleton';
import {useAppDispatch} from '../../../StateManagement/hooks';
import {updateSelectedItem} from '../../../StateManagement/Item/SelectedItemSlice';
import {ItemViewModel} from '../../../src/__generated__/graphql';
interface StockScreenProps {}

export const StockScreen: React.FC<StockScreenProps> = ({}) => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const {NoItemFound} = Logos;
  const dispatch = useAppDispatch();
  // const {data, loading, error} = useQuery(GetItemsByShopId, {
  //   variables: {
  //     shopId: route.params.shopId,
  //   },
  // });

  const {data, loading, error} = useQuery(getPersonalItems);

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

  //
  const handleStockUpdateNavigation = (item: any) => {
    console.log('ItemID', item);

    dispatch(
      updateSelectedItem({
        item: item,
      }),
    );
    navigation.navigate('StockUpdateScreen');
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

  if (loading) return <ListCardSkeleton numberOfList={5} />;

  if (error) return <Text>{error.message}</Text>;

  return (
    <FlatListScreen
      ListEmptyComponent={emptyNode}
      data={data?.getItems?.nodes}
      renderItem={({item, index}) => (
        <ListCard
          onImagePress={() => {
            if (item) {
              handleStockUpdateNavigation(item);
            }
          }}
          id={item?.id ?? NotMentioned}
          imageUrl={item?.imageUrls?.[0] ?? ItemImageNotFound}
          list={[
            {
              type: 'title',
              value: titleCase(item?.name ?? NotMentioned),
              fontVariant: 'heavy',
            },
            {
              type: 'regular',
              value: `Qty: ${item?.stockQuantity ?? NotMentioned}`,
              fontVariant: 'medium',
            },
            {
              type: 'regular',
              value: `रु.${item?.price ?? NotMentioned}`,
            },
          ]}></ListCard>
      )}></FlatListScreen>
  );
};
