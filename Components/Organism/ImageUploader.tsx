// This CompoenntComponent Have to Updaten

import FastImage from '@d11/react-native-fast-image';
import {useTheme} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Icon, TouchableRipple} from 'react-native-paper';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import {AreaMapper} from '../../Utilities/CustomMethods';
import ImageHandler, {OutPutImageType} from '../../Utilities/ImageHandler';
import AppButton from '../Elements/Button';
import {AppText} from '../Elements/AppText';
import {size} from '../../Prefrences/Prefrences';
import {AddItemMessage} from '../../Constants/UI/Messages';
interface ImageUploaderProps {
  children?: React.ReactNode;
  setFinalImage: React.Dispatch<React.SetStateAction<any>>;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  children,
  setFinalImage,
}) => {
  const {colors} = useTheme();
  const [cameraType, setCameraType] = useState<'front' | 'back'>('back');
  const devices = useCameraDevice(cameraType);
  const [images, setImages] = useState<Array<OutPutImageType | null>>([]);
  const [isCameraActive, setIsCameraActive] = useState(true);

  const camera: any | null = useRef<Camera>(null);

  // THis is the Image captured By Cameras
  const handleTakePhoto = async () => {
    const photo: any = await camera.current.takePhoto();

    if (photo) {
      const compressedImage = await ImageHandler.compressImage(photo);
      setImages([compressedImage]);
      setFinalImage([{uri: compressedImage}]);
      setIsCameraActive(false);
    }
  };

  // Galley Image Pickers
  const imageFromGallery = async () => {
    let GalleryImages: any = await ImageHandler.selectFromGallery();
    console.log('Gallery>>>', GalleryImages);
    setImages(GalleryImages);
    // setFinalImage(GalleryImages);
  };

  const handleImageRemove = (selectedImage: any) => {
    let crossedDAta = images.filter((e: any) => e.name !== selectedImage.name);
    setImages(crossedDAta);
  };

  return (
    <View
      style={{
        borderWidth: size.borderWidth.m,
        borderColor: '#D1DBE8',
        padding: size.spacing.xl,
        borderStyle: 'dashed',
        borderRadius: size.borderRadius.s,
        paddingTop: size.spacing.xxl,
      }}>
      {images.length > 0 ? (
        <></>
      ) : (
        <View
          style={{
            alignItems: 'center',
          }}>
          <AppText
            fontVariant="bold"
            fontSizeVariant="title"
            title="Add a photo"
            customStyle={{
              marginBottom: size.spacing.xs,
            }}></AppText>
          <AppText
            customStyle={{
              textAlign: 'center',
            }}
            title={AddItemMessage}></AppText>
          <AppButton
            onPress={imageFromGallery}
            rippleColor={colors.card}
            textColor="black"
            buttonColor="#E8EDF2"
            style={{
              borderRadius: size.borderRadius.m,
              marginTop: size.spacing.l,
            }}>
            Add Photo
          </AppButton>
        </View>
      )}
    </View>
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
  camera: {
    height: AreaMapper({
      value: 870,
      scaleBy: 'height',
    }),
  },

  imageListContainer: {
    marginHorizontal: AreaMapper({
      value: 8,
      scaleBy: 'width',
    }),
    marginVertical: AreaMapper({
      value: 8,
      scaleBy: 'width',
    }),
    borderRadius: AreaMapper({
      value: 8,
      scaleBy: 'average',
    }),
    padding: 5,
    borderWidth: 0.1,
  },

  image: {
    height: AreaMapper({
      value: 65,
      scaleBy: 'height',
    }),
    width: AreaMapper({
      value: 65,
      scaleBy: 'width',
    }),
    borderRadius: 12,
  },

  cameraIconTouchableRiple: {
    opacity: 0.8,
    borderRadius: 45,
    height: AreaMapper({
      value: 50,
      scaleBy: 'height',
    }),
    zIndex: 5,

    bottom: 2,
  },
  closeRipple: {
    backgroundColor: 'gray',
    opacity: 0.8,
    borderRadius: 45,
    padding: AreaMapper({
      value: 1,
      scaleBy: 'average',
    }),
    height: 20,

    zIndex: 5,
    right: 20,
    bottom: 2,
  },
});
