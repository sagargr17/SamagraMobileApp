import {useTheme} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import ImageHandler from '../../../Utilities/ImageHandler';
import Geolocation from '@react-native-community/geolocation';
import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {Button, Icon, TouchableRipple} from 'react-native-paper';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import {SamagraScaller} from '../../../Utilities/CustomMethods';
import AppButton from '../../../Components/Elements/Button';
import FastImage from '@d11/react-native-fast-image';
import PhoneInput from '../../../Components/Elements/PhoneInput';

interface AddItemScreenProps {}

export const AddItemScreen: React.FC<AddItemScreenProps> = ({}) => {
  const {colors} = useTheme();
  const [image, setImages] = useState<Array<any>>([]);

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

  const devices = useCameraDevice('back');

  const {hasPermission} = useCameraPermission();

  const camera: any | null = useRef<Camera>(null);

  // if (!hasPermission) return <PermissionsPage />;

  const [isCameraActive, setIsCameraActive] = useState(true);

  useEffect(() => {
    // Optional: Request camera permission on component mount
    Camera.requestCameraPermission().then(permission => {
      if (permission !== 'granted') {
        console.warn('Camera permission not granted!');
      }
    });
  }, []);

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

  // Galley Image Pickers
  const testPicker = async () => {
    let rrr: any = await ImageHandler.selectFromGallery();
    console.log('Gallery:Multiple Image', rrr);
    setImages([{uri: rrr}]);
    setIsCameraActive(false);
  };

  const handleGoBack = () => {};

  if (!devices) {
    return <Text>No camera available</Text>;
  }

  // This is the Testing Cmponent
  const test = () => {
    return (
      <ScrollView>
        <StatusBar animated={true} backgroundColor="black" />
        {devices ? (
          <>
            <View style={styles.container}>
              {isCameraActive ? (
                <View
                  style={{
                    borderColor: colors.primary,
                    borderRadius: 12,
                  }}>
                  <Camera
                    zoom={2}
                    preview={true}
                    onPreviewStarted={() => console.log('Preview started!')}
                    onPreviewStopped={() => console.log('Preview stopped!')}
                    photo={true}
                    ref={camera}
                    style={{
                      height: SamagraScaller({
                        value: 875,
                        scaleBy: 'height',
                      }),
                      flex: 1,
                    }}
                    device={devices}
                    isActive={isCameraActive} // Ensure isActive is bound to the state
                  />
                </View>
              ) : (
                <>
                  <TouchableRipple
                    onPress={() => testPicker()}
                    style={{
                      // right: 20,
                      backgroundColor: 'gray',
                      opacity: 0.8,
                      borderRadius: 45,
                      padding: SamagraScaller({
                        value: 15,
                        scaleBy: 'average',
                      }),
                      top: 3,
                    }}>
                    <Icon size={30} source={'file-image'} color="white"></Icon>
                  </TouchableRipple>
                  <FastImage
                    style={{
                      height: SamagraScaller({
                        value: 875,
                        scaleBy: 'height',
                      }),
                      width: '100%',
                    }}
                    source={{
                      uri: image[0].uri,
                      // uri: image[0].uri,
                      // uri: 'file://data/user/0/com.samagraapp/cache/mrousavy6063523767819267427.jpg',
                    }}
                    resizeMode="contain"></FastImage>
                </>
              )}

              <View
                style={{
                  bottom: SamagraScaller({
                    value: 150,
                    scaleBy: 'height',
                  }),
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                {isCameraActive && (
                  <View style={styles.buttonContainer}>
                    <AppButton
                      onPress={handleTakePhoto}
                      style={{
                        padding: SamagraScaller({
                          value: 10,
                          scaleBy: 'average',
                        }),
                        // bottom
                      }}>
                      <Icon size={32} source={'camera'} color="white"></Icon>
                    </AppButton>
                    <TouchableRipple
                      onPress={() => testPicker()}
                      style={{
                        left: 20,
                        backgroundColor: 'gray',
                        borderRadius: 45,
                        padding: SamagraScaller({
                          value: 15,
                          scaleBy: 'average',
                        }),
                      }}>
                      <Icon
                        size={30}
                        source={'file-image'}
                        color="white"></Icon>
                    </TouchableRipple>
                  </View>
                )}
              </View>
            </View>
          </>
        ) : null}
      </ScrollView>
    );
  };

  return <>{test()}</>;
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
