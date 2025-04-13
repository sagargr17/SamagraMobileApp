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
          value: 362,
          scaleBy: 'average',
        })}
        dotSize={10}
        dotColor="silver"
        activeDotColor="blue"
        showNavigationButtons={false}
        showIndicatorDots={false}
        imageLabel={true}
        extrapolate="clamp"
        autoSlideInterval={100000}
        containerStyle={{
          marginTop: 0,
        }}
        radius={5}
      />

      <Modal
        visible={visible}
        transparent={false}
        style={{
          height: 20,
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
                  value: 393,
                  scaleBy: 'width',
                }),
                height: SamagraScaller({
                  value: 362,
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
