import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {SliderSwitcher} from '../../../Components/Layout/SliderSwitcher';

import {useMutation, useQuery} from '@apollo/client';
import {StyleSheet, View} from 'react-native';
import {MyShopDisplay} from '../../../Components/Layout/MyShopDisplay';
import {SamagraLoader} from '../../../Components/Sections/ErrorHandling/SamagraLoader';
import {createNewShop} from '../../../GraphQL/Mutation/ShopMutations';
import {myShops} from '../../../GraphQL/Queries/PrivateShop';
import {useAppDispatch} from '../../../StateManagement/hooks';

interface MyShopsProps {}

export const MyShopsScreen: React.FC<MyShopsProps> = ({}) => {
  // Themes
  const {fonts} = useTheme();
  // const navigationn

  // Status
  const [createNewShopFn, {data, loading, error}] = useMutation(createNewShop);
  const [isShopCreated, setIsShopCreated] = useState<boolean>(false);
  const {
    data: myShopsData,
    loading: myShopsLoading,
    error: myShopsError,
  } = useQuery(myShops, {
    fetchPolicy: 'network-only',
  });

  const dispatch = useAppDispatch();

  // Handles the Shops Items

  return (
    <>
      {myShopsLoading ? (
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
                  <MyShopDisplay
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
                    }}></MyShopDisplay>
                ))
              : null}
          </SliderSwitcher>
        </View>
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
