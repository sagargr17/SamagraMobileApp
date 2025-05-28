import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {SliderSwitcher} from '../../../Components/Layout/SliderSwitcher';

import {useMutation, useQuery} from '@apollo/client';
import {ScrollView, StyleSheet, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {ProgressBar} from 'react-native-paper';
import {Logos} from '../../../Assets/SVG/Exports/Exports';
import {AppForm} from '../../../Components/Layout/AppForm';
import {MyShopDisplay} from '../../../Components/Layout/MyShopDisplay';
import {SamagraLoader} from '../../../Components/Sections/ErrorHandling/SamagraLoader';
import {SamagraAlert} from '../../../Components/Sections/SamagraAlert';
import {ShopDisplayCard} from '../../../Components/Sections/ShopDisplayCard';
import {createNewShop} from '../../../GraphQL/Mutation/ShopMutations';
import {myShops} from '../../../GraphQL/Queries/PrivateShop';
import {ShopInputDto} from '../../../src/__generated__/graphql';
import ConfettiCannon from 'react-native-confetti-cannon';

interface MyShopsProps {}

export const MyShopsScreen: React.FC<MyShopsProps> = ({}) => {
  // Themes
  const {colors} = useTheme();
  const {Shop1, Shop2, WelcomeShop} = Logos;

  // Status
  const [createNewShopFn, {data, loading, error}] = useMutation(createNewShop);
  const [siStatus, setStatus] = useState<boolean>(false);

  // Handles the Shops Items
  const handlCreateShopSubmit = async (data: ShopInputDto) => {
    try {
      const response = await createNewShopFn({
        variables: {
          shopName: data.name,
          phoneNumber: data.phoneNumber,
          aboutShop: data.aboutShop,
          profileImageUrl:
            'https://t3.ftcdn.net/jpg/02/72/92/40/360_F_272924092_IhPcJtGqD3cHcomwtGqAsZ34GgNENkYW.jpg',
          coverImageUrl:
            'https://t3.ftcdn.net/jpg/02/72/92/40/360_F_272924092_IhPcJtGqD3cHcomwtGqAsZ34GgNENkYW.jpg',
          location: data.location,
        },
      });
      if (response.data) {
        showMessage({
          message: 'Shop Added SuccessFully !!',
          type: 'success',
        });
      }

      if (response.errors) {
        showMessage({
          message: response.errors[0].message,
          type: 'danger',
        });
      }
    } catch (error) {
      console.log('Error whilem adding SHop', error);
    }
  };
  const [isCreateNewShop, setIsCreateNewShop] = useState<boolean>(false);

  const {
    data: myShopsData,
    loading: myShopsLoading,
    error: myShopsError,
  } = useQuery(myShops);

  return (
    <>
      {myShopsLoading ? (
        <SamagraLoader></SamagraLoader>
      ) : (
        <View
          style={{
            flex: 1,
          }}>
          <SliderSwitcher upperContainerFlexHeight={0.07}>
            {isCreateNewShop === true ? (
              <ScrollView
                key="Create New Shop"
                style={{
                  flex: 1,
                }}>
                {loading ? <ProgressBar indeterminate></ProgressBar> : null}

                <ShopDisplayCard
                  shop={{
                    id: `${Math.random()}`,
                    icon: (
                      <>
                        <AppForm<ShopInputDto>
                          formConfig={[
                            {
                              name: 'name', // Must match a key in LoginFormValues
                              label: 'Name',
                              placeholder: 'Your Dispaly Shop Name',
                              type: 'email', // Custom prop for keyboard type
                              rules: {
                                minLength: {
                                  value: 3,
                                  message: 'Too Short',
                                },
                                maxLength: {
                                  value: 12,
                                  message: 'too long',
                                },
                                required: 'Required',
                              },
                            },
                            {
                              name: 'location', // Must match a key in LoginFormValues
                              label: 'Loation',
                              placeholder: 'your shop address',
                              type: 'text', // Custom prop for keyboard type
                              rules: {
                                maxLength: {
                                  value: 20,
                                  message: 'too long',
                                },
                                required: 'Required',
                              },
                            },
                            {
                              name: 'phoneNumber', // Must match a key in LoginFormValues
                              label: 'Phone Number*',
                              placeholder: '984****',
                              type: 'text', // Custom prop for keyboard type
                              rules: {
                                maxLength: {
                                  value: 20,
                                  message: 'too long',
                                },
                                required: 'Required',
                              },
                            },

                            {
                              name: 'aboutShop', // Must match a key in LoginFormValues
                              label: 'Shop Description',
                              placeholder: 'Shop Is Awesome',
                              type: 'text', // Custom prop for keyboard type
                              rules: {
                                maxLength: {
                                  value: 9,
                                  message: 'too long',
                                },
                                required: 'Required',
                              },
                            },
                          ]}
                          submitButtonText="Submit"
                          onFormSubmit={handlCreateShopSubmit}></AppForm>
                        {data ? (
                          <ConfettiCannon count={200} origin={{x: -10, y: 0}} />
                        ) : null}
                      </>
                    ),
                    shopName: 'Hamro Bijuli Pasal',
                    shopDescription:
                      'All the Electronic Appliances available Here',
                    rating: 4,
                    item: {
                      totalProduct: 167,
                      totalServices: 2,
                    },

                    owner: {
                      owner: {
                        ownerName: 'Sagar Gahatraj',
                        phoneNumber: '+9779841150390',
                      },
                    },
                  }}></ShopDisplayCard>
              </ScrollView>
            ) : null}
            {myShopsData &&
            myShopsData.getShops &&
            myShopsData.getShops.nodes &&
            myShopsData.getShops.nodes.length > 0
              ? myShopsData?.getShops?.nodes.map((item, index) => (
                  <MyShopDisplay
                    onCreateNewShop={() => setIsCreateNewShop(!isCreateNewShop)}
                    key={index}
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
                        console.log('Pennding'),
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
