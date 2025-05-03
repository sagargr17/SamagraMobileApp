import {useTheme} from '@react-navigation/native';
import React, {useEffect} from 'react';
import ImageHandler from '../../../Utilities/ImageHandler';
import Geolocation from '@react-native-community/geolocation';
import {ScrollView, Text} from 'react-native';
import {Button} from 'react-native-paper';
interface AddItemScreenProps {}

export const AddItemScreen: React.FC<AddItemScreenProps> = ({}) => {
  const {colors} = useTheme();
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
  }, []);

  // This is the Testing Cmponent
  const test = () => {
    return (
      <ScrollView
        style={
          {
            // marginTop: 100,
          }
        }>
        <Text>Home Screen</Text>
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
        </Button>

        {/* <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      /> */}
      </ScrollView>
    );
  };

  return <></>;
};
