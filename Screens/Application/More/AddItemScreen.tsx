import {useTheme} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import ImageHandler from '../../../Utilities/ImageHandler';
import Geolocation from '@react-native-community/geolocation';
import {ScrollView, Text} from 'react-native';
import {Button} from 'react-native-paper';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import {SamagraScaller} from '../../../Utilities/CustomMethods';
import AppButton from '../../../Components/Elements/Button';
import FastImage from '@d11/react-native-fast-image';

interface AddItemScreenProps {}

export const AddItemScreen: React.FC<AddItemScreenProps> = ({}) => {
  const {colors} = useTheme();
  const [image, setImages] = useState<Array<any>>([]);

  const testPicker = async () => {
    let rrr: any = await ImageHandler.selectFromGallery();
    console.log('RRRR', rrr);

    setImages(rrr);
  };

  // Testing Function , will be handle sepratedly for efficiendy in future
  const handleGoToHomeDetailScreen = () => {
    // navigation.navigate('HomeDetailScreen');
  };

  //   const {data, loading, error} = useQuery(getPublicItems);
  //   console.log('DATAAA', data);

  async function handleImageUploadFromCamera() {
    const image = await ImageHandler.selectFromGallery();
    //
  }

  async function handleOpenCamera() {
    const cameraOpenedImage = await ImageHandler.openCamera();
    if (cameraOpenedImage) {
      console.log('selected  image URL:', cameraOpenedImage);
    } else {
      console.error('Image upload failed.');
    }
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

  // const device = useCameraDevice('back');

  const device = useCameraDevice('back');
  console.log('Device ....', device);
  const {hasPermission} = useCameraPermission();
  console.log('Camera Permisssion,', hasPermission);

  const camera = useRef<Camera>(null);

  //   if (!hasPermission) return <PermissionsPage />;
  //   if (device == null) return <NoCameraDeviceError />;

  // This is the Testing Cmponent
  const test = () => {
    return (
      <ScrollView>
        {/* {device ? (
          <Camera
            ref={camera}
            style={{
              flex: 1,
              height: SamagraScaller({
                value: 800,
                scaleBy: 'height',
              }),
              borderRadius: 80,
              // marginHorizontal:100,
              borderWidth: 20,
              borderColor: 'black',
            }}
            device={device}
            isActive={true}
          />
        ) : null} */}
        <Button
          onPress={() => testPicker()}
          style={{
            // bottom: 50,
            backgroundColor: 'pink',
            height: 200,
          }}>
          Click
        </Button>
        {(image && image.length > 0) ?? (
          <FastImage
            style={{
              height: 100,
              width: 100,
            }}
            source={{
              uri: image[0].uri,
            }}></FastImage>
        )}

        {/* <Button
          icon="camera"
          mode="contained"
          onPress={() => handleImageUploadFromCamera()}
          style={{
            marginTop: 50,
            bottom: 200,
          }}>
          Upload Image from Gallery
        </Button>
        <Text>Hellow</Text> */}

        {/* <Text>Home Screen</Text>
        <Button
          style={{
            marginBottom: 50,
          }}
          icon="camera"
          mode="contained"
          onPress={handleGoToHomeDetailScreen}>
          Go to HomeDetail Screen
        </Button>
        <Button icon="camera" mode="contained">
          Logout
        </Button>
        <Button
          icon="camera"
          mode="contained"
          // onPress={}
          style={{
            marginTop: 50,
          }}>
          Public Data
        </Button>
        <Button
          icon="camera"
          mode="contained"
          // onPress={}
          style={{
            marginTop: 50,
          }}>
          Push Data
        </Button>

        <Button
          icon="camera"
          mode="contained"
          onPress={() => handleImageUploadFromCamera()}
          style={{
            marginTop: 50,
          }}>
          Upload Image from Gallery
        </Button>
        <Button
          icon="camera"
          mode="contained"
          onPress={() => handleOpenCamera()}
          style={{
            marginTop: 50,
          }}>
          Camera
        </Button> */}
      </ScrollView>
    );
  };

  return <>{test()}</>;
};
