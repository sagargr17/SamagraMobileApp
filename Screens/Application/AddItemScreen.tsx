import {useMutation, useQuery} from '@apollo/client';
import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {Icon, ProgressBar, TouchableRipple} from 'react-native-paper';
import {TextComponet} from '../../Components/Elements/TextComponet';
import {AppForm} from '../../Components/Organism/AppForm';
import {ImageUploader} from '../../Components/Organism/ImageUploader';
import {createNewProduct} from '../../GraphQL/Mutation/ItemMutation';
import {AreaMapper} from '../../Utilities/CustomMethods';
import {CreateProductInputViewModelInput} from '../../src/__generated__/graphql';
import {useAppDispatch} from '../../StateManagement/hooks';
import {hideLoader} from '../../StateManagement/Error&loadingHandle/LoaderStateSlice';
import {NotMentioned} from '../../Constants/UI/Messages';
import {ImageNotFound} from '../../Constants/UI/AssetsUrls';

interface AddItemScreenProps {}

export const AddItemScreen: React.FC<AddItemScreenProps> = ({}) => {
  const {colors, fonts} = useTheme();
  const [image, setImages] = useState<Array<any>>([]);
  const [index, setIndnex] = useState<{
    indexNumber: number;
    title: string;
    description: string;
  }>({
    indexNumber: 1,
    title: 'Primary Detail',
    description: 'Product Name, Price & More',
  });

  const childrenCompoenet = (
    indexNumber: number,
    title: string,
    descriptionn: string,
  ) => (
    <>
      <View
        style={{
          paddingHorizontal: 15,
          paddingVertical: 16,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          backgroundColor:
            index.indexNumber === 1 ? 'rgba(0, 0, 128, 0.87)' : colors.primary,
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableRipple
            onPress={() => {
              setIndnex({
                indexNumber: 1,
                title: 'Primary Detail',
                description: 'Product Name, Price ,Location & More',
              });
            }}
            style={{
              marginRight: 8,
            }}>
            <Icon size={24} color="white" source={'arrow-left'}></Icon>
          </TouchableRipple>
          <TextComponet
            title={`${indexNumber}`}
            fontVariant="medium"
            fontSizeVariant={'regular'}
            customStyle={{
              backgroundColor:
                index.indexNumber === 1
                  ? 'rgba(136, 129, 240, 0.87)'
                  : 'rgba(139, 233, 155, 0.87)',
              paddingHorizontal: 12,
              borderRadius: 45,
              color: 'white',
            }}></TextComponet>
        </View>

        <View>
          <TextComponet
            title={title}
            fontVariant="medium"
            customStyle={{
              color: 'white',
              marginLeft: 10,
            }}
            fontSizeVariant={'regular'}></TextComponet>

          <TextComponet
            title={descriptionn}
            fontVariant="medium"
            fontSizeVariant={'regular'}
            customStyle={{
              marginHorizontal: AreaMapper({
                value: 8,
                scaleBy: 'width',
              }),
              marginLeft: 10,
              color: 'white',
            }}></TextComponet>
        </View>
      </View>
    </>
  );

  const [finalImage, setFinalImage] = useState<any>();
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

  return (
    <>
      <ImageUploader
        setFinalImage={setFinalImage}
        children={
          <>
            {mutateLoading === true ? (
              <ProgressBar color={colors.primary} indeterminate></ProgressBar>
            ) : null}
            {childrenCompoenet(
              index.indexNumber,
              index.title,
              index.description,
            )}
          </>
        }></ImageUploader>

      <AppForm<CreateProductInputViewModelInput>
        formConfig={[
          {
            name: 'name', // Must match a key in LoginFormValues
            label: 'Name',
            placeholder: 'Name',
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
            label: 'Price',
            placeholder: 'Price',
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
            name: 'description', // Must match a key in LoginFormValues
            label: 'About Item',
            placeholder: 'About Item',
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
            name: 'stockQuantity', // Must match a key in LoginFormValues
            label: 'Quantity',
            placeholder: 'Eg: 230',
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
            label: 'Unit',
            placeholder: 'Eg: Kg, Hour',
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
            label: 'Location',
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
        ]}
        submitButtonText="Submit"
        onFormSubmit={handleCreateItemSubmit}></AppForm>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    // bottom: ,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
  },
});
