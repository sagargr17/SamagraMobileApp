import React from 'react';
import {Button, Text} from 'react-native-paper';
import {HomeStackNavigationProp} from '../../../Navigators/Stack/HomeStackNavigator';
import {ScrollView} from 'react-native';
import {clearTokens} from '../../../client/Token/TokenAccess';
// import {client} from '../../../Client/Graphql/PublicClient';
// import {getPublicItems} from '../../../GraphQL/Queries/ItemQueries';

import {useQuery} from '@apollo/client';
// import {gql} from '../../../src/__generated__';
import gql from 'graphql-tag';
import {
  getPublicItems,
  getPublicItemsById,
} from '../../../GraphQL/Queries/ItemQueries';

import ImageHandler from '../../../Utilities/ImageHandler';

interface HomeScreenProps {
  navigation: HomeStackNavigationProp<'HomeScreen'>;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  // Testing Function , will be handle sepratedly for efficiendy in future
  const handleGoToHomeDetailScreen = () => {
    navigation.navigate('HomeDetailScreen');
  };

  // const {data, loading, error} = useQuery(getPublicItems);
  // console.log('DATAAA', data);

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

  return (
    <>
      <ScrollView
        style={{
          marginTop: 100,
        }}>
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
        <Button icon="camera" mode="contained" onPress={clearTokens}>
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
      </ScrollView>
    </>
  );
};
