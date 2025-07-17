import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {useNavigation, useRoute, useTheme} from '@react-navigation/native';
import {FlatListScreen} from '../../../Layout/ScreenLayout/FlatListScreenLayout';
import {NetworkStatus, useQuery} from '@apollo/client';
import {
  GetItemsByShopId,
  getAllPersonalItems,
} from '../../../GraphQL/Queries/ItemQueries';
import {ListCard} from '../../../Components/Molecules/Cards/ListCard';
import {
  ImageNotFound,
  ItemImageNotFound,
} from '../../../Constants/UI/AssetsUrls';
import {
  NoCartItemTitle,
  NoItemInShop,
  NotMentioned,
} from '../../../Constants/UI/Messages';
import {SingnlePageInfo} from '../../../Components/Organism/SinglePageInfo';
import {Logos} from '../../../Assets/SVG/Exports/Exports';
import {AreaMapper, titleCase} from '../../../Utilities/CustomMethods';
import {SamagraLoader} from '../../../Components/Elements/SamagraLoader';
import {ListCardSkeleton} from '../../../Components/Skeletons/Layout/ListCardSkeleton';
import {useAppDispatch} from '../../../StateManagement/hooks';
import {updateSelectedItem} from '../../../StateManagement/Item/SelectedItemSlice';

interface StockScreenProps {}

export const StockScreen: React.FC<StockScreenProps> = ({}) => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const {NoItemFound} = Logos;
  const dispatch = useAppDispatch();
  const [paginationLoading, setPaginationLoading] = useState<boolean>(false);

  const {data, loading, error, fetchMore, networkStatus} = useQuery(
    GetItemsByShopId,
    {
      notifyOnNetworkStatusChange: true,
      variables: {after: null, shopId: route.params.shopId},
      onCompleted: () => {
        setPaginationLoading(false);
      },
      onError: () => {
        setPaginationLoading(false);
      },
      fetchPolicy: 'network-only',
    },
  );

  const isLoadingInitialData =
    loading && !data && networkStatus === NetworkStatus.loading;

  const isFetchingMore =
    networkStatus === NetworkStatus.fetchMore || paginationLoading;

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
    dispatch(
      updateSelectedItem({
        item: item,
      }),
    );
    navigation.navigate('ApplicationOverlay', {
      screen: 'StockUpdateScreen',
    });
  };

  const emptyNode = (
    <View
      style={{
        marginTop: AreaMapper({value: 200}),
      }}>
      <SingnlePageInfo
        icon={<NoItemFound height={AreaMapper({value: 150})} width={'90%'} />}
        detail={{
          title: NoCartItemTitle,
          message: NoItemInShop,
          onButtonPress: () => handleNavigation(),
          buttonTitle: 'Add Item',
        }}></SingnlePageInfo>
    </View>
  );

  if (isLoadingInitialData) return <ListCardSkeleton numberOfList={6} />;

  if (error) return <Text>{error.message}</Text>;

  return (
    <FlatListScreen
      onEndReached={() => {
        if (data?.getItems?.pageInfo.hasNextPage && !isFetchingMore) {
          fetchMore({
            variables: {after: data?.getItems?.pageInfo.endCursor},
          });
        }
      }}
      onEndReachedThreshold={0.6}
      ListEmptyComponent={emptyNode}
      data={data?.getItems?.edges}
      renderItem={({item, index}) => (
        <ListCard
          onImagePress={() => {
            if (item) {
              handleStockUpdateNavigation(item.node);
            }
          }}
          id={item?.node?.id ?? NotMentioned}
          imageUrl={item?.node?.imageUrls?.[0] ?? ItemImageNotFound}
          list={[
            {
              type: 'title',
              value: titleCase(item?.node?.name ?? NotMentioned),
              fontVariant: 'heavy',
            },
            {
              type: 'regular',
              value: `Qty: ${item?.node?.stockQuantity ?? NotMentioned}`,
              fontVariant: 'medium',
            },
            {
              type: 'regular',
              value: `Npr.${item?.node?.price ?? NotMentioned}`,
            },
          ]}></ListCard>
      )}
      ListFooterComponent={
        isFetchingMore ? <SamagraLoader></SamagraLoader> : null
      }></FlatListScreen>
  );
};
