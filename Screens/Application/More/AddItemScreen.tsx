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
  console.log('Device ....', devices);
  const {hasPermission} = useCameraPermission();
  console.log('Camera Permisssion,', hasPermission);

  const camera = useRef<Camera>(null);

  //   if (!hasPermission) return <PermissionsPage />;
  //   if (device == null) return <NoCameraDeviceError />;

  const [isCameraActive, setIsCameraActive] = useState(true);
  // const camera = useRef<Camera>(null);
  // const devices = useCameraDevices();
  // const device = devices.back; // Or another preferred camera

  useEffect(() => {
    // Optional: Request camera permission on component mount
    Camera.requestCameraPermission().then(permission => {
      if (permission !== 'granted') {
        console.warn('Camera permission not granted!');
      }
    });
  }, []);

  const handleTakePhoto = async () => {
    if (camera.current && devices) {
      // try {
      //   const photo = await camera.current.takePhoto();
      //   console.log('Photo taken:', photo.path);
      //   // Process the photo here (e.g., display it, save it)
      //   // Stop the camera by setting isCameraActive to false
      //   setIsCameraActive(false);
      // } catch (error) {
      //   console.error('Failed to take photo!', error);
      // }
    }
  };

  const handleGoBack = () => {
    // You might want to navigate back or perform other actions
    console.log('Going back');
    // Optionally reactivate the camera if needed later
    setIsCameraActive(true);
  };

  if (!devices) {
    return <Text>No camera available</Text>;
  }

  // This is the Testing Cmponent
  const test = () => {
    return (
      <ScrollView>
        <StatusBar
          animated={true}
          backgroundColor="black"
          // barStyle={statusBarStyle}
          // showHideTransition={statusBarTransition}
          // hidden={hidden}
        />
        {devices ? (
          <>
            {/* <Camera
              ref={camera}
              style={{
                flex: 1,
                height: SamagraScaller({
                  value: 700,
                  scaleBy: 'height',
                }),
                borderRadius: 80,
                // marginHorizontal:100,
                borderWidth: 20,
                borderColor: 'black',
              }}
              device={device}
              isActive={true}
              photo={true}
            />
            <AppButton
              onPress={async (camera: any) => {
                const photo: any = await camera.current.takePhoto();
                console.log('Clicked image ', photo);
              }}
              style={{
                bottom: 200,
              }}>
              Click{' '}
            </AppButton> */}

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
                <View style={styles.previewContainer}>
                  <Text>Photo Taken!</Text>
                  {/* <Button  title="Go Back" onPress={handleGoBack} /> */}
                  <AppButton onPress={handleGoBack}>Go BAck</AppButton>
                  {/* You could display the taken photo here using an <Image> component */}
                </View>
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
                  </View>
                )}

                <TouchableRipple
                  onPress={() => ImageHandler.selectFromGallery()}
                  style={{
                    left: 20,
                    backgroundColor: 'gray',
                    borderRadius: 45,
                    padding: SamagraScaller({
                      value: 15,
                      scaleBy: 'average',
                    }),
                  }}>
                  <Icon size={30} source={'file-image'} color="white"></Icon>
                </TouchableRipple>
              </View>
            </View>
          </>
        ) : null}

        {(image && image.length > 0) ?? (
          <FastImage
            style={{
              height: 100,
              width: 100,
            }}
            source={
              {
                // uri: image[0].uri,
                // uri: 'file://data/user/0/com.samagraapp/cache/mrousavy6063523767819267427.jpg',
              }
            }></FastImage>
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
    height: 200,
  },
});
