import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  ScrollView,
  View,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import {IconButton} from 'react-native-paper';
import {AreaMapper, isValidUrl} from '../../Utilities/CustomMethods';
import FastImage from '@d11/react-native-fast-image';

interface ImageSliderModalProps {
  images: Array<{
    url: string;
  }>;
}

export const ImageSliderModal: React.FC<ImageSliderModalProps> = ({images}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const {colors} = useTheme();

  console.log(
    'Image ',
    images.map(ww => ww.url),
  );

  return (
    <>
      <ScrollView
        style={{}}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}>
        {images
          .map(x => x.url)
          .map((image, index) => (
            <View key={index} onTouchEnd={() => setVisible(!visible)}>
              <Image
                onError={error => console.log('Error', error)}
                onProgress={() => <ActivityIndicator></ActivityIndicator>}
                resizeMode="contain"
                style={{
                  height: AreaMapper({value: 300, scaleBy: 'height'}),
                  width: AreaMapper({value: 415, scaleBy: 'height'}),
                  backgroundColor: 'pinnk',
                }}
                source={{
                  uri: image,
                }}
              />
            </View>
          ))}
      </ScrollView>

      {visible ? (
        <Modal visible={visible} transparent={false}>
          <IconButton
            rippleColor={'gray'}
            style={{
              position: 'absolute',
              top: AreaMapper({
                value: 5,
                scaleBy: 'height',
              }),
              zIndex: 2,
            }}
            icon="close-circle"
            iconColor="white"
            onPress={() => setVisible(!visible)}></IconButton>

          <ImageViewer
            imageUrls={images}
            swipeDownThreshold={100}
            onSwipeDown={() => setVisible(!visible)}
            enableSwipeDown
            failImageSource={{
              url: 'https://en-ae.sssports.com/dw/image/v2/BDVB_PRD/on/demandware.static/-/Sites-akeneo-master-catalog/default/dw62ba69b3/sss/SSS2/A/D/I/H/6/SSS2_ADIH6000_4067897757796_1.jpg?sw=700&sh=700&sm=fit',
            }}
            // backgroundColor="pink"
            saveToLocalByLongPress={false}
            renderImage={props => (
              <Image
                resizeMode="contain"
                {...props}
                style={{
                  flex: 1,
                  zIndex: 1,
                  resizeMode: 'contain', // or 'cover' if you want full fit
                }}
              />
            )}
          />
        </Modal>
      ) : null}
    </>
  );
};
