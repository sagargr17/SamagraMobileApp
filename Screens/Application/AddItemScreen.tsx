import {useMutation} from '@apollo/client';
import {useRoute, useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {AppForm} from '../../Components/Organism/AppForm';
import {ImageUploader} from '../../Components/Organism/ImageUploader';
import {ImageNotFound} from '../../Constants/UI/AssetsUrls';
import {
  NotMentioned,
  SuccessAddItemMessage,
  SuccessAddItemMessageDescription,
} from '../../Constants/UI/Messages';
import {createNewProduct} from '../../GraphQL/Mutation/ItemMutation';
import {responseTheme, size} from '../../Prefrences/Prefrences';
import {CreateProductInputViewModelInput} from '../../src/__generated__/graphql';
import {
  hideLoader,
  showLoader,
} from '../../StateManagement/Error&loadingHandle/LoaderStateSlice';
import {useAppDispatch, useAppSelector} from '../../StateManagement/hooks';
import {AreaMapper} from '../../Utilities/CustomMethods';
import {FlatListScreen} from '../../Layout/ScreenLayout/FlatListScreenLayout';
import {AppText} from '../../Components/Elements/AppText';
import {Divider} from 'react-native-paper';
import {Spacer} from '../../Components/Elements/Spacer';
import {resetGenericPassword} from 'react-native-keychain';

interface AddItemScreenProps {}

export const AddItemScreen: React.FC<AddItemScreenProps> = ({}) => {
  const {colors, fonts} = useTheme();

  const [
    createNewItemFn,
    {data: mutateData, loading: mutateLoading, error: mutateError},
  ] = useMutation(createNewProduct);
  const dispatch = useAppDispatch();
  const shopID = useAppSelector(state => state.user.shopData?.shopId);

  console.log('DATA,', mutateData, mutateLoading, mutateError);

  // SHopIDDD
  console.log('SHopID', shopID);

  const handleCreateItemSubmit = async (
    data: CreateProductInputViewModelInput,
  ) => {
    console.log('Pressed', data, shopID);
    dispatch(showLoader());

    if (data && shopID)
      try {
        let response = await createNewItemFn({
          variables: {
            name: data.name ? data.name : NotMentioned,
            shopId: shopID,
            price: Number(data.price ? data.price : NotMentioned),
            description: data.description ? data.description : NotMentioned,
            unit: data.unit ? data.unit : NotMentioned,
            stockQuantity: Number(data.stockQuantity),
            imageUrls: [ImageNotFound],
            location: data.location ? data.location : NotMentioned,
            categoryId: '1',
          },
        });

        if (response.data) {
          showMessage(
            responseTheme(
              SuccessAddItemMessage,
              SuccessAddItemMessageDescription,
              'success',
            ),
          );
        }
        if (response.errors) {
          dispatch(hideLoader());
          showMessage({
            message: `${response.errors[0].message}`,
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
      } catch (e) {
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

  return (
    <FlatListScreen
      contentContainerStyle={{
        paddingHorizontal: size.spacing.xs,
        paddingBottom: size.spacing.s,
      }}
      ListHeaderComponent={<ImageUploader></ImageUploader>}
      data={[1]}
      stickyHeaderHiddenOnScroll
      renderItem={() => (
        <View style={styles.wrapperStyle}>
          <Spacer height={14}></Spacer>
          <AppText
            title="Item Detail:"
            fontSizeVariant="title"
            fontVariant="medium"></AppText>

          <Spacer height={14}></Spacer>
          <AppForm<CreateProductInputViewModelInput>
            formConfig={[
              {
                name: 'name', // Must match a key in LoginFormValues
                label: '',
                placeholder: 'Item Name',
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
                defaultValue: {},
              },
              {
                name: 'price', // Must match a key in LoginFormValues
                label: '',
                placeholder: 'Price in rupees',
                type: 'number', // Custom prop for keyboard type
                rules: {
                  maxLength: {
                    value: 20,
                    message: 'too long',
                  },
                  required: 'Required',
                },
              },
              {
                name: 'stockQuantity', // Must match a key in LoginFormValues
                label: '',
                placeholder: 'Quantity',
                type: 'number', // Custom prop for keyboard type
                rules: {
                  maxLength: {
                    value: 9,
                    message: 'too long',
                  },
                  required: 'Required',
                },
              },

              {
                name: 'unit', // Must match a key in LoginFormValues
                label: '',
                placeholder: 'Unit | Eg: Kg, gram ',
                type: 'text', // Custom prop for keyboard type
                rules: {
                  maxLength: {
                    value: 9,
                    message: 'too long',
                  },
                  required: 'Required',
                },
              },
              {
                name: 'location', // Must match a key in LoginFormValues
                label: '',
                placeholder: 'Baneswor, Kathmandu',
                type: 'text', // Custom prop for keyboard type
                rules: {
                  maxLength: {
                    value: 9,
                    message: 'too long',
                  },
                  required: 'Required',
                },
              },
              {
                name: 'description', // Must match a key in LoginFormValues
                label: '',
                placeholder: 'About Item',
                type: 'description', // Custom prop for keyboard type
                rules: {
                  maxLength: {
                    value: 20,
                    message: 'too long',
                  },
                  required: 'Required',
                },
              },
            ]}
            submitButtonText="Submit"
            onFormSubmit={handleCreateItemSubmit}></AppForm>
        </View>
      )}></FlatListScreen>
  );
};

const styles = StyleSheet.create({
  wrapperStyle: {
    borderWidth: size.borderWidth.s,
    borderStyle: 'dashed',
    borderColor: '#D1DBE8',
    marginVertical: size.spacing.s,
    padding: size.spacing.xxs,
    borderRadius: size.borderRadius.m,
    paddingBottom: size.spacing.m,
    flex: 1,
    flexDirection: 'column',
  },
});
