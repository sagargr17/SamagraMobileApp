import ImageSlider from '@coder-shubh/react-native-image-slider';
import FastImage from '@d11/react-native-fast-image';
import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {Modal} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import {IconButton} from 'react-native-paper';
import {AreaMapper} from '../../Utilities/CustomMethods';

interface ImageSliderModalProps {
  images: Array<{
    url: string;
  }>;
}

export const ImageSliderModal: React.FC<ImageSliderModalProps> = ({images}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const {colors} = useTheme();

  console.log(
    'ImageN ',
    images.map(ww => ww.url),
  );

  return (
    <>
      <ImageSlider
        onTouchEnd={() => setVisible(!visible)}
        testID="imageSlider_testID"
        images={images.map(x => x.url)}
        // images={['http://static.samagranepal.com/8cp6eFcN1k2dc4f72gUBQ.jpg']}
        imageHeight={AreaMapper({
          value: 40,
          scaleBy: 'height',
        })}
        dotSize={10}
        dotColor="silver"
        activeDotColor="blue"
        showNavigationButtons={false}
        showIndicatorDots={false}
        imageLabel={true}
        extrapolate="clamp"
        autoSlideInterval={100000}
        radius={5}
        containerStyle={{
          margin: 0,
        }}
      />

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
            style={
              {
                // flex: 1,
                // flexDirection: 'column',
              }
            }
            imageUrls={images}
            swipeDownThreshold={100}
            onSwipeDown={() => setVisible(!visible)}
            enableSwipeDown
            saveToLocalByLongPress={false}
            renderImage={props => (
              <FastImage
                resizeMode="contain"
                {...props}
                style={{
                  width: AreaMapper({
                    value: 400,
                    scaleBy: 'width',
                  }),
                  height: AreaMapper({
                    value: 420,
                    scaleBy: 'width',
                  }),
                  // marginTop: AreaMapper({value: 67}),

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
