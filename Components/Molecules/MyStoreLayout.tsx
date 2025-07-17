import FastImage from '@d11/react-native-fast-image';
import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Surface} from 'react-native-paper';
import {manageStorepoppedCardParams} from '../../Constants/UI/More';
import {AreaMapper} from '../../Utilities/CustomMethods';
import AppButton from '../Elements/Button';
import {Rating} from '../Elements/Rating';
import {AppText} from '../Elements/AppText';
import {AppBottomSheet} from './Global/AppBottomSheet';
import {BubbleCard} from './Cards/BubbleCard';

interface MyShopDisplayLayoutProps {
  shop: {
    name: string;
    aboutShop: string;
    stars: {
      stars: number;
    };
    location: string;
    phoneNumber: string;
    profileImageUrl: string;
  };

  // onCreateNewShop: () => void;
}

export const MyStoreLayout: React.FC<MyShopDisplayLayoutProps> = ({shop}) => {
  const {colors} = useTheme();

  return (
    <>
      <View key={shop.name} style={styles.wrapper}>
        <ScrollView
          style={styles.scrollViewContainer}
          contentContainerStyle={{
            height: AreaMapper({
              value: 73,
              scaleBy: 'height',
            }),
          }}>
          {manageStorepoppedCardParams.map((item, index) => (
            <BubbleCard
              key={index}
              onPress={item.onPressHandle}
              variant={item.variant}
              iconName={item.iconName}
              comment={item.comment}
              title={item.title}></BubbleCard>
          ))}
        </ScrollView>

        {/* This is the App buttom SHeet  */}
        <AppBottomSheet
          children={() => (
            <View style={styles.appBottomSheetWrapper}>
              <View style={styles.appBottomSheetChildOne}>
                <Surface style={styles.surfaceContainer}>
                  <FastImage
                    style={{
                      height: 80,
                      width: 80,
                      borderRadius: 4,
                      marginRight: 10,
                    }}
                    source={{
                      uri: 'https://i.pinimg.com/736x/cf/d2/fd/cfd2fd0ba8a6e2d958b969fbf2953a8c.jpg',
                    }}></FastImage>
                </Surface>
                <View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                    }}>
                    <Rating ratingNumber={4}></Rating>
                    <AppText
                      customStyle={{
                        color: 'orange',
                      }}
                      fontVariant="bold"
                      title={shop.name}
                      fontSizeVariant={'regular'}></AppText>
                  </View>
                  <AppText
                    customStyle={{
                      color: 'green',
                    }}
                    fontVariant="medium"
                    title="Open from 10:00 am to 7:pm"
                    fontSizeVariant={'regular'}></AppText>
                  <AppText
                    customStyle={{
                      opacity: 0.8,
                    }}
                    fontVariant="medium"
                    title={shop.location}
                    fontSizeVariant={'regular'}></AppText>
                  <AppText
                    customStyle={{
                      opacity: 0.8,
                    }}
                    fontVariant="medium"
                    title={shop.phoneNumber}
                    fontSizeVariant={'regular'}></AppText>
                </View>
              </View>

              <View style={styles.appButtonWrapper}>
                <AppButton
                  style={{
                    marginTop: AreaMapper({
                      value: 12,
                      scaleBy: 'height',
                    }),
                    flex: 0.7,
                  }}>
                  Edit Shop
                </AppButton>
                <AppButton
                  color="light"
                  style={{
                    marginTop: AreaMapper({
                      value: 12,
                      scaleBy: 'height',
                    }),
                    flex: 0.2,
                  }}>
                  Close Shop
                </AppButton>
              </View>
            </View>
          )}
          isOppen={true}
          pannigGesture={false}></AppBottomSheet>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: AreaMapper({
      value: 14,
      scaleBy: 'average',
    }),
    paddingTop: 0,
    flex: 1,
  },
  scrollViewContainer: {
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
  },

  appButtonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  appBottomSheetWrapper: {
    paddingBottom: AreaMapper({
      value: 15,
      scaleBy: 'height',
    }),
  },
  appBottomSheetChildOne: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  appBottomSheetChildTwo: {},
  surfaceContainer: {
    width: 80,
    marginRight: 10,
    height: 80,
  },
});
