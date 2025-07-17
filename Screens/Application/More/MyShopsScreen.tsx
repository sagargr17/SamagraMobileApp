import {useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {SliderSwitcher} from '../../../Components/Organism/SliderSwitcher';

import {useLazyQuery, useMutation, useQuery} from '@apollo/client';
import {ActivityIndicatorComponent, StyleSheet, View} from 'react-native';
import {MyStoreLayout} from '../../../Components/Molecules/MyStoreLayout';
import {SamagraLoader} from '../../../Components/Elements/SamagraLoader';
import {createNewStore} from '../../../GraphQL/Mutation/ShopMutations';

import {useAppDispatch} from '../../../StateManagement/hooks';
import {ActivityIndicator, Text} from 'react-native-paper';
import {myShops} from '../../../GraphQL/Queries/PrivateShopQueries';
import {NotMentioned} from '../../../Constants/UI/Messages';

interface MyShopsProps {}

export const MyShopsScreen: React.FC<MyShopsProps> = ({}) => {
  // Themes
  const {fonts} = useTheme();
  const dispatch = useAppDispatch();

  // Status
  const [createNewShopFn, {data, loading, error}] = useMutation(createNewStore);
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

  let index = 0;
  return (
    <>
      {myShopsLoading ? (
        <SamagraLoader></SamagraLoader>
      ) : (
        <SliderSwitcher>
          <MyStoreLayout
            key={`${index + 1} `}
            shop={{
              name:
                (myShopsData?.getShops &&
                  myShopsData.getShops.edges &&
                  myShopsData.getShops.edges[index]?.node?.name) ??
                NotMentioned,

              aboutShop:
                (myShopsData?.getShops &&
                  myShopsData.getShops.edges &&
                  myShopsData.getShops.edges[index]?.node?.aboutShop) ??
                NotMentioned,
              phoneNumber:
                (myShopsData?.getShops &&
                  myShopsData.getShops.edges &&
                  myShopsData.getShops.edges[index]?.node?.phoneNumber) ??
                NotMentioned,
              stars: {
                stars: 3,
              },
              location:
                (myShopsData?.getShops &&
                  myShopsData.getShops.edges &&
                  myShopsData.getShops.edges[index]?.node?.location) ??
                NotMentioned,
              profileImageUrl: '',
            }}></MyStoreLayout>
        </SliderSwitcher>
      )}
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
