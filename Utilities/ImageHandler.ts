// import {launchCamera, CameraOptions} from 'react-native-image-picker';
// import {Platform} from 'react-native';
// import FormData from 'form-data';
// // import {imageCompress} from 'image-resize-compress';

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

//       launchCamera(options, response => {
//         if (response.didCancel) {
//           console.warn('User cancelled camera');
//           resolve(null);
//         } else if (response.errorMessage) {
//           console.error('Camera error:', response.errorMessage);
//           reject(response.errorMessage);
//         } else if (response.assets && response.assets.length > 0) {
//           const asset = response.assets[0];
//           const {uri, type, fileName, fileSize} = asset;

//           if (this.validateImage(fileSize, type)) {
//             resolve({
//               uri: uri as string,
//               type: type as string,
//               name: fileName as string,
//             });
//           } else {
//             resolve(null);
//           }
//         }
//       });
//     });
//   }

//   // public static async compressImage(imageUri: string): Promise<string | null> {
//   //   try {
//   //     const compressedUri = await imageCompress(imageUri, {
//   //       maxWidth: 800,
//   //       maxHeight: 800,
//   //       quality: 70, // Compression quality (0-100)
//   //     });
//   //     return compressedUri;
//   //   } catch (error) {
//   //     console.error('Compression error:', error);
//   //     return null;
//   //   }
//   // }

//   public static async uploadImage(image: {
//     uri: string;
//     type: string;
//     name: string;
//   }): Promise<string | null> {
//     const serverUrl = 'https://yourserver.com/upload'; // Change this to your server endpoint

//     // const compressedUri = await this.compressImage(image.uri);
//     // if (!compressedUri) {
//     //   console.error('Image compression failed.');
//     //   return null;
//     // }
//     const compressedUri = image.uri;

//     const formData = new FormData();
//     formData.append('file', {
//       uri:
//         Platform.OS === 'ios'
//           ? compressedUri.replace('file://', '')
//           : compressedUri,
//       type: image.type,
//       name: image.name,
//     });

//     return null;
//     // These will be tested after
//     // try {
//     //   const response = await fetch(serverUrl, {
//     //     method: 'POST',
//     //     body: formData,
//     //     headers: {
//     //       'Content-Type': 'multipart/form-data',
//     //     },
//     //   });

//     //   const json = await response.json();
//     //   if (response.ok && json.url) {
//     //     return json.url;
//     //   } else {
//     //     console.error('Upload failed:', json);
//     //     return null;
//     //   }
//     // } catch (error) {
//     //   console.error('Upload error:', error);
//     //   return null;
//     // }
//   }
// }

// // // export default ImageHandler;
// // import { launchCamera, CameraOptions } from 'react-native-image-picker';
// // import { Platform } from 'react-native';
// // import FormData from 'form-data';

// // class ImageHandler {
// //   private static validateImage(fileSize: number | undefined, fileType: string | undefined): boolean {
// //     const maxSize = 5 * 1024 * 1024; // 5MB max
// //     const allowedTypes = ['image/jpeg', 'image/png'];

// //     if (!fileSize || fileSize > maxSize) {
// //       console.warn('Image size exceeds 5MB limit.');
// //       return false;
// //     }
// //     if (!fileType || !allowedTypes.includes(fileType)) {
// //       console.warn('Invalid file type. Only JPG and PNG are allowed.');
// //       return false;
// //     }
// //     return true;
// //   }

// //   public static async openCamera(): Promise<{ uri: string; type: string; name: string } | null> {
// //     return new Promise((resolve, reject) => {
// //       const options: CameraOptions = {
// //         mediaType: 'photo',
// //         cameraType: 'back',
// //         quality: 0.8,
// //       };

// //       launchCamera(options, response => {
// //         if (response.didCancel) {
// //           console.warn('User cancelled camera');
// //           resolve(null);
// //         } else if (response.errorMessage) {
// //           console.error('Camera error:', response.errorMessage);
// //           reject(response.errorMessage);
// //         } else if (response.assets && response.assets.length > 0) {
// //           const asset = response.assets[0];
// //           const { uri, type, fileName, fileSize } = asset;

// //           if (this.validateImage(fileSize, type)) {
// //             resolve({ uri: uri as string, type: type as string, name: fileName as string });
// //           } else {
// //             resolve(null);
// //           }
// //         }
// //       });
// //     });
// //   }

// //   public static async uploadImage(image: { uri: string; type: string; name: string }): Promise<string | null> {
// //     const serverUrl = 'https://yourserver.com/upload'; // Change this to your server endpoint

