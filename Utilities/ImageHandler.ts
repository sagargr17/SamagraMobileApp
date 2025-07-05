import * as MultipleImagePicker from '@baronha/react-native-multiple-image-picker';
import {Alert, Platform} from 'react-native';
import {Image} from 'react-native-compressor';
import {getTokens} from '../client/Token/TokenAccess';

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
  public static async compressImage(
    image: string,
  ): Promise<OutPutImageType | null> {
    try {
      const result: string = await Image.compress(image, {
        quality: 0.8,
      });

      // Result Image

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
    console.log('Compressing....', images);

    const compressionPromises = images.map(async (image: any) => {
      const compressedUri = await this.compressImage(image.path);
      if (compressedUri) {
        return {
          uri: compressedUri.uri,
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
  ): Promise<[string] | any> {
    const serverUrl = 'http://static.samagranepal.com/';

    const formData: any = new FormData();
    images.map(image => {
      formData.append('files', {
        uri:
          Platform.OS === 'ios' ? image.uri.replace('file://', '') : image.uri,
        type: image.type,
        name: image.name,
      });
    });

    try {
      console.log('Form DAta', formData);
      const response = await fetch(serverUrl, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Im15LWhhcmRjb2RlZC1rZXktaWQiLCJ0eXAiOiJhdCtqd3QifQ.eyJpc3MiOiJodHRwOi8vaWRlbnRpdHkuc2FtYWdyYW5lcGFsLmNvbSIsIm5iZiI6MTc1MTM3MjA3NiwiaWF0IjoxNzUxMzcyMDc2LCJleHAiOjE3NTM5NjQwNzYsImF1ZCI6Im1hcmtldHBsYWNlIiwic2NvcGUiOlsibWFya2V0cGxhY2UuYWNjZXNzIiwib3BlbmlkIiwicHJvZmlsZSIsIm9mZmxpbmVfYWNjZXNzIl0sImFtciI6WyJjdXN0b20iXSwiY2xpZW50X2lkIjoiI3NnYXJhcCoiLCJzdWIiOiI0ZTFlNzcyOC1kZWZhLTQxOTEtOGZkOS03MGRkNmZkMmNhZmMiLCJhdXRoX3RpbWUiOjE3NTEzNzIwNzYsImlkcCI6ImxvY2FsIiwibmFtZSI6InNhZ2FyICIsInByZWZlcnJlZF91c2VybmFtZSI6InNhZ2FyIiwianRpIjoiNkE5QjhDRDY1RDhGM0IyODhDMjQyNThFOTE0NzMwNkIifQ.KIYvROC83CvrLm0u3v-zUNCtIi1Y8-cmWald6qOC3aV--AQQLhLIg5sHoMlPL8yaXbZjeWzQjfLXG83RJeZLEwab86btL1q_Xgxh2CfkqTuRz03Px1tZfkljNi0bBKCd8dqDGOjgjDUINRk5taqs9KbcF4hFASxSm191T9WiSpg`,
        },
      });

      const json = await response.json();
      console.log('SErver Update Image', json);

      if (response.ok) {
        return json;
      }
    } catch (error) {
      console.error('Upload error:', error);
      return null;
    }
  }
}

export default ImageHandler;
