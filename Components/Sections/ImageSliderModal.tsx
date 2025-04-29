import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {FlatList, Image, Modal, TouchableOpacity} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import {SamagraScaller} from '../../Utilities/CustomMethods';
import FastImage from '@d11/react-native-fast-image';
import ImageSlider from '@coder-shubh/react-native-image-slider';

interface ImageSliderModalProps {
  images: Array<{
    url: string;
  }>;
}

export const ImageSliderModal: React.FC<ImageSliderModalProps> = ({images}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const {colors} = useTheme();

  return (
    <>
      <ImageSlider
        onTouchEnd={() => setVisible(!visible)}
        testID="imageSlider_testID"
        images={images.map(x => x.url)}
        imageHeight={SamagraScaller({
          value: 322,
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
      <Modal
        visible={visible}
        transparent={false}
        style={{
          height: 2000,
        }}>
        <ImageViewer
          imageUrls={images}
          onSwipeDown={() => setVisible(!visible)}
          enableSwipeDown
          saveToLocalByLongPress={false}
          renderImage={props => (
            <Image
              {...props}
              style={{
                width: SamagraScaller({
                  value: 400,
                  scaleBy: 'width',
                }),
                height: SamagraScaller({
                  value: 260,
                  scaleBy: 'width',
                }),

                resizeMode: 'contain', // or 'cover' if you want full fit
              }}
            />
          )}
        />
      </Modal>
    </>
  );
};
