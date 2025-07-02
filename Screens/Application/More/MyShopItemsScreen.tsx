import {NetworkStatus, useQuery} from '@apollo/client';
import {useNavigation, useRoute, useTheme} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {ActivityIndicator, Text} from 'react-native';
import {Logos} from '../../../Assets/SVG/Exports/Exports';
import {ListCard} from '../../../Components/Molecules/Cards/ListCard';
import {SingnlePageInfo} from '../../../Components/Organism/SinglePageInfo';
import {ListCardSkeleton} from '../../../Components/Skeletons/Layout/ListCardSkeleton';
import {
  ImageNotFound,
  ItemImageNotFound,
} from '../../../Constants/UI/AssetsUrls';
import {
  NoCartItemTitle,
  NoItemInShop,
  NotMentioned,
} from '../../../Constants/UI/Messages';
import {getAllPersonalItems} from '../../../GraphQL/Queries/ItemQueries';
import {FlatListScreen} from '../../../Layout/ScreenLayout/FlatListScreenLayout';
import {ApplicationOverlayStackNavigationProp} from '../../../Navigators/Stack/ApplicationOverlayStackNavigator';
import {
  AreaMapper,
  titleCase,
  titleRange,
} from '../../../Utilities/CustomMethods';
import {Rating} from '../../../Components/Elements/Rating';
import {AppSerchBar} from '../../../Components/Molecules/Global/AppSerchBar';
import {View} from 'moti';
import {size} from '../../../Prefrences/Prefrences';
import {SamagraLoader} from '../../../Components/Molecules/Response/SamagraLoader';

interface MyShopItemsScreenProps {}

export const MyShopItemsScreen: React.FC<MyShopItemsScreenProps> = ({}) => {
  const navigation =
    useNavigation<ApplicationOverlayStackNavigationProp<'AddItemScreen'>>();
  const route = useRoute<any>();
  const [paginationLoading, setPaginationLoading] = useState<boolean>(false);
  const {NoItemFound} = Logos;

  // const shopName = useAppSelector(state => state.user.shopData?);
  // const {data, loading, error, refetch} = useQuery(GetItemsByShopId, {
  //   variables: {
  //     shopId: route.params.shopId,
  //   },
  // });

  const {colors} = useTheme();
  const {data, loading, error, fetchMore, networkStatus} = useQuery(
    getAllPersonalItems,
    {
      variables: {after: null},
      onCompleted: () => {
        setPaginationLoading(false);
      },
      onError: () => {
        setPaginationLoading(false);
      },
      fetchPolicy: 'cache-first',
    },
  );
  // Intialising
  const isLoadingInitialData =
    loading && !data && networkStatus === NetworkStatus.loading;
  const isFetchingMore =
    networkStatus === NetworkStatus.fetchMore || paginationLoading;

  if (isLoadingInitialData)
    return <ListCardSkeleton numberOfList={7}></ListCardSkeleton>;
  if (!error && !data) return <Text>Error</Text>;

  // Handle Item
  const handleAddItem = () => {
    navigation.navigate('AddItemScreen', {
      shopId: route.params.shopId,
      shopName: route.params.shopName,
    });
  };

  return (
    <>
      <FlatListScreen
        contentContainerStyle={{
          paddingBottom: 50,
        }}
        onEndReached={() => {
          if (data?.getItems?.pageInfo.hasNextPage) {
            fetchMore({
              variables: {after: data?.getItems?.pageInfo.endCursor},
            });
          }
        }}
        onEndReachedThreshold={0.6}
        scrollEnabled
        ListEmptyComponent={
          <SingnlePageInfo
            icon={
              <NoItemFound height={AreaMapper({value: 150})} width={'90%'} />
            }
            detail={{
              title: NoCartItemTitle,
              message: NoItemInShop,
              onButtonPress: () => handleAddItem(),
              buttonTitle: 'Add Item',
            }}></SingnlePageInfo>
        }
        data={data?.getItems?.edges}
        renderItem={({item, index}) => (
          <ListCard
            id={item?.node?.id ?? NotMentioned}
            key={index}
            imageUrl={item.node?.imageUrls?.[0] ?? ItemImageNotFound}
            list={[
              {
                value: titleRange(item?.node?.name ?? NotMentioned),
                type: 'regular',
                fontVariant: 'heavy',
              },
              {
                value: titleRange(`Npr.${item?.node?.price ?? NotMentioned}`),
                type: 'regular',
              },
              {
                value: titleRange(
                  `Qty: ${item?.node?.stockQuantity ?? NotMentioned}`,
                ),
                type: 'regular',
                fontVariant: 'medium',
              },
            ]}></ListCard>
        )}
        ListFooterComponent={
          <>{isFetchingMore ? <SamagraLoader /> : null}</>
        }></FlatListScreen>

      <View
        style={[
          {
            position: 'absolute',
            bottom: 2,
            width: '100%',
          },
          size.elevation.l,
        ]}>
        <AppSerchBar onPress={() => {}}></AppSerchBar>
      </View>
    </>
  );
};
