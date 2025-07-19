import {useLazyQuery} from '@apollo/client';
import {useNavigation, useRoute, useTheme} from '@react-navigation/native';
import React, {useCallback, useEffect} from 'react';
import {ListCardSkeleton} from '../../Components/Skeletons/Layout/ListCardSkeleton';
import {
  getAllPersonalItems,
  GetPrivateItemsBySearchString,
  getPublicItems,
  GetPublicItemsBySearchString,
} from '../../GraphQL/Queries/ItemQueries';
import {FlatListScreen} from '../../Layout/ScreenLayout/FlatListScreenLayout';
import {Text, View} from 'react-native';
import {ListCard} from '../../Components/Molecules/Cards/ListCard';
import {NotMentioned} from '../../Constants/UI/Messages';
import {AreaMapper, titleRange} from '../../Utilities/CustomMethods';
import {ItemImageNotFound} from '../../Constants/UI/AssetsUrls';
import {SamagraLoader} from '../../Components/Elements/SamagraLoader';
import {AppSerchBar} from '../../Components/Molecules/Global/AppSerchBar';
import {size} from '../../Prefrences/Prefrences';
import {useDispatch} from 'react-redux';
import {setItemSelected} from '../../StateManagement/User/UserSlice';
interface SearchScreenProps {}

export const SearchScreen: React.FC<SearchScreenProps> = () => {
  const {colors} = useTheme();
  const route = useRoute<any>();
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  const [
    getAllShopItemsFn,
    {data: allShopItems, loading: shopItemsLoading, error: shopItemsError},
  ] = useLazyQuery(getAllPersonalItems);
  const [
    getPublicItemsFn,
    {data: publicItems, loading: PublicItemsloading, error: publicItemsError},
  ] = useLazyQuery(getPublicItems);

  //   Searching Queries
  const [
    getPublicItemsBySearchFn,
    {
      data: publicItemsBySearch,
      loading: PublicItemsloadingBySearch,
      error: publicItemBySEarchrror,
    },
  ] = useLazyQuery(GetPublicItemsBySearchString); // Public Items
  const [
    getPrivateItemsBySearchFn,
    {
      data: privateItems,
      loading: privateItemsLoading,
      error: privateItemsError,
    },
  ] = useLazyQuery(GetPrivateItemsBySearchString); // Privates Movies

  //This is the
  useEffect(() => {
    if (route.params.itemType === 'public') {
      getPublicItemsFn().then(res => console.log('Res', res.data));
    } else {
      getAllShopItemsFn();
    }
  }, []);

  // Handling the Navigation
  const handleItemSelection = useCallback(() => {
    if (route.params.itemType === 'public') {
      navigation.navigate('ApplicationOverlay', {
        screen: 'ItemDetailScreen',
        params: {
          name: 'title',
          id: 'id',
        },
      });
    } else {
      dispatch(
        setItemSelected({
          item: {
            id: '',
            stockQuantity: 0,
            price: 0,
            dateTime: '',
            isProduct: false,
            starRating: 3,
          },
        }),
      );
    }
  }, []);

  if (shopItemsLoading || PublicItemsloadingBySearch) return;
  <ListCardSkeleton numberOfList={4} numberOfText={4}></ListCardSkeleton>;

  if (publicItemsError) return <Text>Error</Text>;

  return (
    <>
      <>
        <FlatListScreen
          contentContainerStyle={{
            paddingBottom: 50,
          }}
          onEndReached={() => {
            //   if (data?.getItems?.pageInfo.hasNextPage) {
            //     fetchMore({
            //       variables: {after: data?.getItems?.pageInfo.endCursor},
            //     });
            //   }
          }}
          onEndReachedThreshold={0.6}
          scrollEnabled
          data={publicItems?.getPublicItems?.edges}
          renderItem={({item, index}) => (
            <ListCard
              onImagePress={() => {
                if (item.node?.name && item.node.id) {
                }
              }}
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
                  value: titleRange(`Npr.${item?.node?.price ?? NotMentioned}`),
                  type: 'caption',
                  fontVariant: 'medium',
                },

                {
                  value: titleRange(`Qty: qwewqe`),
                  type: 'caption',
                  fontVariant: 'medium',
                },
                {
                  value: titleRange(
                    'asdsad',
                    //   `${item?.node?. === true ? 'Product' : 'Service'}`,
                  ),
                  type: 'caption',
                  fontVariant: 'medium',
                  style: {
                    color: '#7ba5e8',
                  },
                },
              ]}></ListCard>
          )}></FlatListScreen>
      </>
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
  );
};
