// This CompoenntComponent Have to Updaten

import FastImage from '@d11/react-native-fast-image';
import {useTheme} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator, IconButton} from 'react-native-paper';
import {Camera} from 'react-native-vision-camera';
import {AddItemMessage} from '../../Constants/UI/Messages';
import {size} from '../../Prefrences/Prefrences';
import {useAppSelector} from '../../StateManagement/hooks';
import {AreaMapper} from '../../Utilities/CustomMethods';
import ImageHandler, {OutPutImageType} from '../../Utilities/ImageHandler';
import {AppText} from '../Elements/AppText';
import AppButton from '../Elements/Button';
interface ImageUploaderProps {}

export const ImageUploader: React.FC<ImageUploaderProps> = ({}) => {
  const {colors} = useTheme();
  const [cameraType, setCameraType] = useState<'front' | 'back'>('back');
  const [images, setImages] = useState<Array<OutPutImageType | null>>([]);
  const [selectionImageIndex, setselectionImageIndex] = useState<number>(0);
  const [isCameraActive, setIsCameraActive] = useState(true);
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const userShopName = useAppSelector(state => state.user.shopData?.name);
  const camera: any | null = useRef<Camera>(null);

  // THis is the Image captured By Cameras
  const handleTakePhoto = async () => {
    const photo: any = await camera.current.takePhoto();

    if (photo) {
      const compressedImage = await ImageHandler.compressImage(photo);
      setImages([compressedImage]);
      setIsCameraActive(false);
    }
  };

  // Galley Image Pickers
  const imageFromGallery = async () => {
    let GalleryImages: any = await ImageHandler.selectFromGallery();
    setImages(GalleryImages);
    setImageLoading(!imageLoading);
  };

  const handleImageRemove = (selectedImage: any) => {
    console.log('Removing SelectImage', selectedImage);

    let crossedDAta = images.filter((e: any) => e.name !== selectedImage.name);
    setImages(crossedDAta);
    setselectionImageIndex(selectionImageIndex - 1);
    setImageLoading(false);
  };

  const incrementalImageIndex = (index: number, imageLength: number) => {
    if (index < imageLength - 1) setselectionImageIndex(index + 1);
  };
  const decrementImageIndex = (index: number) => {
    if (index > 0) setselectionImageIndex(index - 1);
    setImageLoading(false);
  };

  return (
    <View
      style={{
        borderWidth: size.borderWidth.m,
        borderColor: '#D1DBE8',
        padding: size.spacing.xl,
        borderStyle: 'dashed',
        borderRadius: size.borderRadius.s,
        paddingTop: size.spacing.xl,
      }}>
      {images.length > 0 ? (
        <>
          <IconButton
            onPress={() => decrementImageIndex(selectionImageIndex)}
            rippleColor={colors.background}
            style={styles.leftIconsButton}
            icon={'arrow-left-drop-circle'}></IconButton>
          <>
            <FastImage
              resizeMode="contain"
              style={{
                height: AreaMapper({
                  value: 170,
                  scaleBy: 'height',
                }),
                borderRadius: size.borderRadius.s,
              }}
              source={{
                uri: images[selectionImageIndex]?.uri,
              }}></FastImage>
            <IconButton
              onPress={() => {
                handleImageRemove(images[selectionImageIndex]);
              }}
              iconColor={'#FF6347'}
              style={styles.closeIcon}
              icon={'close-circle'}></IconButton>
          </>
          <IconButton
            onPress={() =>
              incrementalImageIndex(selectionImageIndex, images.length)
            }
            style={styles.rightIconsButton}
            icon={'arrow-right-drop-circle'}></IconButton>
        </>
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
            onPressIn={() => setImageLoading(!imageLoading)}
            onPress={imageFromGallery}
            rippleColor={colors.card}
            textColor="black"
            buttonColor="#E8EDF2"
            style={{
              borderRadius: size.borderRadius.m,
              marginTop: size.spacing.l,
            }}>
            {imageLoading ? (
              <ActivityIndicator
                size={'small'}
                color={colors.primary}></ActivityIndicator>
            ) : (
              'Add Photo'
            )}
          </AppButton>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  leftIconsButton: {
    position: 'absolute',
    bottom: 70,
    zIndex: 1,
  },
  rightIconsButton: {
    position: 'absolute',
    bottom: 70,
    zIndex: 1,
    right: 0,
  },
  closeIcon: {
    alignItems: 'center',
    position: 'absolute',
    right: 5,
  },
});
