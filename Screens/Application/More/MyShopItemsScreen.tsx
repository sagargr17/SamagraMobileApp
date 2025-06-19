import {useQuery} from '@apollo/client';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {View} from 'moti';
import React, {use, useEffect, useRef, useState} from 'react';
import {AppState, FlatList, Text} from 'react-native';
import {ItemListtCard} from '../../../Components/Molecules/Cards/ItemListCard';
import {SamagraLoader} from '../../../Components/Molecules/Response/SamagraLoader';
import {SliderSwitcher} from '../../../Components/Organism/SliderSwitcher';
import {ItemImageNotFound} from '../../../Constants/UI/AssetsUrls';
import {getPersonalItems} from '../../../GraphQL/Queries/ItemQueries';
import {ApplicationOverlayStackNavigationProp} from '../../../Navigators/Stack/ApplicationOverlayStackNavigator';
import {GetAuthenticateClient} from '../../../client/Graphql/AuthenticatedClient';
import {UserProfileCard} from '../../../Components/Molecules/Cards/UserProfileCard';
import {UserProfileCardSkeleton} from '../../../Components/Skeletons/UserProfileCardSkeleton';
import {FlatListScreen} from '../../../Layout/ScreenLayout/FlatListScreenLayout';

interface MyShopItemsScreenProps {}

