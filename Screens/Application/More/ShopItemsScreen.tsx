import React from 'react';
import {ActivityIndicator, FlatList, ScrollView, Text} from 'react-native';

import {useQuery} from '@apollo/client';
import {useNavigation, useTheme} from '@react-navigation/native';
import {TextComponet} from '../../../Components/Elements/TextComponet';
import {SliderSwitcher} from '../../../Components/Layout/SliderSwitcher';
import {ItemListtCard} from '../../../Components/Sections/Cards/ItemListCard';
import {ApplicationOverlayStackNavigationProp} from '../../../Navigators/Stack/ApplicationOverlayStackNavigator';
import {getPersonalItems} from '../../../GraphQL/Queries/ItemQueries';
import {LoneSchemaDefinitionRule} from 'graphql';
import {View} from 'moti';

interface ShopItemsScreenProps {}

export const ShopItemsScreen: React.FC<ShopItemsScreenProps> = ({}) => {
  const {colors} = useTheme();
  const navigation =
    useNavigation<ApplicationOverlayStackNavigationProp<'AddItemScreen'>>();
  const {data, loading, error} = useQuery(getPersonalItems);

  console.log('Query shop Items Response', data, loading, error);

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
        <View key="Pending">
          <>
            {loading ?? <ActivityIndicator />}

            {data && data.getItems && data.getItems.nodes ? (
              data.getItems.nodes?.length > 0 ? (
                <>
                  <FlatList
                    data={data.getItems.nodes}
                    renderItem={({item, index}) => (
                      <ItemListtCard
                        key={index}
                        item={{
                          name: item?.name ? item.name : 'not found',
                          price: item?.price ? item?.price : 'not found',
                          // imageUrl:
                          //   item &&
                          //   item.imageUrls &&
                          //   item.imageUrls.length > 0 &&
                          //   item.imageUrls[0]
                          //     ? item.imageUrls[0]
                          //     : 'https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?semt=ais_hybrid&w=740',
                          imageUrl:
                            'https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?semt=ais_hybrid&w=740',
                          rating: item?.starRating ? item.starRating : 3,
                        }}></ItemListtCard>
                    )}></FlatList>
                </>
              ) : (
                <>
                  <Text>No Any Item Founds</Text>
                </>
              )
            ) : (
              <Text>SomeThing Went Wrong</Text>
            )}
          </>
        </View>
        <TextComponet
          key={'Stock'}
          title="Stocks"
          fontVariant="regular"></TextComponet>
        <TextComponet title="Adds" fontVariant="regular"></TextComponet>
        <TextComponet title="Price" fontVariant="regular"></TextComponet>
        <TextComponet title="ItemStatics" fontVariant="regular"></TextComponet>
      </SliderSwitcher>
    </>
  );
};
