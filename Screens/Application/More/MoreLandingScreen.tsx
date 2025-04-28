import React, {useEffect} from 'react';
import {ScrollView, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {clearTokens} from '../../../client/Token/TokenAccess';
import {HomeStackNavigationProp} from '../../../Navigators/Stack/HomeStackNavigator';
// import {client} from '../../../Client/Graphql/PublicClient';
// import {getPublicItems} from '../../../GraphQL/Queries/ItemQueries';

// import {gql} from '../../../src/__generated__';

import Geolocation from '@react-native-community/geolocation';
import {PoppedCard} from '../../../Components/Sections/Cards/PoppedCard';
import ImageHandler from '../../../Utilities/ImageHandler';
import {SamagraScaller} from '../../../Utilities/CustomMethods';

interface MoreLandingScreenProps {
  navigation: any;
}

export const MoreLandingScreen: React.FC<MoreLandingScreenProps> = ({
  navigation,
}) => {
  // Testing Function , will be handle sepratedly for efficiendy in future
  const handleGoToHomeDetailScreen = () => {
    // navigation.navigate('HomeDetailScreen');
  };

  // const {data, loading, error} = useQuery(getPublicItems);
  // console.log('DATAAA', data);

  // async function handleImageUploadFromCamera() {
  //   const image = await ImageHandler.selectFromGallery();
  //   //
  // }

  // async function handleOpenCamera() {
  //   const cameraOpenedImage = await ImageHandler.openCamera();
  //   if (cameraOpenedImage) {
  //     console.log('selected  image URL:', cameraOpenedImage);
  //   } else {
  //     console.error('Image upload failed.');
  //   }
  // }

  // useEffect(() => {
  //   const config: any = {
  //     skipPermissionRequests: false, // Set to true if you handle permissions elsewhere
  //     authorizationLevel: 'whenInUse', // iOS only: 'whenInUse' or 'always'
  //     locationProvider: 'fused', // Android only: 'auto', 'gps', 'network', or 'fused'
  //   };

  //   Geolocation.setRNConfiguration(config);

  //   let rrr = Geolocation.getCurrentPosition(info => console.log(info));
  // }, []);

  // // This is the Testing Cmponent
  // const test = () => {
  //   return (
  //     <ScrollView
  //       style={
  //         {
  //           // marginTop: 100,
  //         }
  //       }>
  //       <Text>Home Screen</Text>
  //       <Button
  //         style={{
  //           marginBottom: 50,
  //         }}
  //         icon="camera"
  //         mode="contained"
  //         onPress={handleGoToHomeDetailScreen}>
  //         Go to HomeDetail Screen
  //       </Button>
  //       <Button icon="camera" mode="contained" onPress={clearTokens}>
  //         Logout
  //       </Button>
  //       <Button
  //         icon="camera"
  //         mode="contained"
  //         // onPress={}
  //         style={{
  //           marginTop: 50,
  //         }}>
  //         Public Data
  //       </Button>
  //       <Button
  //         icon="camera"
  //         mode="contained"
  //         // onPress={}
  //         style={{
  //           marginTop: 50,
  //         }}>
  //         Push Data
  //       </Button>

  //       <Button
  //         icon="camera"
  //         mode="contained"
  //         onPress={() => handleImageUploadFromCamera()}
  //         style={{
  //           marginTop: 50,
  //         }}>
  //         Upload Image from Gallery
  //       </Button>
  //       <Button
  //         icon="camera"
  //         mode="contained"
  //         onPress={() => handleOpenCamera()}
  //         style={{
  //           marginTop: 50,
  //         }}>
  //         Camera
  //       </Button>

  //       {/* <MapView
  //       initialRegion={{
  //         latitude: 37.78825,
  //         longitude: -122.4324,
  //         latitudeDelta: 0.0922,
  //         longitudeDelta: 0.0421,
  //       }}
  //     /> */}
  //     </ScrollView>
  //   );
  // };

  return (
    <>
      <PoppedCard
        onPress={() => console.log('Error')}
        title="My Shop"
        variant="large"
        comment="Profile, Update User"
        iconName="camera"></PoppedCard>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <PoppedCard
          customStyle={{
            flex: 0.6,
          }}
          onPress={() => console.log('setting')}
          title="Setting"
          variant="large"
          iconName="account"></PoppedCard>
        <PoppedCard
          customStyle={{
            flex: 0.6,
          }}
          onPress={() => console.log('setting')}
          title="Setting"
          variant="large"
          iconName="abugida-devanagari"></PoppedCard>
      </View>
    </>
  );
};
