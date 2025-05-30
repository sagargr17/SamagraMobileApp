import {useLazyQuery} from '@apollo/client';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {View} from 'moti';
import React, {useEffect, useState} from 'react';
import {FlatList, Text} from 'react-native';
import {SliderSwitcher} from '../../../Components/Layout/SliderSwitcher';
import {ItemListtCard} from '../../../Components/Sections/Cards/ItemListCard';
import {SamagraLoader} from '../../../Components/Sections/RequestHandling/Loading/SamagraLoader';
import {getPersonalItems} from '../../../GraphQL/Queries/ItemQueries';
import {ApplicationOverlayStackNavigationProp} from '../../../Navigators/Stack/ApplicationOverlayStackNavigator';
import {GetAuthenticateClient} from '../../../client/Graphql/AuthenticatedClient';

interface MyShopItemsScreenProps {}

export const MyShopItemsScreen: React.FC<MyShopItemsScreenProps> = ({}) => {
  const isFocused = useIsFocused();
  const navigation =
    useNavigation<ApplicationOverlayStackNavigationProp<'AddItemScreen'>>();
  let [getPersonalItemsQuery, {data, loading, error, variables}] = useLazyQuery(
    getPersonalItems,
    {
      fetchPolicy: 'cache-and-network',
    },
  );

  // const authenticatedClient = GetAuthenticateClient;
  // const [data, setData] = useState();

  // Calling the Effect
  useEffect(() => {
    console.log('Component is focused:', isFocused);
    if (isFocused) {
      // Trigger the query only when the screen becomes focused
      getPersonalItemsQuery();
    }
  }, [isFocused, getPersonalItemsQuery]); // Add getPersonalItemsQuery to dependencies

  console.log('MyItems....', data, loading);

  // useEffect(() => {
  //   let r = () =>
  //     authenticatedClient
  //       .query({
  //         query: getPersonalItems,
  //         fetchPolicy: 'cache-first',
  //       })
  //       .then(result => {
  //         if (result.data) {
  //           console.log('Resulttt', result.data);
  //           setData(result.data);
  //         }
  //       })
  //       .catch(error => console.log('error'));
  //   r();
  // }, []);

  return (
    // <>
    //   {loading ? (
    //     <SamagraLoader></SamagraLoader>
    //   ) : error ? (
    //     <Text>Error</Text>
    //   ) : data && data.getItems ? (
    //     <FlatList
    //       ListHeaderComponentStyle={{
    //         height: 200,
    //       }}
    //       showsVerticalScrollIndicator={false}
    //       // onScrollEndDrag={() => {
    //       //   data.getItems?.pageInfo.hasNextPage
    //       //     ? fetchMore({
    //       //         variables: {
    //       //           after: data.getItems.pageInfo.endCursor,
    //       //         },
    //       //       })
    //       //     : null;
    //       // }}
    //       data={data.getItems.nodes}
    //       renderItem={({item, index}) => (
    //         <ItemListtCard
    //           key={index}
    //           item={{
    //             name: item?.name ? item.name : 'not found',
    //             price: item?.price ? item?.price : 'not found',
    //             imageUrl:
    //               'https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?semt=ais_hybrid&w=740',
    //             rating: item?.starRating ? item.starRating : 3,
    //             shop: {
    //               name:
    //                 item?.shop && item.shop.name ? item.shop.name : 'not found',
    //             },
    //           }}></ItemListtCard>
    //       )}
    //       ListEmptyComponent={<Text>laskjdlsakjd</Text>}></FlatList>
    //   ) : (
    //     <Text>Something Wnet Wrond</Text>
    //   )}
    // </>

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
                      // onScrollEndDrag={() => {
                      //   data.getItems?.pageInfo.hasNextPage
                      //     ? fetchMore({
                      //         variables: {
                      //           after: data.getItems.pageInfo.endCursor,
                      //         },
                      //       })
                      //     : null;
                      // }}
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
                    {/* {y ?? <ActivityIndicator></ActivityIndicator>} */}
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
                      // onScrollEndDrag={() => {
                      //   data.getItems?.pageInfo.hasNextPage
                      //     ? fetchMore({
                      //         variables: {
                      //           after: data.getItems.pageInfo.endCursor,
                      //         },
                      //       })
                      //     : null;
                      // }}
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
                    {/* {y ?? <ActivityIndicator />} */}
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
                      // onScrollEndDrag={() => {
                      //   data.getItems?.pageInfo.hasNextPage
                      //     ? fetchMore({
                      //         variables: {
                      //           after: data.getItems.pageInfo.endCursor,
                      //         },
                      //       })
                      //     : null;
                      // }}
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
                    {/* {y ?? <ActivityIndicator />} */}
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
