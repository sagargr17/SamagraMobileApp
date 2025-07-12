import {NetworkStatus, useQuery} from '@apollo/client';
import {useNavigation, useRoute, useTheme} from '@react-navigation/native';
import {View} from 'moti';
import React, {useState} from 'react';
import {Text} from 'react-native';
import {Logos} from '../../../Assets/SVG/Exports/Exports';
import {ListCard} from '../../../Components/Molecules/Cards/ListCard';
import {AppSerchBar} from '../../../Components/Molecules/Global/AppSerchBar';
import {SamagraLoader} from '../../../Components/Molecules/Response/SamagraLoader';
import {SingnlePageInfo} from '../../../Components/Organism/SinglePageInfo';
import {ListCardSkeleton} from '../../../Components/Skeletons/Layout/ListCardSkeleton';
import {ItemImageNotFound} from '../../../Constants/UI/AssetsUrls';
import {
  NoCartItemTitle,
  NoItemInShop,
  NotMentioned,
} from '../../../Constants/UI/Messages';
import {GetItemsByShopId} from '../../../GraphQL/Queries/ItemQueries';
import {FlatListScreen} from '../../../Layout/ScreenLayout/FlatListScreenLayout';
import {ApplicationOverlayStackNavigationProp} from '../../../Navigators/Stack/ApplicationOverlayStackNavigator';
import {size} from '../../../Prefrences/Prefrences';
import {AreaMapper, titleRange} from '../../../Utilities/CustomMethods';

interface MyShopItemsScreenProps {}

export const MyShopItemsScreen: React.FC<MyShopItemsScreenProps> = ({}) => {
  const navigation =
    useNavigation<ApplicationOverlayStackNavigationProp<'AddItemScreen'>>();
  const route = useRoute<any>();
  const [paginationLoading, setPaginationLoading] = useState<boolean>(false);
  const {NoItemFound} = Logos;
  const {colors} = useTheme();
  const {data, loading, error, refetch, networkStatus, fetchMore} = useQuery(
    GetItemsByShopId,
    {
      variables: {after: null, shopId: route.params.shopId},
      onCompleted: () => {
        setPaginationLoading(false);
      },
      onError: () => {
        setPaginationLoading(false);
      },
      fetchPolicy: 'cache-and-network',
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
      {data &&
      data.getItems &&
      data.getItems.edges &&
      data?.getItems?.edges?.length <= 0 ? (
        <SingnlePageInfo
          icon={<NoItemFound height={AreaMapper({value: 150})} />}
          detail={{
            title: NoCartItemTitle,
            message: NoItemInShop,
            onButtonPress: () => handleAddItem(),
            buttonTitle: 'Add Item',
          }}></SingnlePageInfo>
      ) : (
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
                    fontVariant: 'bold',
                  },
                  {
                    value: titleRange(
                      `Npr.${item?.node?.price ?? NotMentioned}`,
                    ),
                    type: 'caption',
                    fontVariant: 'medium',
                  },

                  {
                    value: titleRange(
                      `Qty: ${item?.node?.stockQuantity ?? NotMentioned}`,
                    ),
                    type: 'caption',
                    fontVariant: 'medium',
                  },
                  {
                    value: titleRange(
                      `${
                        item?.node?.isProduct === true ? 'Product' : 'Service'
                      }`,
                    ),
                    type: 'caption',
                    fontVariant: 'medium',
                    style: {
                      color:
                        item?.node?.isProduct === true
                          ? colors.primary
                          : '#7ba5e8',
                    },
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
                bottom: 0,
                width: '98%',
                marginHorizontal: size.spacing.xxs,
              },
            ]}>
            <AppSerchBar
              style={{
                borderWidth: size.borderWidth.s,
                borderColor: colors.border,
              }}
              onPress={() => {}}></AppSerchBar>
          </View>
        </>
      )}
    </>
  );
};
