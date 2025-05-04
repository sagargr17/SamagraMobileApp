// import {Alert, Platform} from 'react-native';
// import {
//   CameraOptions,
//   ImageLibraryOptions,
//   launchCamera,
//   launchImageLibrary,
// } from 'react-native-image-picker';
// import {Image} from 'react-native-compressor';

// class ImageHandler {
//   private static validateImage(
//     fileSize: number | undefined,
//     fileType: string | undefined,
//   ): boolean {
//     const maxSize = 5 * 1024 * 1024; // 5MB max
//     const allowedTypes = ['image/jpeg', 'image/png'];

//     if (!fileSize || fileSize > maxSize) {
//       console.warn('Image size exceeds 5MB limit.');
//       return false;
//     }
//     if (!fileType || !allowedTypes.includes(fileType)) {
//       console.warn('Invalid file type. Only JPG and PNG are allowed.');
//       return false;
//     }
//     return true;
//   }

//   private static async compressImage(
//     uri: string,
//   ): Promise<string | ArrayBuffer | null> {
//     try {
//       console.log('Compressinggggg');
//       const result = await Image.compress(uri, {
//         quality: 0.8,
//       });

//       console.log('Compressed image', result);
//       return result;
//     } catch (error) {
//       console.error('Compression error:', error);
//       return null;
//     }
//   }

//   public static async openCamera(): Promise<{
//     uri: string;
//     type: string;
//     name: string;
//   } | null> {
//     return new Promise((resolve, reject) => {
//       const options: CameraOptions = {
//         mediaType: 'photo',
//         cameraType: 'back',
//         quality: 0.8,
//       };

//       launchCamera(options, async response => {
//         if (response.didCancel) {
//           console.warn('User cancelled camera');
//           resolve(null);
//         } else if (response.errorMessage) {
//           console.error('Camera error:', response.errorMessage);
//           reject(response.errorMessage);
//         } else if (response.assets && response.assets.length > 0) {
//           console.log('response good');
//           const asset = response.assets[0];
//           const {uri, type, fileName, fileSize} = asset;
//           console.log('FileDetails...', uri, fileSize);

//           if (uri) {
//             const compressedUri: any = await this.compressImage(uri);
//             console.log('compressedImage...', compressedUri);
//           } else {
//             resolve(null);
//           }
//         }
//       });
//     });
//   }

//   public static async selectFromGallery(): Promise<{
//     uri: string;
//     type: string;
//     name: string;
//   } | null> {
//     return new Promise((resolve, reject) => {
//       const options: ImageLibraryOptions = {
//         mediaType: 'photo',
//         // quality: 0.8,
//       };

//       launchImageLibrary(options, async response => {
//         if (response.didCancel) {
//           console.warn('User cancelled gallery selection');
//           resolve(null);
//         } else if (response.errorMessage) {
//           console.error('Gallery selection error:', response.errorMessage);
//           reject(response.errorMessage);
//         } else if (response.assets && response.assets.length > 0) {
//           const asset = response.assets[0];

//           const {uri, type, fileName, fileSize} = asset;

//           console.log('File Size', uri, fileSize, fileName);

//           if (uri) {
//             const compressedUri = await this.compressImage(uri);
//             console.log('Compressed images', compressedUri);
//           } else {
//             return 400;
//           }
//         }
//       });
//     });
//   }

//   public static async uploadImage(image: {
//     uri: string;
//     type: string;
//     name: string;
//   }): Promise<string | null> {
//     const serverUrl = 'https://yourserver.com/upload'; // Change this to your server endpoint

//     const formData: any = new FormData();
//     formData.append('file', {
//       uri: Platform.OS === 'ios' ? image.uri.replace('file://', '') : image.uri,
//       type: image.type,
//       name: image.name,
//     });

//     try {
//       const response = await fetch(serverUrl, {
//         method: 'POST',
//         body: formData,
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       const json = await response.json();
//       if (response.ok && json.url) {
//         return json.url;
//       } else {
//         console.error('Upload failed:', json);
//         return null;
//       }
//     } catch (error) {
//       console.error('Upload error:', error);
//       return null;
//     }
//   }
// }

// export default ImageHandler;

import {Alert, Platform} from 'react-native';
import {
  Camera,
  CameraDevice,
  useCameraDevices,
} from 'react-native-vision-camera';
import {Image} from 'react-native-compressor';
import * as MultipleImagePicker from '@baronha/react-native-multiple-image-picker';

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
    uri: string,
  ): Promise<string | ArrayBuffer | null> {
    try {
      console.log('Compressinggggg');
      const result = await Image.compress(uri, {
        quality: 0.8,
      });

      console.log('Processed Image', result);
      return result;
    } catch (error) {
      console.error('Compression error:', error);
      return null;
    }
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
      console.log('Selected Imagesssss', images);

      if (images && images.length > 0) {
        if (!multiple) {
          const image = images[0];
          const compressedUri = await this.compressImage(image.path);
          return compressedUri
            ? {
                uri: image.path, // Or use compressedUri
                type: image.mime,
                name:
                  image.fileName ||
                  `gallery_image_${Date.now()}.${image.mime.split('/')[1]}`,
              }
            : null;
        } else {
          const processedImages: {uri: string; type: string; name: string}[] =
            [];
          for (const image of images) {
            const compressedUri = await this.compressImage(image.path);
            if (compressedUri) {
              processedImages.push({
                uri: image.path, // Or use compressedUri
                type: image.mime,
                name:
                  image.fileName ||
                  `gallery_image_${Date.now()}.${image.mime.split('/')[1]}`,
              });
            }
          }
          return processedImages;
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
  public static async uploadImage(image: {
    uri: string;
    type: string;
    name: string;
  }): Promise<string | null> {
    const serverUrl = 'https://yourserver.com/upload'; // Change this to your server endpoint

    const formData: any = new FormData();
    formData.append('file', {
      uri: Platform.OS === 'ios' ? image.uri.replace('file://', '') : image.uri,
      type: image.type,
      name: image.name,
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
