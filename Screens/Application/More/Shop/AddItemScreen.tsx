import {useMutation, useQuery} from '@apollo/client';
import Geolocation from '@react-native-community/geolocation';
import {useTheme} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Icon, TouchableRipple} from 'react-native-paper';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import AppButton from '../../../../Components/Elements/Button';
import {Input} from '../../../../Components/Elements/Input';
import {TextComponet} from '../../../../Components/Elements/TextComponet';
import {AppForm} from '../../../../Components/Layout/AppForm';
import {ImageUploader} from '../../../../Components/Layout/ImageUploader';
import {addItems} from '../../../../GraphQL/Mutation/ItemMutation';
import {getPublicItems} from '../../../../GraphQL/Queries/ItemQueries';
import {SamagraScaller} from '../../../../Utilities/CustomMethods';
import ImageHandler from '../../../../Utilities/ImageHandler';
import {Item, ItemInputDto} from '../../../../src/__generated__/graphql';

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

  // Testing Function , will be handle sepratedly for efficiendy in future
  const handleGoToHomeDetailScreen = () => {
    // navigation.navigate('HomeDetailScreen');
  };

  // useEffect(() => {
  //   const config: any = {
  //     skipPermissionRequests: false, // Set to true if you handle permissions elsewhere
  //     authorizationLevel: 'whenInUse', // iOS only: 'whenInUse' or 'always'
  //     locationProvider: 'fused', // Android only: 'auto', 'gps', 'network', or 'fused'
  //   };

  //   Geolocation.setRNConfiguration(config);

  //   let rrr = Geolocation.getCurrentPosition(info => console.log(info));

  //   // handleOpenCamera()
  // }, []);

  // if (!hasPermission) return useMutation<PermissionsPage />;

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
    addNewitem,
    {data: mutateData, loading: mutateLoading, error: mutateError},
  ] = useMutation(addItems);

  const handleLoginSubmit = async (data: any) => {
    console.log('Login Form Submitted!', data);
    try {
      let response = await addNewitem({
        variables: {
          name: 'toolkit',
          shopId: '146078e0-4bba-40db-8517-308a009bea3d',
          price: 700,
          description: 'saasto and rarmro',
          unit: 'pcs',
          stockQuantity: 200,
          imageUrls: [
            'https://m.media-amazon.com/images/I/8102HF0GGBL._AC_UF350,350_QL80_.jpg',
          ],
          location: 'Butwal',
          prefrenceItemName: 'electronics',
          isCondition: 'New',
          categoryId: '1',
          currency: 'npr',
        },
      });
    } catch (e) {
      console.log('Error >>>', e);
    }
  };

  {
    mutateError ?? console.log('Mutation Error::', mutateError);
  }

  return (
    <>
      <ImageUploader
        setFinalImage={setFinalImage}
        children={childrenCompoenet(
          index.indexNumber,
          index.title,
          index.description,
        )}></ImageUploader>

      <AppForm<ItemInputDto>
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
            name: 'currency', // Must match a key in LoginFormValues
            label: 'Currency',
            placeholder: 'Eg: Npr',
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
        onFormSubmit={handleLoginSubmit}></AppForm>
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
