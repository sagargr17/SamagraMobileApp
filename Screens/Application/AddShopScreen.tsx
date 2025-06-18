import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {
  hideLoader,
  showLoader,
} from '../../StateManagement/Error&loadingHandle/LoaderStateSlice';
import {useAppDispatch} from '../../StateManagement/hooks';

import {useMutation} from '@apollo/client';
import {showMessage} from 'react-native-flash-message';
import {ShopDisplayCard} from '../../Components/Molecules/ShopDisplayCard';
import {AppForm} from '../../Components/Organism/AppForm';
import {
  NotMentioned,
  TryAgainMessage,
  WentwrongMessage,
} from '../../Constants/UI/Messages';
import {createNewStore} from '../../GraphQL/Mutation/ShopMutations';
import {responseTheme, size} from '../../Prefrences/Prefrences';
import {CreateStoreInputViewModelInput} from '../../src/__generated__/graphql';
import {AreaMapper} from '../../Utilities/CustomMethods';
import {View} from 'moti';
import {setUserShopDetail} from '../../StateManagement/User/UserSlice';

interface AddShopScreenProps {}

export const AddShopScreen: React.FC<AddShopScreenProps> = ({}) => {
  const {colors, fonts} = useTheme();
  const dispatch = useAppDispatch();
  const [createNewShopFn] = useMutation(createNewStore);
  const navigation = useNavigation<any>();

  const handleNavigationToShopScreen = async (shopID: string) => {
    await navigation.navigate('ApplicationOverlay', {
      screen: 'ShopCreatedScreen',
      params: {
        shopID: shopID,
      },
    });
  };

  // Handles the Shops Creation
  const handlCreateShopSubmit = async (
    data: CreateStoreInputViewModelInput,
  ) => {
    console.log('Action>>>>');
    // try {
    //   const response = await createNewShopFn({
    //     variables: {
    //       shopName: data.name ? data.name : NotMentioned,
    //       phoneNumber: data.phoneNumber ? data.phoneNumber : NotMentioned,
    //       aboutShop: data.aboutShop ? data.aboutShop : NotMentioned,
    //       latitude: Number(data.latitude),
    //       longitude: Number(data.longitude),
    //       totalItemsCount: 22,
    //     },
    //   });

    //   if (response.data?.createStore?.id) {
    //     dispatch(
    //       setUserShopDetail({
    //         shopId: response.data.createStore.id,
    //         name: data.name ?? NotMentioned,
    //         location: 'butwal',
    //       }),
    //     );
    //     handleNavigationToShopScreen(response.data.createStore?.id);
    //   }

    //   if (response.errors) {
    //     dispatch(hideLoader());
    //     showMessage(
    //       responseTheme(
    //         `${response.errors[0].message}`,
    //         TryAgainMessage,
    //         'danger',
    //       ),
    //     );
    //   }
    // } catch (error) {
    //   dispatch(hideLoader());
    //   console.log('Result', error);

    //   showMessage(responseTheme(WentwrongMessage, TryAgainMessage, 'danger'));
    // }
  };

  return (
    <View
      // showsVerticalScrollIndicator={false}
      style={{
        flexDirection: 'column',
        paddingHorizontal: size.spacing.s,
        flex: 1,
      }}>
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
            type: 'number', // Custom prop for keyboard type
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
            type: 'number', // Custom prop for keyboard type
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
            type: 'phone', // Custom prop for keyboard type
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
    </View>
  );
};
