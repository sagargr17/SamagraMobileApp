import React from 'react';
import {ActivityIndicator, FlatList, Text} from 'react-native';

import {useQuery} from '@apollo/client';
import {useNavigation, useTheme} from '@react-navigation/native';
import {View} from 'moti';
import {TextComponet} from '../../../Components/Elements/TextComponet';
import {SliderSwitcher} from '../../../Components/Layout/SliderSwitcher';
import {ItemListtCard} from '../../../Components/Sections/Cards/ItemListCard';
import {
  getPaginatedPersonalItems,
  getPersonalItems,
} from '../../../GraphQL/Queries/ItemQueries';
import {ApplicationOverlayStackNavigationProp} from '../../../Navigators/Stack/ApplicationOverlayStackNavigator';
import {SamagraLoader} from '../../../Components/Sections/ErrorHandling/SamagraLoader';

interface ShopItemsScreenProps {}

export const ShopItemsScreen: React.FC<ShopItemsScreenProps> = ({}) => {
  const {colors} = useTheme();
  const navigation =
    useNavigation<ApplicationOverlayStackNavigationProp<'AddItemScreen'>>();
  const {data, loading, error, variables} = useQuery(getPersonalItems, {
    fetchPolicy: 'cache-first',
  });

  const {
    data: x,
    loading: y,
    error: z,
    fetchMore,
  } = useQuery(getPaginatedPersonalItems);

  return (
    <>
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
            {loading ?? <ActivityIndicator />}
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
                  {y ?? <SamagraLoader></SamagraLoader>}
                </>
              ) : (
                <>
                  <Text>No Any Item Founds</Text>
                </>
              )
            ) : (
              <ActivityIndicator />
            )}
          </>
        </View>
        <View key="Stocks">
          <>
            {loading ?? <ActivityIndicator />}

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
                  {y ?? <ActivityIndicator></ActivityIndicator>}
                </>
              ) : (
                <>
                  <Text>No Any Item Founds</Text>
                </>
              )
            ) : (
              <ActivityIndicator />
            )}
          </>
        </View>

        <TextComponet title="Adds" fontVariant="regular"></TextComponet>
        <TextComponet title="Price" fontVariant="regular"></TextComponet>
        <TextComponet title="ItemStatics" fontVariant="regular"></TextComponet>
      </SliderSwitcher>
    </>
  );
};
