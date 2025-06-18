import * as MultipleImagePicker from '@baronha/react-native-multiple-image-picker';
import {Alert, Platform} from 'react-native';
import {Image} from 'react-native-compressor';

export interface OutPutImageType {
  uri: string;
  type: string;
  name: string;
}

class ImageHandler {
  // Validates the image
  private static validateImage(
    fileSize: number | undefined,
    fileType: string | undefined,
  ): boolean {
    const maxSize = 5 * 1024 * 1024; // 5MB max
    const allowedTypes = ['image/jpeg', 'image/png'];

    if (!fileSize || fileSize > maxSize) {
      console.warn('Image size exceeds 5MB limit.');
      return false;
    }
    if (!fileType || !allowedTypes.includes(fileType)) {
      console.warn('Invalid file type. Only JPG and PNG are allowed.');
      return false;
    }
    return true;
  }

  // Compress The Image
  public static async compressImage(image: {
    isMirrored: boolean;
    path: string;
    isRawPhoto: false;
    height: number;
    orientation: string;
    width: number;
  }): Promise<OutPutImageType | null> {
    console.log('Compressed', image);
    try {
      const result: string = await Image.compress(image.path, {
        quality: 0.8,
      });
      if (result) {
        console.log('Sinngle Compressing Image Success::', result);

        return {
          uri: result,
          type: 'image/jpeg',
          name: `gallery_image_${Date.now()}`,
        };
      }

      return null;
    } catch (error) {
      console.error('Single Compression error:', error);
      return null;
    }
  }

  public static async multipleImageCompressing(images: any) {
    const compressionPromises = images.map(async (image: any) => {
      const compressedUri = await this.compressImage(image.path);
      if (compressedUri) {
        return {
          uri: compressedUri,
          type: image.mime,
          name:
            image.fileName ||
            `gallery_image_${Date.now()}.${image.mime.split('/')[1]}`,
        };
      }
      return null;
    });

    const compressedImageCollection = (
      await Promise.all(compressionPromises)
    ).filter(item => item !== null) as any[];

    console.log('compressed final image', compressedImageCollection);

    
    return compressedImageCollection;
  }

  // Select From Gallery
  public static async selectFromGallery(
    multiple: boolean = true,
    maxSelected: number = 10,
  ): Promise<
    | {uri: string; type: string; name: string}
    | {uri: string; type: string; name: string}[]
    | null
  > {
    try {
      const images = await MultipleImagePicker.openPicker({
        mediaType: 'image',
        isPreview: true,
        isCamera: false,
        isMultiple: multiple,
        maxSelectedAssets: maxSelected,
        usedCameraButton: false,
        allowedImageTypes: ['image/jpeg', 'image/png'],
      });

      if (images) {
        let result = await this.multipleImageCompressing(images);
        console.log('Multiple iamged from compressing function..', result);

        if (result) {
          return result;
        }
      }

      return null;
    } catch (error: any) {
      console.error('Image picker error:', error.message);
      Alert.alert('Image Picker Error', error.message, [{text: 'OK'}]);
      return null;
    }
  }

  // Uploading Image
  public static async uploadImage(
    images: {
      uri: string;
      type: string;
      name: string;
    }[],
  ): Promise<string | null> {
    const serverUrl = 'http://static.samagranepalcom/'; // Change this to your server endpoint

    const formData: any = new FormData();
    images.map(image => {
      formData.append('file', {
        uri:
          Platform.OS === 'ios' ? image.uri.replace('file://', '') : image.uri,
        type: image.type,
        name: image.name,
      });
    });

    try {
      const response = await fetch(serverUrl, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const json = await response.json();
      if (response.ok && json.url) {
        return json.url;
      } else {
        console.error('Upload failed:', json);
        return null;
      }
    } catch (error) {
      console.error('Upload error:', error);
      return null;
    }
  }
}

export default ImageHandler;
