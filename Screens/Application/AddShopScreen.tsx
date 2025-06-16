import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {Alert, ScrollView, Text, View} from 'react-native';
import {useAppDispatch} from '../../StateManagement/hooks';
import {
  hideLoader,
  showLoader,
} from '../../StateManagement/Error&loadingHandle/LoaderStateSlice';

import {useMutation} from '@apollo/client';
import {createNewStore} from '../../GraphQL/Mutation/ShopMutations';
import {ShopDisplayCard} from '../../Components/Molecules/ShopDisplayCard';
import {AppForm} from '../../Components/Organism/AppForm';
import {AreaMapper} from '../../Utilities/CustomMethods';
import {showMessage} from 'react-native-flash-message';
import {Surface} from 'react-native-paper';
import {TextComponet} from '../../Components/Elements/TextComponet';
import {Logos} from '../../Assets/SVG/Exports/Exports';
import {CreateStoreInputViewModelInput} from '../../src/__generated__/graphql';
import {NoDataMessage} from '../../Constants/UI/Messages';
import {size} from '../../Prefrences/Prefrences';

interface AddShopScreenProps {}

export const AddShopScreen: React.FC<AddShopScreenProps> = ({}) => {
  const {colors, fonts} = useTheme();
  const dispatch = useAppDispatch();
  const [createNewShopFn, {data, loading, error}] = useMutation(createNewStore);
  const [isShopCreated, setIsShopCreated] = useState<boolean>(false);
  const navigation = useNavigation<any>();

  const handleNavigationToShopScreen = async () => {
    await navigation.navigate('ApplicationOverlay', {
      screen: 'MyShopsScreen',
    });
  };

  // Handles the Shops Items
  const handlCreateShopSubmit = async (
    data: CreateStoreInputViewModelInput,
  ) => {
    dispatch(showLoader());

    try {
      const response = await createNewShopFn({
        variables: {
          shopName: data.name ? data.name : NoDataMessage,
          phoneNumber: data.phoneNumber ? data.phoneNumber : NoDataMessage,
          aboutShop: data.aboutShop ? data.aboutShop : NoDataMessage,
          latitude: data.latitude,
          longitude: data.longitude,
          totalItemsCount: 22,
        },
      });
      if (response.data) {
        setIsShopCreated(!isShopCreated);
        dispatch(hideLoader());

        showMessage({
          message: 'Shop Added SuccessFully !!',
          description: 'New Shop Has been Created Please visit It.',
          type: 'success',
          textStyle: {
            fontFamily: fonts.regular.fontFamily,
            fontWeight: 'regular',
            fontSize: AreaMapper({
              value: 14,
              scaleBy: 'average',
            }),
          },
          statusBarHeight: AreaMapper({
            value: 15,
            scaleBy: 'average',
          }),
        });
        handleNavigationToShopScreen();
      }

      if (response.errors) {
        dispatch(hideLoader());
        showMessage({
          message: 'Opps, Something Went Wrong!',
          type: 'danger',
          description: 'Please , try after sometimes',
          textStyle: {
            fontFamily: fonts.regular.fontFamily,
            fontWeight: 'regular',
            fontSize: AreaMapper({
              value: 14,
              scaleBy: 'average',
            }),
          },
          statusBarHeight: AreaMapper({
            value: 15,
            scaleBy: 'average',
          }),
        });
      }
    } catch (error) {
      dispatch(hideLoader());
      showMessage({
        message: 'Opps, Something Went Wrong!',
        type: 'danger',
        description: 'Please , try after sometimes',
        textStyle: {
          fontFamily: fonts.regular.fontFamily,
          fontWeight: 'regular',
          fontSize: AreaMapper({
            value: 14,
            scaleBy: 'average',
          }),
        },
        statusBarHeight: AreaMapper({
          value: 15,
          scaleBy: 'average',
        }),
      });
    }
  };

  const {Construction} = Logos;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexDirection: 'column',
        paddingHorizontal: size.spacing.s,
      }}>
      <ShopDisplayCard
        shop={{
          id: `${Math.random()}`,
          icon: (
            <>
              <AppForm<CreateStoreInputViewModelInput>
                formConfig={[
                  {
                    name: 'name', // Must match a key in LoginFormValues
                    label: 'Name',
                    placeholder: 'Your Dispaly Shop Name',
                    type: 'text', // Custom prop for keyboard type
                    rules: {
                      minLength: {
                        value: 3,
                        message: 'Too Short',
                      },
                      maxLength: {
                        value: 25,
                        message: 'too long',
                      },
                      required: 'Required',
                    },
                  },
                  {
                    name: 'latitude', // Must match a key in LoginFormValues
                    label: 'Latitude',
                    placeholder: 'your shop latitude',
                    type: 'text', // Custom prop for keyboard type
                    rules: {
                      maxLength: {
                        value: 30,
                        message: 'too long',
                      },
                      required: 'Required',
                    },
                  },
                  {
                    name: 'longitude', // Must match a key in LoginFormValues
                    label: 'Longitude',
                    placeholder: 'your shop longitude',
                    type: 'text', // Custom prop for keyboard type
                    rules: {
                      maxLength: {
                        value: 30,
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
                        value: 10,
                        message: 'too long',
                      },
                      required: 'Required',
                    },
                  },

                  {
                    name: 'aboutShop', // Must match a key in LoginFormValues
                    label: 'Shop Description',
                    placeholder: '" Hami kaha sabai harware ko saman pauncha "',
                    type: 'description', // Custom prop for keyboard type
                    rules: {
                      maxLength: {
                        value: 50,
                        message: 'too long',
                      },
                      required: 'Required',
                    },
                  },
                ]}
                submitButtonText="Submit"
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
  );
};
