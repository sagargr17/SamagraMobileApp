import React, {useEffect, useState} from 'react';
import {ScrollView, TextComponent, View} from 'react-native';
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
import {TextComponet} from '../../../Components/Elements/TextComponet';
import FastImage from '@d11/react-native-fast-image';
import AppButton from '../../../Components/Elements/Button';
import {useTheme} from '@react-navigation/native';

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

  const {colors} = useTheme();

  return (
    <View
      style={{
        padding: SamagraScaller({
          value: 10,
          scaleBy: 'average',
        }),
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingVertical: SamagraScaller({
            value: 20,
            scaleBy: 'average',
          }),
          borderWidth: 0.5,
          paddingHorizontal: SamagraScaller({
            value: 10,
            scaleBy: 'average',
          }),
          borderRadius: 10,
          borderColor: colors.border,
        }}>
        <FastImage
          style={{
            height: 60,
            width: 60,
            borderRadius: SamagraScaller({
              scaleBy: 'width',
              value: 100,
            }),
          }}
          source={{
            uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          }}
          resizeMode="cover"></FastImage>
        <View
          style={{
            marginLeft: SamagraScaller({
              value: 8,
              scaleBy: 'average',
            }),
          }}>
          <TextComponet
            title="Sarita Thapa"
            customStyle={{
              textAlign: 'left',
              marginLeft: SamagraScaller({
                value: 5,
                scaleBy: 'average',
              }),
            }}
            fontVariant="bold"
            fontSize={30}
            lineHeight={30}></TextComponet>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TextComponet
              title="12 Shops"
              customStyle={{
                textAlign: 'left',
                marginLeft: SamagraScaller({
                  value: 5,
                  scaleBy: 'average',
                }),
              }}
              fontVariant="regular"
              fontSize={14}
              lineHeight={20}></TextComponet>
            <TextComponet
              title="1009 Items"
              customStyle={{
                textAlign: 'left',
                marginLeft: SamagraScaller({
                  value: 5,
                  scaleBy: 'average',
                }),
              }}
              fontVariant="regular"
              fontSize={14}
              lineHeight={20}></TextComponet>
          </View>
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop:8
        }}>
        <PoppedCard
          customStyle={{
            flex: 0.48,
          }}
          // comment="Personal Change"
          onPress={() => console.log('setting')}
          title="History"
          variant="large"
          iconName="history"></PoppedCard>
        <PoppedCard
          customStyle={{
            flex: 0.48,
          }}
          // comment="Personal Change"
          onPress={() => console.log('setting')}
          title="Activity"
          variant="small"
          iconName="chart-bar-stacked"></PoppedCard>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <PoppedCard
          customStyle={{
            flex: 0.48,
          }}
          // comment="Personal Change"
          onPress={() => console.log('setting')}
          title="Customer Service"
          variant="large"
          iconName="card-account-phone"></PoppedCard>
        <PoppedCard
          customStyle={{
            flex: 0.48,
          }}
          // comment="Personal Change"
          onPress={() => console.log('setting')}
          title="Recent"
          variant="small"
          iconName="view-comfy"></PoppedCard>
      </View>

      <View
        style={{
          marginVertical: SamagraScaller({
            value: 4,
            scaleBy: 'average',
          }),
        }}>
        <PoppedCard
          onPress={() => console.log('Error')}
          title="Items"
          variant="large"
          comment="Stocks,Orders & Other  Management"
          iconName="basket-unfill"></PoppedCard>
        <PoppedCard
          onPress={() => console.log('Error')}
          title="Manage Shop"
          variant="large"
          comment="Shops, Details and management "
          iconName="store"></PoppedCard>
        <PoppedCard
          onPress={() => console.log('Error')}
          title="Personal Account"
          variant="large"
          comment="Profile, Update User"
          iconName="account"></PoppedCard>
        <PoppedCard
          onPress={() => console.log('Error')}
          title="App Setting"
          variant="large"
          comment="Personal & Shop Setting"
          iconName="wrench"></PoppedCard>

        <AppButton onPress={() => console.log('Result')} color="danger">
          Logout
        </AppButton>
      </View>
    </View>
  );
};
