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

interface AddShopScreenProps {}

export const AddShopScreen: React.FC<AddShopScreenProps> = ({}) => {
  const {colors, fonts} = useTheme();
  const dispatch = useAppDispatch();
  const [createNewShopFn, {data, loading, error}] = useMutation(createNewStore);
  const [isShopCreated, setIsShopCreated] = useState<boolean>(false);
  const navigation = useNavigation<any>();

  const handleNavigationToShopScreen = async () => {
    await navigation.navigate('ApplicationOverlay', {
      screen: 'ShopCreatedScreen',
    });
  };

  // Handles the Shops Creation
  const handlCreateShopSubmit = async (
    data: CreateStoreInputViewModelInput,
  ) => {
    console.log('Action>>>>');
    dispatch(showLoader());
    try {
      const response = await createNewShopFn({
        variables: {
          shopName: data.name ? data.name : NotMentioned,
          phoneNumber: data.phoneNumber ? data.phoneNumber : NotMentioned,
          aboutShop: data.aboutShop ? data.aboutShop : NotMentioned,
          latitude: data.latitude,
          longitude: data.longitude,
          totalItemsCount: 22,
        },
      });
      console.log('Error', error);

      if (response.data) {
        handleNavigationToShopScreen();
      }

      if (response.errors) {
        console.log('Error', error);

        dispatch(hideLoader());
        showMessage(
          responseTheme(
            `${response.errors[0].message}`,
            TryAgainMessage,
            'danger',
          ),
        );
        handleNavigationToShopScreen();
      }
    } catch (error) {
      console.log('Error', error);

      dispatch(hideLoader());
      showMessage(responseTheme(WentwrongMessage, TryAgainMessage, 'danger'));
      handleNavigationToShopScreen();
    }
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
    </View>
  );
};
