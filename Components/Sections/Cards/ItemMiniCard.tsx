import React from 'react';
import {View, Image, StyleSheet, TextInputComponent} from 'react-native';
import {Card, IconButton, TouchableRipple} from 'react-native-paper';
import {TextComponet} from '../../Elements/TextComponet';
import {useNavigation, useTheme} from '@react-navigation/native';
import {AreaMapper, titleRange} from '../../../Utilities/CustomMethods';
import {HomeStackNavigationProp} from '../../../Navigators/Stack/HomeStackNavigator';
import {ApplicationOverlayStackNavigationProp} from '../../../Navigators/Stack/ApplicationOverlayStackNavigator';
import {useAppDispatch} from '../../../StateManagement/hooks';
import {showLoader} from '../../../StateManagement/Error&loadingHandle/LoaderState';

interface ItemMiniCardProps {
  cardImage: string;
  title: string;
  price: string;
  rating: number;
  margin: number;
  marginTop?: number;
}

export const ItemMiniCard: React.FC<ItemMiniCardProps> = ({
  cardImage,
  title,
  price,
  rating,
  margin = 0,
  marginTop = 0,
}) => {
  const {colors} = useTheme();
  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          padding: 0,
          margin: AreaMapper({
            value: margin,
            scaleBy: 'average',
          }),
          marginTop: AreaMapper({
            value: marginTop,
            scaleBy: 'average',
          }),
        },
      ]}>
      <TouchableRipple
        rippleColor={colors.primary}
        onPress={() => {
          dispatch(showLoader());

          navigation.navigate('ApplicationOverlay', {
            screen: 'ItemDetailScreen',
            params: {
              name: title,
            },
          });
        }}
        style={[
          {
            backgroundColor: colors.card,
            borderRadius: AreaMapper({
              value: 12,
              scaleBy: 'average',
            }),
          },
        ]}>
        <>
          <View>
            <Image
              source={{uri: cardImage}}
              style={styles.image}
              resizeMode="cover"
            />
            <IconButton
              icon="heart-outline"
              size={24}
              onPress={() => console.log('Added to wishlist')}
              style={styles.wishlistButton}
              iconColor={colors.notification}
            />
          </View>
          <View
            style={{
              paddingHorizontal: AreaMapper({
                value: 10,
                scaleBy: 'average',
              }),
              paddingTop: AreaMapper({
                value: 14,
                scaleBy: 'average',
              }),
            }}>
            <TextComponet
              fontVariant="medium"
              fontSize={18}
              lineHeight={17}
              title={titleRange(title)}
            />
            <View style={styles.bottomContainer}>
              <TextComponet
                fontVariant="bold"
                fontSize={18}
                customStyle={{
                  color: colors.text,
                }}
                title={`₹ ${price}`}
              />
              <View style={styles.ratingContainer}>
                <TextComponet
                  fontVariant="medium"
                  fontSize={14}
                  customStyle={{
                    color: colors.notification,
                  }}
                  title={rating.toString()}
                />
                <IconButton icon="star" size={20} iconColor={'#FFA902'} />
              </View>
            </View>
          </View>
        </>
      </TouchableRipple>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: AreaMapper({
      value: 172,
      scaleBy: 'width',
    }),
    borderRadius: AreaMapper({
      value: 30,
      scaleBy: 'width',
    }),
    elevation: 0.7,
    // margin: 20,
  },

  imageContainer: {
    position: 'relative',
    borderRadius: 18,
    overflow: 'hidden',
  },
  image: {
    height: AreaMapper({
      value: 130,
      scaleBy: 'height',
    }),
    width: AreaMapper({
      value: 172,
      scaleBy: 'width',
    }),
    borderRadius: AreaMapper({
      value: 10,
      scaleBy: 'width',
    }),
  },
  wishlistButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 12,
    opacity: 0.8,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
