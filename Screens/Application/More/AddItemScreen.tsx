import Geolocation from '@react-native-community/geolocation';
import { useTheme } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Icon, TouchableRipple } from 'react-native-paper';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import { Logos } from '../../../Assets/SVG/Exports/Exports';
import AppButton from '../../../Components/Elements/Button';
import { Input } from '../../../Components/Elements/Input';
import { TextComponet } from '../../../Components/Elements/TextComponet';
import { ImageUploader } from '../../../Components/Layout/ImageUploader';
import { SamagraScaller } from '../../../Utilities/CustomMethods';
import ImageHandler from '../../../Utilities/ImageHandler';

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

  const {AddItem} = Logos;

  // Testing Function , will be handle sepratedly for efficiendy in future
  const handleGoToHomeDetailScreen = () => {
    // navigation.navigate('HomeDetailScreen');
  };

 
  async function handleImageUploadFromCamera() {
    const image = await ImageHandler.selectFromGallery();
    //
  }

  useEffect(() => {
    const config: any = {
      skipPermissionRequests: false, // Set to true if you handle permissions elsewhere
      authorizationLevel: 'whenInUse', // iOS only: 'whenInUse' or 'always'
      locationProvider: 'fused', // Android only: 'auto', 'gps', 'network', or 'fused'
    };

    Geolocation.setRNConfiguration(config);

    let rrr = Geolocation.getCurrentPosition(info => console.log(info));

    // handleOpenCamera();
  }, []);

  const devices = useCameraDevice('back');
  const {hasPermission} = useCameraPermission();
  const camera: any | null = useRef<Camera>(null);

  // if (!hasPermission) return <PermissionsPage />;

  const [isCameraActive, setIsCameraActive] = useState(true);

  if (!devices) {
    return <Text>No camera available</Text>;
  }

  // THis is the Image captured By Cameras
  const handleTakePhoto = async () => {
    const photo: any = await camera.current.takePhoto();
    if (photo) {
      const compressedImage = await ImageHandler.compressImage(photo.path);
      console.log('Camera:Final Compressed  Image', compressedImage);
      setImages([{uri: compressedImage}]);

      setIsCameraActive(false);
    }
  };

  const basicDetailsForm = () => (
    <>
      <ScrollView>
        <View
          style={{
            padding: SamagraScaller({
              value: 16,
              scaleBy: 'average',
            }),
          }}>
          <View>
            <Input
              height={12}
              maxLength={15}
              style={{
                borderWidth: 0.1,
                marginTop: 6,
              }}
              label="Name"></Input>
          </View>
          <View
            style={{
              marginTop: 8,
            }}>
            <Input
              multiline={true}
              maxLength={15}
              style={{
                borderWidth: 0.1,
                marginTop: 6,
              }}
              label="Description"></Input>
          </View>
          <View
            style={{
              marginTop: 8,
            }}>
            <Input
              maxLength={15}
              style={{
                borderWidth: 0.1,
                marginTop: 6,
              }}
              label="Address"></Input>
          </View>
          <View
            style={{
              marginTop: 8,
            }}>
            <Input
              keyboardType="numeric"
              maxLength={15}
              style={{
                borderWidth: 0.1,
                marginTop: 6,
              }}
              label="Price"></Input>
          </View>
        </View>
      </ScrollView>
      <AppButton
        onPress={() =>
          setIndnex({
            indexNumber: 2,
            title: 'Secondary Detail',
            description: 'Stock, Delivery Time, Comments.',
          })
        }
        style={{
          width: 100,
          left: 20,
          bottom: 20,
          borderRadius: 12,
          backgroundColor: 'rgba(0, 0, 128, 0.87)',
        }}>
        <Text>{index.indexNumber === 1 ? 'Next' : 'Save'}</Text>
      </AppButton>
    </>
  );

  const productDetailsForm = () => (
    <>
      <ScrollView>
        <View
          style={{
            padding: SamagraScaller({
              value: 16,
              scaleBy: 'average',
            }),
          }}>
          <View>
            <Input
              height={12}
              maxLength={15}
              style={{
                borderWidth: 0.1,
                marginTop: 6,
              }}
              label="Stock"></Input>
          </View>
          <View
            style={{
              marginTop: 8,
            }}>
            <Input
              multiline={true}
              maxLength={15}
              style={{
                borderWidth: 0.1,
                marginTop: 6,
              }}
              label="Delivery Time"></Input>
          </View>
          <View
            style={{
              marginTop: 8,
            }}>
            <Input
              maxLength={15}
              style={{
                borderWidth: 0.1,
                marginTop: 6,
              }}
              label="Comment"></Input>
          </View>
        </View>
      </ScrollView>
      <AppButton
        onPress={() =>
          setIndnex({
            indexNumber: 2,
            title: 'Secondary Detail',
            description: 'Stock, Delivery Time, Comments.',
          })
        }
        style={{
          borderRadius: 12,
        }}>
        <Text>{index.indexNumber === 1 ? 'Next' : 'Save'}</Text>
      </AppButton>
    </>
  );

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
            title={`${index.indexNumber}`}
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
            title={index.title}
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

  return (
    <>
      <ImageUploader
        children={childrenCompoenet(
          index.indexNumber,
          index.title,
          index.description,
        )}></ImageUploader>
      {index.indexNumber === 1 ? basicDetailsForm() : productDetailsForm()}
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
