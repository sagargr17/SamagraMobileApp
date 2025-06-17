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
import {size} from '../../../Prefrences/Prefrences';
import {AreaMapper, titleRange} from '../../../Utilities/CustomMethods';
import {AppText} from '../../Elements/AppText';
import {Rating} from '../../Elements/Rating';
import {useTheme} from '@react-navigation/native';

// Units for Height and Width to adjust for different screen
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

//Functionality for infinity loop to Carousel
const flatList = createRef<any>();

let scrolled: number = 0;
setInterval(() => {
  if (scrolled < width * 4) {
    scrolled += AreaMapper({
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
  {
    image:
      'https://plus.unsplash.com/premium_photo-1663036970563-99624abc950e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Anju Washing',
    rating: 4,
  },
  {
    image:
      'https://plus.unsplash.com/premium_photo-1661594651848-0f08f9abe17d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Sagar Cleaning',
    rating: 5,
  },
  {
    image:
      'https://images.pexels.com/photos/8487360/pexels-photo-8487360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Sagar Hardware',
    rating: 5,
  },
  {
    image:
      'https://plus.unsplash.com/premium_photo-1678304224614-9a5b4f73109a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG91c2UlMjBrZWVwaW5nfGVufDB8fDB8fHww',
    title: 'Bhandari Electric',
    rating: 4,
  },
];

interface AppBannerProps {}
const AppBanner: React.FC<AppBannerProps> = () => {
  const {colors} = useTheme();
  return (
    <SafeAreaView style={style.wrapper}>
      <View>
        <FlatList
          data={DATA}
          ref={flatList}
          renderItem={({item, index}) => (
            <View style={style.imageContainer} key={index}>
              <FastImage
                style={[
                  style.image,
                  {
                    flex: 1,
                  },
                ]}
                source={{
                  uri: item.image,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
              <View
                style={[
                  {
                    position: 'absolute',
                    right: 0,
                    margin: 2,
                  },
                  size.elevation.l,
                ]}>
                <AppText
                  title={titleRange(item.title, 20)}
                  fontSizeVariant="caption"
                  fontVariant="medium"
                  customStyle={{
                    backgroundColor: colors.card,
                    padding: size.spacing.xs,
                    borderRadius: size.borderRadius.s,
                  }}></AppText>
              </View>
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
  wrapper: {
    position: 'relative',
    marginVertical: heightPercentageToDP(2),
    marginBottom: 5,
  },

  image: {
    resizeMode: 'contain',
    borderWidth: 0,
    borderRadius: size.borderRadius.s,
  },
  imageContainer: {
    width: 304,
    position: 'relative',
    marginRight:size.spacing.s,
    height: 145,
  },
});

export default AppBanner;
