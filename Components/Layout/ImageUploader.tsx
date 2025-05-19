import FastImage from '@d11/react-native-fast-image';
import { useTheme } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Icon, TouchableRipple } from 'react-native-paper';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import { SamagraScaller } from '../../Utilities/CustomMethods';
import ImageHandler from '../../Utilities/ImageHandler';
import AppButton from '../Elements/Button';
import { TextComponet } from '../Elements/TextComponet';
interface ImageUploaderProps {
  children?: React.ReactNode;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({children}) => {
  const {colors} = useTheme();
  const [cameraType, setCameraType] = useState<'front' | 'back'>('back');
  const devices = useCameraDevice(cameraType);
  const [images, setImages] = useState<Array<any>>([]);
  const [isCameraActive, setIsCameraActive] = useState(true);

  const camera: any | null = useRef<Camera>(null);

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

  // useEffect(() => {
  //   Camera.requestCameraPermission().then(permission => {
  //     if (permission !== 'granted') {
  //       console.warn('Camera permission not granted!');
  //     }
  //   });
  // }, []);

  // Galley Image Pickers
  const imageFromGallery = async () => {
    let GalleryImages: any = await ImageHandler.selectFromGallery();

    console.log('Gallery:Multiple Image', GalleryImages);

    setImages(GalleryImages);
    // setImages([{uri: rrr}]);
    setIsCameraActive(false);
  };

  const handleImageRemove = (selectedImage: any) => {
    console.log('IMage,', images);
    let crossedDAta = images.filter((e: any) => e.name !== selectedImage.name);

    setImages(crossedDAta);
  };

  return (
    <>
      {devices ? (
        <>
          {!isCameraActive && children}
          <View>
            {isCameraActive && images.length < 1 ? (
              <TouchableRipple
                onPress={() =>
                  cameraType === 'back'
                    ? setCameraType('front')
                    : setCameraType('back')
                }
                style={{
                  borderColor: colors.primary,
                  borderRadius: 12,
                }}>
                <Camera
                  enableZoomGesture={true}
                  photo={true}
                  ref={camera}
                  style={{
                    height: SamagraScaller({
                      value: 870,
                      scaleBy: 'height',
                    }),
                    //   flex: 2,
                  }}
                  device={devices}
                  isActive={isCameraActive} // Ensure isActive is bound to the state
                />
              </TouchableRipple>
            ) : (
              <>
                <View
                  style={{
                    marginHorizontal: SamagraScaller({
                      value: 8,
                      scaleBy: 'width',
                    }),
                    marginVertical: SamagraScaller({
                      value: 8,
                      scaleBy: 'width',
                    }),
                    borderRadius: SamagraScaller({
                      value: 8,
                      scaleBy: 'average',
                    }),
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                    padding: 5,
                    borderWidth: 0.1,
                  }}>
                  <View
                    style={{
                      padding: 2,
                    }}>
                    <TextComponet
                      title={'Total Images Selected : ' + images.length}
                      fontVariant="medium"
                      lineHeight={20}></TextComponet>
                  </View>
                  <ScrollView
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    contentContainerStyle={{
                      padding: 5,
                      marginVertical: SamagraScaller({
                        value: 8,
                        scaleBy: 'height',
                      }),
                    }}>
                    {images.length > 0 ? (
                      images.map(image => (
                        <View
                          key={Math.random()}
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                          }}>
                          <FastImage
                            source={{
                              uri: image.uri,
                            }}
                            style={{
                              height: SamagraScaller({
                                value: 65,
                                scaleBy: 'height',
                              }),
                              width: SamagraScaller({
                                value: 65,
                                scaleBy: 'width',
                              }),
                              borderRadius: 12,
                            }}></FastImage>
                          <TouchableRipple
                            onPress={() => handleImageRemove(image)}
                            style={{
                              // top: 2,
                              backgroundColor: 'gray',
                              opacity: 0.8,
                              borderRadius: 45,
                              padding: SamagraScaller({
                                value: 1,
                                scaleBy: 'average',
                              }),
                              height: 20,
                              // position: 'absolute',
                              zIndex: 5,
                              right: 20,
                              bottom: 2,
                            }}>
                            <Icon
                              size={20}
                              source={'close-thick'}
                              color={colors.notification}></Icon>
                          </TouchableRipple>
                        </View>
                      ))
                    ) : (
                      <TouchableRipple
                        onPress={() => setIsCameraActive(!isCameraActive)}
                        style={{
                          // top: 2,
                          //   backgroundColor: 'gray',
                          opacity: 0.8,
                          borderRadius: 45,

                          height: SamagraScaller({
                            value: 50,
                            scaleBy: 'height',
                          }),
                          zIndex: 5,

                          bottom: 2,
                        }}>
                        <Icon
                          size={SamagraScaller({
                            value: 40,
                            scaleBy: 'average',
                          })}
                          source={'camera-plus'}
                          color={'gray'}></Icon>
                      </TouchableRipple>
                    )}
                  </ScrollView>
                </View>
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
                <>
                  <View style={styles.buttonContainer}>
                    <AppButton onPress={handleTakePhoto}>
                      <Icon size={32} source={'camera'} color="white"></Icon>
                    </AppButton>
                  </View>
                  <TouchableRipple
                    onPress={() => imageFromGallery()}
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
                </>
              )}
            </View>
          </View>
        </>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
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
