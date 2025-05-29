import {useQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import {View} from 'moti';
import React from 'react';
import {ActivityIndicator, FlatList, Text} from 'react-native';
import {SliderSwitcher} from '../../../Components/Layout/SliderSwitcher';
import {ItemListtCard} from '../../../Components/Sections/Cards/ItemListCard';
import {SamagraLoader} from '../../../Components/Sections/ErrorHandling/SamagraLoader';
import {
  getPaginatedPersonalItems,
  getPersonalItems,
} from '../../../GraphQL/Queries/ItemQueries';
import {ApplicationOverlayStackNavigationProp} from '../../../Navigators/Stack/ApplicationOverlayStackNavigator';

interface MyShopItemsScreenProps {}

export const MyShopItemsScreen: React.FC<MyShopItemsScreenProps> = ({}) => {
  const navigation =
    useNavigation<ApplicationOverlayStackNavigationProp<'AddItemScreen'>>();
  const {data, loading, error, variables} = useQuery(getPersonalItems, {
    fetchPolicy: 'network-only',
  });

  const {
    data: x,
    loading: y,
    error: z,
    fetchMore,
  } = useQuery(getPaginatedPersonalItems);

  return (
    <>
      {loading ? (
        <SamagraLoader></SamagraLoader>
      ) : (
        <SliderSwitcher
          popupIcon="camera"
          popupButtonName="Add Item"
          popupButtonPressed={() =>
            navigation.navigate('AddItemScreen', {
              shopName: 'Hamro SHop',
            })
          }>
          <View key="All">
            <>
              {data && data.getItems && data.getItems.nodes ? (
                data.getItems.nodes?.length > 0 ? (
                  <>
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      onScrollEndDrag={() => {
                        data.getItems?.pageInfo.hasNextPage
                          ? fetchMore({
                              variables: {
                                after: data.getItems.pageInfo.endCursor,
                              },
                            })
                          : null;
                      }}
                      data={data.getItems.nodes}
                      renderItem={({item, index}) => (
                        <ItemListtCard
                          key={index}
                          item={{
                            name: item?.name ? item.name : 'not found',
                            price: item?.price ? item?.price : 'not found',
                            imageUrl:
                              'https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?semt=ais_hybrid&w=740',
                            rating: item?.starRating ? item.starRating : 3,
                            shop: {
                              name:
                                item?.shop && item.shop.name
                                  ? item.shop.name
                                  : 'not found',
                            },
                          }}></ItemListtCard>
                      )}></FlatList>
                    {y ?? <ActivityIndicator></ActivityIndicator>}
                  </>
                ) : (
                  <>
                    <Text>No Any Item Founds</Text>
                  </>
                )
              ) : (
                <View
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: 200,
                  }}>
                  <SamagraLoader />
                </View>
              )}
            </>
          </View>
          <View key="Stocks">
            <>
              {data && data.getItems && data.getItems.nodes ? (
                data.getItems.nodes?.length > 0 ? (
                  <>
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      onScrollEndDrag={() => {
                        data.getItems?.pageInfo.hasNextPage
                          ? fetchMore({
                              variables: {
                                after: data.getItems.pageInfo.endCursor,
                              },
                            })
                          : null;
                      }}
                      data={data.getItems.nodes}
                      renderItem={({item, index}) => (
                        <ItemListtCard
                          key={index}
                          item={{
                            name: item?.name ? item.name : 'not found',
                            price: item?.price ? item?.price : 'not found',
                            imageUrl:
                              'https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?semt=ais_hybrid&w=740',
                            rating: item?.starRating ? item.starRating : 3,
                            stocks:
                              item && item.stockQuantity
                                ? item?.stockQuantity
                                : 10,
                            shop: {
                              name:
                                item?.shop && item.shop.name
                                  ? item.shop.name
                                  : 'not found',
                            },
                          }}></ItemListtCard>
                      )}></FlatList>
                    {y ?? <ActivityIndicator />}
                  </>
                ) : (
                  <>
                    <Text>No Any Item Founds</Text>
                  </>
                )
              ) : (
                <SamagraLoader />
              )}
            </>
          </View>
          <View key="Orders">
            <>
              {data && data.getItems && data.getItems.nodes ? (
                data.getItems.nodes?.length > 0 ? (
                  <>
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      onScrollEndDrag={() => {
                        data.getItems?.pageInfo.hasNextPage
                          ? fetchMore({
                              variables: {
                                after: data.getItems.pageInfo.endCursor,
                              },
                            })
                          : null;
                      }}
                      data={data.getItems.nodes}
                      renderItem={({item, index}) => (
                        <ItemListtCard
                          key={index}
                          item={{
                            name: item?.name ? item.name : 'not found',
                            price: item?.price ? item?.price : 'not found',
                            imageUrl:
                              'https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?semt=ais_hybrid&w=740',
                            rating: item?.starRating ? item.starRating : 3,
                            stocks:
                              item && item.stockQuantity
                                ? item?.stockQuantity
                                : 10,
                            shop: {
                              name:
                                item?.shop && item.shop.name
                                  ? item.shop.name
                                  : 'not found',
                            },
                          }}></ItemListtCard>
                      )}></FlatList>
                    {y ?? <ActivityIndicator />}
                  </>
                ) : (
                  <>
                    <Text>No Any Item Founds</Text>
                  </>
                )
              ) : (
                <SamagraLoader />
              )}
            </>
          </View>
        </SliderSwitcher>
      )}
    </>
  );
};
