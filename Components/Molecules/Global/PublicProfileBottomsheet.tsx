import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {AppBottomSheet} from './AppBottomSheet';
import {PairButtons} from './PairButtons';
import {TextComponet} from '../../Elements/TextComponet';
import {size} from '../../../Prefrences/Prefrences';
import FastImage from '@d11/react-native-fast-image';
import {DummyServiceProviderURL} from '../../../Constants/UI/AssetsUrls';
interface PublicProfileBottomCardProps {
  onClose: () => void;
  isOpen: boolean;

  sender: {
    username: string;
    location: string;
    price: number;
    distance: string;
    phoneNumber: number;
  };
}

export const PublicProfileBottomCard: React.FC<
  PublicProfileBottomCardProps
> = ({onClose, isOpen, sender}) => {
  const {colors} = useTheme();

  return (
    <AppBottomSheet
      onClose={onClose}
      isOppen={isOpen}
      flexHeight={0.17}
      pannigGesture={isOpen ? true : false}
      title="Profile Details"
      children={() => (
        <>
          <View style={[styles.primaryDetailContnainer]}>
            <FastImage
              style={styles.image}
              source={{
                uri: DummyServiceProviderURL,
              }}></FastImage>
            <View>
              <TextComponet
                title={'Phone Number:'}
                fontVariant="regular"
                fontSizeVariant={'regular'}></TextComponet>
              <TextComponet
                title={'Phone Number:'}
                fontVariant="regular"
                fontSizeVariant={'regular'}></TextComponet>
              <TextComponet
                title={'Phone Number:'}
                fontVariant="regular"
                fontSizeVariant={'regular'}></TextComponet>
            </View>
          </View>

          <View style={styles.userInformationContainer}>
            <View style={styles.emailContainer}>
              <TextComponet
                title={'Phone Number:'}
                fontVariant="regular"
                fontSizeVariant={'regular'}></TextComponet>
              <TextComponet
                title={`${sender.phoneNumber}`}
                fontVariant="medium"
                fontSizeVariant={'regular'}></TextComponet>
            </View>
            <View style={styles.locationcontainer}>
              <TextComponet
                title={'Location:'}
                fontVariant="regular"
                fontSizeVariant={'regular'}></TextComponet>
              <TextComponet
                title={`${sender.location}`}
                fontVariant="medium"
                fontSizeVariant={'regular'}></TextComponet>
            </View>
            <View style={styles.pairButtonsStyle}>
              <PairButtons
                onAcceptPress={() => {
                  console.log('Result');
                  // onAcceptHandle()
                }}
                onDeclinPress={() => {
                  console.log('Hello World');
                }}></PairButtons>
            </View>
          </View>
        </>
      )}></AppBottomSheet>
  );
};

const styles = StyleSheet.create({
  primaryDetailContnainer: {
    display: 'flex',
    flexDirection: 'row',
    borderWidth: size.borderWidth.xss,
  },

  userInformationContainer: {
    paddingHorizontal: size.spacing.xs,
    flex: 1,
  },

  emailContainer: {
    marginVertical: size.spacing.xs,
  },

  locationcontainer: {
    marginVertical: size.spacing.xs,
  },
  pairButtonsStyle: {
    marginVertical: size.spacing.s,
  },

  image: {
    height: 50,
    width: 50,
  },
});