// //     const formData = new FormData();
// //     formData.append('file', {
// //       uri: Platform.OS === 'ios' ? image.uri.replace('file://', '') : image.uri,
// //       type: image.type,
// //       name: image.name,
// //     });

// //     try {
// //       const response = await fetch(serverUrl, {
// //         method: 'POST',
// //         body: formData,
// //         headers: {
// //           'Content-Type': 'multipart/form-data',
// //         },
// //       });

// //       const json = await response.json();
// //       if (response.ok && json.url) {
// //         return json.url;
// //       } else {
// //         console.error('Upload failed:', json);
// //         return null;
// //       }
// //     } catch (error) {
// //       console.error('Upload error:', error);
// //       return null;
// //     }
// //   }
// // }

// export default ImageHandler;
// import {
//   launchCamera,
//   launchImageLibrary,
//   CameraOptions,
//   ImageLibraryOptions,
// } from 'react-native-image-picker';
// import {Platform} from 'react-native';

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

//       launchCamera(options, response => {
//         if (response.didCancel) {
//           console.warn('User cancelled camera');
//           resolve(null);
//         } else if (response.errorMessage) {
//           console.error('Camera error:', response.errorMessage);
//           reject(response.errorMessage);
//         } else if (response.assets && response.assets.length > 0) {
//           const asset = response.assets[0];
//           const {uri, type, fileName, fileSize} = asset;

//           if (this.validateImage(fileSize, type)) {
//             resolve({
//               uri: uri as string,
//               type: type as string,
//               name: fileName as string,
//             });
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
//         quality: 0.8,
//       };

//       launchImageLibrary(options, response => {
//         if (response.didCancel) {
//           console.warn('User cancelled gallery selection');
//           resolve(null);
//         } else if (response.errorMessage) {
//           console.error('Gallery selection error:', response.errorMessage);
//           reject(response.errorMessage);
//         } else if (response.assets && response.assets.length > 0) {
//           const asset = response.assets[0];
//           const {uri, type, fileName, fileSize} = asset;

//           if (this.validateImage(fileSize, type)) {
//             resolve({
//               uri: uri as string,
//               type: type as string,
//               name: fileName as string,
//             });
//           } else {
//             resolve(null);
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

import {
  launchCamera,
  launchImageLibrary,
  CameraOptions,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import {Platform} from 'react-native';
import {fromBlob, blobToURL} from 'image-resize-compress';

class ImageHandler {
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

  private static async compressImage(
    uri: string,
  ): Promise<string | ArrayBuffer | null> {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const compressedBlob = await fromBlob(blob, 80, 'auto', 'auto', 'webp'); // 80% quality, webp format
      return await blobToURL(compressedBlob);
    } catch (error) {
      console.error('Compression error:', error);
      return null;
    }
  }

  public static async openCamera(): Promise<{
    uri: string;
    type: string;
    name: string;
  } | null> {
    return new Promise((resolve, reject) => {
      const options: CameraOptions = {
        mediaType: 'photo',
        cameraType: 'back',
        quality: 0.8,
      };

      launchCamera(options, async response => {
        if (response.didCancel) {
          console.warn('User cancelled camera');
          resolve(null);
        } else if (response.errorMessage) {
          console.error('Camera error:', response.errorMessage);
          reject(response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const asset = response.assets[0];
          const {uri, type, fileName, fileSize} = asset;

          if (this.validateImage(fileSize, type)) {
            const compressedUri: any = await this.compressImage(uri);
            resolve({
              uri: compressedUri || uri,
              type: type as string,
              name: fileName as string,
            });
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async selectFromGallery(): Promise<{
    uri: string;
    type: string;
    name: string;
  } | null> {
    return new Promise((resolve, reject) => {
      const options: ImageLibraryOptions = {
        mediaType: 'photo',
        quality: 0.8,
      };

      launchImageLibrary(options, async response => {
        if (response.didCancel) {
          console.warn('User cancelled gallery selection');
          resolve(null);
        } else if (response.errorMessage) {
          console.error('Gallery selection error:', response.errorMessage);
          reject(response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const asset = response.assets[0];

          const {uri, type, fileName, fileSize} = asset;

          if (this.validateImage(fileSize, type) && uri) {
            // const compressedUri = await this.compressImage(uri);

            resolve({
              uri: uri,
              // uri: compressedUri?.compressedUri || uri,
              type: type as string,
              name: fileName as string,
            });
          } else {
            resolve(null);
          }
        }
      });
    });
  }

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
