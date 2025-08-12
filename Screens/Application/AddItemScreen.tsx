import { useMutation } from '@apollo/client';
import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { AppTextElement } from '../../Components/Elements/AppTextElement';
import { SpacerElement } from '../../Components/Elements/SpacerElement';
import { AppFormOrganism } from '../../Components/Organism/ApplicationOverLays/AppFormOrganism';
import { ImageUploader } from '../../Components/Organism/ApplicationOverLays/ImageUploaderOrganism';
import {
  NotMentioned,
  SuccessAddItemMessage,
  SuccessAddItemMessageDescription,
} from '../../Constants/UI/Messages';
import { createNewProduct } from '../../GraphQL/Mutation/ItemMutation';
import { FlatListScreen } from '../../Layout/ScreenLayout/FlatListScreenLayout';
import { responseTheme, size } from '../../Prefrences/Prefrences';
import { CreateProductInputViewModelInput } from '../../src/__generated__/graphql';
import {
  hideLoader,
  showLoader,
} from '../../StateManagement/Error&loadingHandle/LoaderStateSlice';
import { useAppDispatch } from '../../StateManagement/hooks';
import { addItem } from '../../StateManagement/User/UserSlice';
import { AreaMapper } from '../../Utilities/CustomMethods';
import ImageHandler, { OutPutImageType } from '../../Utilities/ImageHandler';

interface AddItemScreenProps {}

export const AddItemScreen: React.FC<AddItemScreenProps> = ({}) => {
  const {fonts} = useTheme();
  const navigation = useNavigation<any>();

  const [createNewItemFn] = useMutation(createNewProduct);
  const dispatch = useAppDispatch();
  const [uploadingImage, setUploadingImage] = useState<any>();

  const handleCreateItemSubmit = async (
    data: CreateProductInputViewModelInput,
  ) => {
    dispatch(showLoader());
    if (uploadingImage) {
      let uploadImage = await ImageHandler.uploadImage(uploadingImage);

      console.log('ImageUploading', uploadImage);
      if (uploadImage) {
        if (data)
          try {
            console.log('Adding ITem', data);

            let response = await createNewItemFn({
              variables: {
                name: data.name ? data.name : NotMentioned,
                price: Number(data.price ? data.price : NotMentioned),
                description: data.description ? data.description : NotMentioned,
                unit: data.unit ? data.unit : NotMentioned,
                stockQuantity: Number('1'),
                imageUrls: uploadImage,
                location: data.location ? data.location : NotMentioned,
                categoryId: '1',
              },
            });

            if (response.data?.createProduct && data.name) {
              showMessage(
                responseTheme(
                  SuccessAddItemMessage,
                  SuccessAddItemMessageDescription,
                  'success',
                ),
              );

              dispatch(
                addItem({
                  item: {
                    name: data.name,
                    description: data.description ?? NotMentioned,
                    price: data.price,
                    category: '1',
                    imageUrl: uploadImage,
                  },
                }),
              );

              navigation.navigate('ItemAddedScreen');
            }
            // Responsne Image
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
              message: `${e}`,
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
      }
    } else {
      showMessage(
        responseTheme(
          'No Any Images!',
          'Please Upload Image for your Item',
          'danger',
        ),
      );
    }
  };

  const handleItem = (images: OutPutImageType) => {
    setUploadingImage(images);
  };

  return (
    <FlatListScreen
      contentContainerStyle={{
        paddingHorizontal: size.spacing.xs,
        paddingBottom: size.spacing.s,
      }}
      ListHeaderComponent={
        <ImageUploader
          addItemSuccessFn={images => {
            handleItem(images);
          }}></ImageUploader>
      }
      data={[1]}
      stickyHeaderHiddenOnScroll
      renderItem={() => (
        <View style={styles.wrapperStyle}>
          <SpacerElement height={14}></SpacerElement>
          <AppTextElement
            title="Service Detail:"
            fontSizeVariant="title"
            fontVariant="medium"></AppTextElement>

          <SpacerElement height={5}></SpacerElement>
          <AppFormOrganism<CreateProductInputViewModelInput>
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
                name: 'unit', // Must match a key in LoginFormValues
                label: '',
                placeholder: 'Hour, KG ',
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
            onFormSubmit={handleCreateItemSubmit}></AppFormOrganism>
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
