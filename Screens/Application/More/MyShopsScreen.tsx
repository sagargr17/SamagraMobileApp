import {useTheme} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {SliderSwitcher} from '../../../Components/Layout/SliderSwitcher';

import {Logos} from '../../../Assets/SVG/Exports/Exports';
import {TextComponet} from '../../../Components/Elements/TextComponet';
import {SamagraBottomSheet} from '../../../Components/Sections/SamagraBottomSheet';
import {ShopDisplayCard} from '../../../Components/Sections/ShopDisplayCard';
import {SamagraScaller} from '../../../Utilities/CustomMethods';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Badge, Icon, ProgressBar, Surface} from 'react-native-paper';
import FastImage from '@d11/react-native-fast-image';
import {ItemCardVerticleSlider} from '../../../Components/Layout/ItemCardVerticleSlider';
import AppButton from '../../../Components/Elements/Button';
import {PoppedCard} from '../../../Components/Sections/Cards/PoppedCard';
import {AppForm} from '../../../Components/Layout/AppForm';
import {
  CreateProductRequestInput,
  GetMySHopsQuery,
  ShopInputDto,
} from '../../../src/__generated__/graphql';
import {useMutation, useQuery} from '@apollo/client';
import {createNewShop} from '../../../GraphQL/Mutation/ShopMutations';
import {SamagraAlert} from '../../../Components/Sections/SamagraAlert';
import {getPersonalItems} from '../../../GraphQL/Queries/ItemQueries';
import {myShops} from '../../../GraphQL/Queries/PrivateShop';
import {FlatList} from 'react-native-gesture-handler';
import {MyShopDisplay} from '../../../Components/Layout/MyShopDisplay';
import {SamagraLoader} from '../../../Components/Sections/ErrorHandling/SamagraLoader';

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
      const response = createNewShopFn({
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
      if ((await response).data) {
        setStatus(!siStatus);
      }
    } catch (error) {
      console.log('Error whilem adding SHop', error);
    }
  };

  // const children = (data: GetMySHopsQuery) => {
  //   <>
  //     <FlatList
  //       data={data.getShops?.nodes}
  //       renderItem={({item, index}) => (

  //       )}></FlatList>
  //   </>;
  // };

  const [isCreateNewShop, setIsCreateNewShop] = useState<boolean>(false);

  const {
    data: myShopsData,
    loading: myShopsLoading,
    error: myShopsError,
  } = useQuery(myShops);

  console.log('Result', myShopsData, myShopsLoading, myShopsError);

  return (
    <View
      style={{
        flex: 1,
      }}>
      {myShopsLoading ? <SamagraLoader></SamagraLoader> : null}

      {siStatus === true ? (
        <SamagraAlert
          onAgreeHandle={() => setStatus(true)}
          key={1}
          title="Completed"
          description="Item Added SuccessFully"
          icon="read"></SamagraAlert>
      ) : null}
      <SliderSwitcher upperContainerFlexHeight={0.07}>
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
                  onManageStocksNavigationHandle: () => console.log('going'),
                  onProductNavigationHandle: () => console.log('going'),
                  onServiceNavigationHadle: () => console.log('going'),
                  onPendingOrdersNavigationHandle: () =>
                    console.log('Pennding'),
                }}></MyShopDisplay>
            ))
          : null}

        {isCreateNewShop === true ? (
          <ScrollView key="Create New Shop">
            {loading ?? <ProgressBar indeterminate></ProgressBar>}
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
                      submitButtonText="Test"
                      onFormSubmit={handlCreateShopSubmit}></AppForm>
                  </>
                ),
                shopName: 'Hamro Bijuli Pasal',
                shopDescription: 'All the Electronic Appliances available Here',
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
      </SliderSwitcher>

      {/* {myShopsData && myShopsData.getShops && myShopsData.getShops.nodes
          ? children(myShopsData)
          : null} */}
      {/* <ScrollView key="Create New Shop">
          {loading ?? <ProgressBar indeterminate></ProgressBar>}
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
                    submitButtonText="Test"
                    onFormSubmit={handlCreateShopSubmit}></AppForm>
                </>
              ),
              shopName: 'Hamro Bijuli Pasal',
              shopDescription: 'All the Electronic Appliances available Here',
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
        <ScrollView key="Hamro Bijuli Pasal">
          <ShopDisplayCard
            shop={{
              id: `${Math.random()}`,
              icon: (
                <>
                  <Shop1
                    height={SamagraScaller({
                      value: 450,
                      scaleBy: 'height',
                    })}
                    width={'80%'}></Shop1>
                  <AppButton
                    onPress={() => console.log('Add item')}
                    style={{
                      width: SamagraScaller({
                        value: 300,
                        scaleBy: 'average',
                      }),
                    }}>
                    Add Item
                  </AppButton>
                </>
              ),
              shopName: 'Hamro Bijuli Pasal',
              shopDescription: 'All the Electronic Appliances available Here',
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

        <View
          key="Hamro Retal Shop"
          style={{
            padding: SamagraScaller({
              value: 14,
              scaleBy: 'average',
            }),
            flex: 1,
          }}>
          <ScrollView
            style={{
              flex: 1,
            }}>
            <PoppedCard
              variant="large"
              iconName="dolly"
              comment="Create, Update,  Delete  & More on Products "
              title="Products"></PoppedCard>
            <PoppedCard
              iconName="account-hard-hat"
              comment="Create, Update,  Delete  & More on Services "
              variant="large"
              title="Services"></PoppedCard>
            <PoppedCard
              children={
                <Badge
                  selectionColor={'pink'}
                  style={{
                    bottom: 30,
                    left: 17,
                    // backgroundColor: 'green',
                  }}>
                  120
                </Badge>
              }
              variant="large"
              iconName="truck-delivery"
              comment="Accept or Delete User Request"
              title="Pending Orders"></PoppedCard>
            <PoppedCard
              variant="large"
              iconName="tray-full"
              comment="Update Your Stock Items"
              title="Manage Stocks"></PoppedCard>
            <PoppedCard
              variant="large"
              iconName="clipboard-list"
              comment="All Your Customer Deals"
              title="History"></PoppedCard>
          </ScrollView>

          <SamagraBottomSheet
            children={() => (
              <View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Surface
                    style={{
                      width: 80,
                      marginRight: 10,
                      height: 80,
                    }}>
                    <FastImage
                      style={{
                        height: 80,
                        width: 80,
                        borderRadius: 4,
                        marginRight: 10,
                      }}
                      source={{
                        uri: 'https://i.pinimg.com/736x/cf/d2/fd/cfd2fd0ba8a6e2d958b969fbf2953a8c.jpg',
                      }}></FastImage>
                  </Surface>
                  <View>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        // alignItems: 'center',
                      }}>
                      <View style={styles.ratingContainer}>
                        <Icon source="star" size={16} color={'gold'} />
                        <Icon source="star" size={16} color={'gold'} />
                        <Icon source="star" size={16} color={'gold'} />
                        <Icon source="star" size={16} color={'gold'} />
                      </View>
                      <TextComponet
                        customStyle={{
                          color: 'orange',
                        }}
                        fontVariant="bold"
                        title="Hamro Biujuli Pasal"
                        fontSize={24}
                        lineHeight={24}></TextComponet>
                    </View>
                    <TextComponet
                      customStyle={{
                        color: 'green',
                      }}
                      fontVariant="medium"
                      title="Open from 10:00 am to 7:pm"
                      fontSize={14}
                      lineHeight={18}></TextComponet>
                    <TextComponet
                      customStyle={{
                        opacity: 0.8,
                      }}
                      fontVariant="medium"
                      title="New Baneswor Chandbari"
                      fontSize={14}
                      lineHeight={18}></TextComponet>
                    <TextComponet
                      customStyle={{
                        opacity: 0.8,
                      }}
                      fontVariant="medium"
                      title="(+977)9841150390"
                      fontSize={14}
                      lineHeight={18}></TextComponet>
                  </View>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                  }}>
                  <AppButton
                    style={{
                      marginVertical: SamagraScaller({
                        value: 18,
                        scaleBy: 'height',
                      }),
                      flex: 0.7,
                    }}>
                    Edit Shop
                  </AppButton>
                  <AppButton
                    color="light"
                    style={{
                      marginVertical: SamagraScaller({
                        value: 18,
                        scaleBy: 'height',
                      }),
                      flex: 0.2,
                    }}>
                    Close Shop
                  </AppButton>
                </View>
                <View></View>
              </View>
            )}
            isOppen={true}
            flexHeight={1}
            pannigGesture={false}
            title="Request for House Keeping Service"></SamagraBottomSheet>
        </View>

        <View key="Janta Garage">
          <ShopDisplayCard
            shop={{
              id: `${Math.random()}`,
              icon: (
                <>
                  <Shop2
                    height={SamagraScaller({
                      value: 400,
                      scaleBy: 'height',
                    })}
                    width={'80%'}></Shop2>

                  <TextComponet
                    lineHeight={40}
                    customStyle={{
                      color: 'orange',
                    }}
                    fontVariant="medium"
                    fontSize={20}
                    title="0 Items & 0 Services"></TextComponet>
                  <AppButton
                    onPress={() => console.log('Add item')}
                    style={{
                      width: SamagraScaller({
                        value: 300,

                        scaleBy: 'average',
                      }),
                    }}>
                    Add Item
                  </AppButton>
                </>
              ),
              shopName: 'Hamro Bijuli Pasal',
              shopDescription: 'All the Electronic Appliances available Here',
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
        </View> */}
    </View>
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
