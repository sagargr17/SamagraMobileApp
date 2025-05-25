import {useMutation, useQuery} from '@apollo/client';
import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {Icon, ProgressBar, TouchableRipple} from 'react-native-paper';
import {TextComponet} from '../../../../Components/Elements/TextComponet';
import {AppForm} from '../../../../Components/Layout/AppForm';
import {ImageUploader} from '../../../../Components/Layout/ImageUploader';
import {createNewProduct} from '../../../../GraphQL/Mutation/ItemMutation';
import {getPublicItems} from '../../../../GraphQL/Queries/ItemQueries';
import {SamagraScaller} from '../../../../Utilities/CustomMethods';
import {CreateProductRequestInput} from '../../../../src/__generated__/graphql';
import {SamagraAlert} from '../../../../Components/Sections/SamagraAlert';

interface AddItemScreenProps {}

export const AddItemScreen: React.FC<AddItemScreenProps> = ({}) => {
  const {colors} = useTheme();
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
            lineHeight={40}
            fontSize={25}
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
            lineHeight={20}
            customStyle={{
              color: 'white',
              marginLeft: 10,
            }}
            fontSize={25}></TextComponet>

          <TextComponet
            title={descriptionn}
            fontVariant="medium"
            fontSize={14}
            customStyle={{
              marginHorizontal: SamagraScaller({
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
  const {data, loading, error} = useQuery(getPublicItems);
  // const [
  //   addNewitem,
  //   {data: mutateData, loading: mutateLoading, error: mutateError},
  // ] = useMutation(addItems);
  const [
    createNewItemFn,
    {data: mutateData, loading: mutateLoading, error: mutateError},
  ] = useMutation(createNewProduct);

  // const authenti = GetAuthenticateClient;
  const handleCreateItemSubmit = async (data: CreateProductRequestInput) => {
    console.log('DAta', data.price, data);
    try {
      let response = await createNewItemFn({
        variables: {
          name: data.name,
          shopId: '4f227bb5-c411-452f-b745-0678eb9c9580',
          price: Number(data.price),
          description: data.description,
          unit: data.unit,
          stockQuantity: Number(data.stockQuantity),
          imageUrls: [
            'https://m.media-amazon.com/images/I/8102HF0GGBL._AC_UF350,350_QL80_.jpg',
          ],
          location: data.location,
          categoryId: '1',
        },
      });

      console.log('>>>', response);
    } catch (e) {
      console.log('LOGGg', e);
    }
  };

  return (
    <>
      {mutateLoading === true ? (
        <ProgressBar color={colors.primary} indeterminate></ProgressBar>
      ) : null}
      {mutateData ? (
        <SamagraAlert
          key={1}
          title="Completed"
          description="Item Added SuccessFully"
          icon="read"></SamagraAlert>
      ) : null}
      <ImageUploader
        setFinalImage={setFinalImage}
        children={childrenCompoenet(
          index.indexNumber,
          index.title,
          index.description,
        )}></ImageUploader>

      <AppForm<CreateProductRequestInput>
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
            placeholder: '23',
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
