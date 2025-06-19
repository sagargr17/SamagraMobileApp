import {useMutation} from '@apollo/client';
import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {AppForm} from '../../Components/Organism/AppForm';
import {ImageUploader} from '../../Components/Organism/ImageUploader';
import {ImageNotFound} from '../../Constants/UI/AssetsUrls';
import {NotMentioned} from '../../Constants/UI/Messages';
import {createNewProduct} from '../../GraphQL/Mutation/ItemMutation';
import {size} from '../../Prefrences/Prefrences';
import {CreateProductInputViewModelInput} from '../../src/__generated__/graphql';
import {hideLoader} from '../../StateManagement/Error&loadingHandle/LoaderStateSlice';
import {useAppDispatch} from '../../StateManagement/hooks';
import {AreaMapper} from '../../Utilities/CustomMethods';
import {FlatListScreen} from '../../Layout/ScreenLayout/FlatListScreenLayout';
import {AppText} from '../../Components/Elements/AppText';
import {Divider} from 'react-native-paper';
import {Spacer} from '../../Components/Elements/Spacer';

interface AddItemScreenProps {}

export const AddItemScreen: React.FC<AddItemScreenProps> = ({}) => {
  const {colors, fonts} = useTheme();

  const [
    createNewItemFn,
    {data: mutateData, loading: mutateLoading, error: mutateError},
  ] = useMutation(createNewProduct);
  const dispatch = useAppDispatch();

  const handleCreateItemSubmit = async (
    data: CreateProductInputViewModelInput,
  ) => {
    if (data)
      try {
        let response = await createNewItemFn({
          variables: {
            name: data.name ? data.name : NotMentioned,
            shopId: '4f227bb5-c411-452f-b745-0678eb9c9580',
            price: Number(data.price ? data.price : NotMentioned),
            description: data.description ? data.description : NotMentioned,
            unit: data.unit ? data.unit : NotMentioned,
            stockQuantity: Number(data.stockQuantity),
            imageUrls: ImageNotFound,
            location: data.location ? data.location : NotMentioned,
            categoryId: '1',
          },
        });

        console.log('Response Error', response);

        if (response.data) {
          dispatch(hideLoader());

          showMessage({
            message: 'Item Added Successfully',
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

  const Form = ()=>{
    
  }


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
    marginVertical:size.spacing.s,
    padding:size.spacing.xxs,
    borderRadius:size.borderRadius.m,
    paddingBottom:size.spacing.m
  },
});
