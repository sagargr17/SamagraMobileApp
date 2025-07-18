import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {hideLoader} from '../../StateManagement/Error&loadingHandle/LoaderStateSlice';
import {useAppDispatch, useAppSelector} from '../../StateManagement/hooks';

import {useMutation} from '@apollo/client';
import {View} from 'moti';
import {showMessage} from 'react-native-flash-message';
import {AppForm} from '../../Components/Organism/AppForm';
import {
  NotMentioned,
  TryAgainMessage,
  WentwrongMessage,
} from '../../Constants/UI/Messages';
import {createNewStore} from '../../GraphQL/Mutation/ShopMutations';
import {responseTheme, size} from '../../Prefrences/Prefrences';
import {CreateShopInputViewModelInput} from '../../src/__generated__/graphql';
import {setUserShopDetail} from '../../StateManagement/User/UserSlice';
import {useSelector} from 'react-redux';
import {ScrollView} from 'react-native';

interface AddShopScreenProps {}

export const AddShopScreen: React.FC<AddShopScreenProps> = ({}) => {
  const dispatch = useAppDispatch();
  const [createNewShopFn] = useMutation(createNewStore);
  const navigation = useNavigation<any>();
  const userLocation = useAppSelector(state => state.user.userLocation);

  const handleNavigationToShopScreen = async (shopID: string) => {
    await navigation.navigate('ApplicationOverlay', {
      screen: 'ShopCreatedScreen',
      params: {
        shopID: shopID,
      },
    });
  };

  // Handles the Shops Creation
  const handlCreateShopSubmit = async (data: CreateShopInputViewModelInput) => {
    try {
      const response = await createNewShopFn({
        variables: {
          shopName: data.name ? data.name : NotMentioned,
          phoneNumber: data.phoneNumber ? data.phoneNumber : NotMentioned,
          aboutShop: data.aboutShop ? data.aboutShop : NotMentioned,
          latitude: Number(userLocation?.lat),
          longitude: Number(userLocation?.long),
          totalItemsCount: 22,
        },
      });

      if (response.data?.createShop?.id) {
        dispatch(
          setUserShopDetail({
            shopId: response.data.createShop.id,
            name: data.name ?? NotMentioned,
            location: 'butwal',
          }),
        );
        handleNavigationToShopScreen(response.data.createShop?.id);
      }

      if (response.errors) {
        dispatch(hideLoader());
        showMessage(
          responseTheme(
            `${response.errors[0].message}`,
            TryAgainMessage,
            'danger',
          ),
        );
      }
    } catch (error) {
      dispatch(hideLoader());
      console.log('Result', error);

      showMessage(responseTheme(WentwrongMessage, TryAgainMessage, 'danger'));
    }
  };

  return (
    <ScrollView
      // showsVerticalScrollIndicator={false}
      style={{
        flexDirection: 'column',
        paddingHorizontal: size.spacing.s,
        flex: 1,
      }}>
      <AppForm<CreateShopInputViewModelInput>
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
    </ScrollView>
  );
};
