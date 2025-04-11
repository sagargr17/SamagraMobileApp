import FastImage from '@d11/react-native-fast-image';
import React, {createRef} from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';

import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {SamagraScaller} from '../../Utilities/CustomMethods';

// Units for Height and Width to adjust for different screen
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

//Functionality for infinity loop to Carousel
const flatList = createRef<any>();

let scrolled: number = 0;
setInterval(() => {
  if (scrolled < width * 4) {
    scrolled += SamagraScaller({
      value: 300,
      scaleBy: 'width',
    });
  } else {
    scrolled = 0;
  }
  if (!flatList.current) {
    return;
  }
  flatList.current.scrollToOffset({animated: true, offset: scrolled});
}, 5000);

const DATA = [
  'https://plus.unsplash.com/premium_photo-1663036970563-99624abc950e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1661594651848-0f08f9abe17d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1678304224614-9a5b4f73109a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG91c2UlMjBrZWVwaW5nfGVufDB8fDB8fHww',
  'https://images.pexels.com/photos/8487360/pexels-photo-8487360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
];

interface SamagraBannerProps {}
const SamagraBanner: React.FC<SamagraBannerProps> = () => {
  return (
    <SafeAreaView
      style={{
        position: 'relative',
        marginVertical: heightPercentageToDP(2),
        marginBottom: 5,
        paddingHorizontal: SamagraScaller({
          value: 8,
          scaleBy: 'average',
        }),
      }}>
      <View
        style={{
          elevation: 10,
        }}>
        <FlatList
          data={DATA}
          ref={flatList}
          renderItem={({item, index}) => (
            <View
              style={{
                width: SamagraScaller({
                  value: 304,
                  scaleBy: 'width',
                }),
                position: 'relative',
                marginRight: widthPercentageToDP(2),
                height: SamagraScaller({
                  value: 155,
                  scaleBy: 'average',
                }),
              }}>
              <FastImage
                style={[
                  style.image,
                  {
                    flex: 1,
                  },
                ]}
                source={{
                  uri: item,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
          )}
          keyExtractor={(_, index) => index.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          scrollEnabled
          snapToAlignment="center"
          scrollEventThrottle={16}
          decelerationRate={0}
          disableIntervalMomentum={true}></FlatList>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  image: {
    resizeMode: 'contain',
    borderWidth: SamagraScaller({
      value: 1,
      scaleBy: 'average',
    }),
    borderRadius: 8,
    borderColor: '#ddd',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.9,
    shadowRadius: 3,
  },
});

export default SamagraBanner;