export const MyShopItemsScreen: React.FC<MyShopItemsScreenProps> = ({}) => {
  const isFocused = useIsFocused();
  const navigation =
    useNavigation<ApplicationOverlayStackNavigationProp<'AddItemScreen'>>();

  const {data, loading, error, refetch} = useQuery(getPersonalItems);

  // const [data, setData] = useState<any>();
  // const authenticateClient = GetAuthenticateClient;

  // useEffect(() => {
  //   // refetch();
  //   let query = async () => {

  //     authenticateClient
  //       .query({
  //         query: getPersonalItems,
  //       })
  //       .then(x => console.log('Thenn', x));
  //   };

  //   query();
  // }, []);

  console.log('DATA', data, loading, error);

  if (loading)
    return (
      <>
        <UserProfileCardSkeleton />
        <UserProfileCardSkeleton />
        <UserProfileCardSkeleton />
        <UserProfileCardSkeleton />
      </>
    );

  if (!error && !data) return <Text>Error</Text>;

  // refetch();
  // const appState = useRef(AppState.currentState);
  // useEffect(() => {
  //   const subscription = AppState.addEventListener('change', nextAppState => {
  //     // If the app was inactive/background and is now active (foreground)
  //       // if (
  //       //   appState.current.match(/inactive|background/) &&
  //       //   nextAppState === 'active'
  //       // ) {
  //       //   console.log('App has come to the foreground!');
  //       //   // Trigger the refetch here
  //       // }

  //       // appState.current = nextAppState;
  //   });

  //   // Cleanup the event listener when the component unmounts
  //   return () => {
  //     subscription.remove();
  //   };
  // }, [refetch]);

  // refetch();

  return (
    <>
      <FlatListScreen
        ListEmptyComponent={<Text>Empty Data</Text>}
        data={data?.getItems?.nodes}
        renderItem={({item, index}) => (
          <ItemListtCard
            key={index}
            item={{
              name: item?.name ? item.name : 'not found',
              price: item?.price ? item?.price : 'not found',
              imageUrl:'https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?semt=ais_hybrid&w=740',
              rating: item?.starRating ? item.starRating : 3,
              stocks: item && item.stockQuantity ? item?.stockQuantity : 10,
              shop: {
                name:
                  item?.shop && item.shop.name ? item.shop.name : 'not found',
              },
            }}></ItemListtCard>
        )}></FlatListScreen>
    </>
    // <SliderSwitcher
    //   popupIcon="camera"
    //   popupButtonName="Add Item"
    //   popupButtonPressed={() =>
    //     navigation.navigate('AddItemScreen', {
    //       shopName: 'Hamro SHop',
    //     })
    //   }>
    //   <View key="All">
    //     <>
    //       {data && data.getItems && data.getItems.nodes ? (
    //         data.getItems.nodes?.length > 0 ? (
    //           <>
    //             <FlatList
    //               showsVerticalScrollIndicator={false}
    //               // onScrollEndDrag={() => {
    //               //   data.getItems?.pageInfo.hasNextPage
    //               //     ? fetchMore({
    //               //         variables: {
    //               //           after: data.getItems.pageInfo.endCursor,
    //               //         },
    //               //       })
    //               //     : null;
    //               // }}
    //               data={data.getItems.nodes}
    //               renderItem={({item, index}) => (
    //
    //               )}></FlatList>
    //             {/* {y ?? <ActivityIndicator></ActivityIndicator>} */}
    //           </>
    //         ) : (
    //           <>
    //             <Text>No Any Item Founds</Text>
    //           </>
    //         )
    //       ) : (
    //         <View
    //           style={{
    //             flexDirection: 'column',
    //             alignItems: 'center',
    //             marginTop: 200,
    //           }}>
    //           <SamagraLoader />
    //         </View>
    //       )}
    //     </>
    //   </View>
    //   <View key="Stocks">
    //     <>
    //       {data && data.getItems && data.getItems.nodes ? (
    //         data.getItems.nodes?.length > 0 ? (
    //           <>
    //             <FlatList
    //               showsVerticalScrollIndicator={false}
    //               // onScrollEndDrag={() => {
    //               //   data.getItems?.pageInfo.hasNextPage
    //               //     ? fetchMore({
    //               //         variables: {
    //               //           after: data.getItems.pageInfo.endCursor,
    //               //         },
    //               //       })
    //               //     : null;
    //               // }}
    //               data={data.getItems.nodes}
    //               renderItem={({item, index}) => (
    //                 <ItemListtCard
    //                   key={index}
    //                   item={{
    //                     name: item?.name ? item.name : 'not found',
    //                     price: item?.price ? item?.price : 'not found',
    //                     imageUrl:
    //                       'https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?semt=ais_hybrid&w=740',
    //                     rating: item?.starRating ? item.starRating : 3,
    //                     stocks:
    //                       item && item.stockQuantity ? item?.stockQuantity : 10,
    //                     shop: {
    //                       name:
    //                         item?.shop && item.shop.name
    //                           ? item.shop.name
    //                           : 'not found',
    //                     },
    //                   }}></ItemListtCard>
    //               )}></FlatList>
    //             {/* {y ?? <ActivityIndicator />} */}
    //           </>
    //         ) : (
    //           <>
    //             <Text>No Any Item Founds</Text>
    //           </>
    //         )
    //       ) : (
    //         <SamagraLoader />
    //       )}
    //     </>
    //   </View>
    //   <View key="Orders">
    //     <>
    //       {data && data.getItems && data.getItems.nodes ? (
    //         data.getItems.nodes?.length > 0 ? (
    //           <>
    //             <FlatList
    //               showsVerticalScrollIndicator={false}
    //               // onScrollEndDrag={() => {
    //               //   data.getItems?.pageInfo.hasNextPage
    //               //     ? fetchMore({
    //               //         variables: {
    //               //           after: data.getItems.pageInfo.endCursor,
    //               //         },
    //               //       })
    //               //     : null;
    //               // }}
    //               data={data.getItems.nodes}
    //               renderItem={({item, index}) => (
    //                 <ItemListtCard
    //                   key={index}
    //                   item={{
    //                     name: item?.name ? item.name : 'not found',
    //                     price: item?.price ? item?.price : 'not found',
    //                     imageUrl: ItemImageNotFound,
    //                     rating: item?.starRating ? item.starRating : 3,
    //                     stocks:
    //                       item && item.stockQuantity ? item?.stockQuantity : 10,
    //                     shop: {
    //                       name:
    //                         item?.shop && item.shop.name
    //                           ? item.shop.name
    //                           : 'not found',
    //                     },
    //                   }}></ItemListtCard>
    //               )}></FlatList>
    //             {/* {y ?? <ActivityIndicator />} */}
    //           </>
    //         ) : (
    //           <>
    //             <Text>No Any Item Founds</Text>
    //           </>
    //         )
    //       ) : (
    //         <SamagraLoader />
    //       )}
    //     </>
    //   </View>
    // </SliderSwitcher>
  );
};
