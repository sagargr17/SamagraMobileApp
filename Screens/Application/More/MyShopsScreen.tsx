import {useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {SliderSwitcher} from '../../../Components/Organism/SliderSwitcher';

import {useLazyQuery, useMutation, useQuery} from '@apollo/client';
import {ActivityIndicatorComponent, StyleSheet, View} from 'react-native';
import {MyStoreLayout} from '../../../Components/Molecules/MyStoreLayout';
import {SamagraLoader} from '../../../Components/Molecules/Response/SamagraLoader';
import {createNewShop} from '../../../GraphQL/Mutation/ShopMutations';

import {useAppDispatch} from '../../../StateManagement/hooks';
import {ActivityIndicator, Text} from 'react-native-paper';
import {myShops} from '../../../GraphQL/Queries/PrivateShopQueries';

interface MyShopsProps {}

export const MyShopsScreen: React.FC<MyShopsProps> = ({}) => {
  // Themes
  const {fonts} = useTheme();
  const dispatch = useAppDispatch();

  // Status
  const [createNewShopFn, {data, loading, error}] = useMutation(createNewShop);
  const [isShopCreated, setIsShopCreated] = useState<boolean>(false);
  const [
    myShopsQuery,
    {data: myShopsData, loading: myShopsLoading, error: myShopsError},
  ] = useLazyQuery(myShops, {
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    myShopsQuery();

    return () => {};
  }, []);

  console.log('SHOP  DAtA', data, loading, error);

  let index = 0;
  return (
    <>
      {myShopsLoading ? (
        <SamagraLoader></SamagraLoader>
      ) : (
        <MyStoreLayout
          key={`${index + 1} `}
          shop={{
            name:
              myShopsData?.getShops &&
              myShopsData.getShops.nodes &&
              myShopsData.getShops.nodes[index]?.aboutShop
                ? myShopsData.getShops.nodes[index]?.aboutShop
                : 'not mentioned',
            aboutShop:
              myShopsData?.getShops &&
              myShopsData.getShops.nodes &&
              myShopsData.getShops.nodes[index]?.aboutShop
                ? myShopsData.getShops.nodes[index]?.aboutShop
                : 'not mentioned',
            phoneNumber:
              myShopsData &&
              myShopsData.getShops?.nodes &&
              myShopsData.getShops?.nodes.length > 0 &&
              myShopsData.getShops.nodes[index]?.phoneNumber
                ? myShopsData.getShops.nodes[index].phoneNumber
                : 'not mentioned',
            stars: {
              stars: 3,
            },
            location:
              myShopsData &&
              myShopsData.getShops?.nodes &&
              myShopsData.getShops?.nodes.length > 0 &&
              myShopsData.getShops.nodes[index]?.location
                ? myShopsData.getShops.nodes[index].location
                : 'not mentioned',
            profileImageUrl: '',
          }}></MyStoreLayout>
      )}

      {/* {myShopsLoading ? (
        <SamagraLoader></SamagraLoader>
      ) : (
        <View
          style={{
            flex: 1,
          }}>
          <SliderSwitcher upperContainerFlexHeight={0.05}>
            {myShopsData &&
            myShopsData.getShops &&
            myShopsData.getShops.nodes &&
            myShopsData.getShops.nodes.length > 0
              ? myShopsData?.getShops?.nodes.map((item, index) => (
                  <MyShopDisplayLayout
                    // onCreateNewShop={() => setIsNewShopTabClicked(true)}
                    key={`${index + 1}. ${item?.name} `}
                    shop={{
                      name:
                        myShopsData?.getShops &&
                        myShopsData.getShops.nodes &&
                        myShopsData.getShops.nodes[index]?.aboutShop
                          ? myShopsData.getShops.nodes[index]?.aboutShop
                          : 'not mentioned',
                      aboutShop:
                        myShopsData?.getShops &&
                        myShopsData.getShops.nodes &&
                        myShopsData.getShops.nodes[index]?.aboutShop
                          ? myShopsData.getShops.nodes[index]?.aboutShop
                          : 'not mentioned',
                      phoneNumber:
                        myShopsData &&
                        myShopsData.getShops?.nodes &&
                        myShopsData.getShops?.nodes.length > 0 &&
                        myShopsData.getShops.nodes[index]?.phoneNumber
                          ? myShopsData.getShops.nodes[index].phoneNumber
                          : 'not mentioned',
                      stars: {
                        stars: 3,
                      },
                      location:
                        myShopsData &&
                        myShopsData.getShops?.nodes &&
                        myShopsData.getShops?.nodes.length > 0 &&
                        myShopsData.getShops.nodes[index]?.location
                          ? myShopsData.getShops.nodes[index].location
                          : 'not mentioned',
                      profileImageUrl: '',
                    }}
                    navigationHandles={{
                      onHitoryNavigationHandle: () => console.log('going'),
                      onManageStocksNavigationHandle: () =>
                        console.log('going'),
                      onProductNavigationHandle: () => console.log('going'),
                      onServiceNavigationHadle: () => console.log('going'),
                      onPendingOrdersNavigationHandle: () =>
                        console.log('going'),
                    }}></MyShopDisplayLayout>
                ))
              : null}
          </SliderSwitcher>
        </View>
      )} */}
    </>
  );
};

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
  },
});
