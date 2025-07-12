import FastImage from '@d11/react-native-fast-image';
import { useNavigation, useTheme } from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { IconButton } from 'react-native-paper';
import { ItemImageNotFound } from '../../../Constants/UI/AssetsUrls';
import { size } from '../../../Prefrences/Prefrences';
import { showLoader } from '../../../StateManagement/Error&loadingHandle/LoaderStateSlice';
import { useAppDispatch } from '../../../StateManagement/hooks';
import {
  AreaMapper,
  isValidUrl,
  titleRange,
} from '../../../Utilities/CustomMethods';
import { AppText } from '../../Elements/AppText';
import { Rating } from '../../Elements/Rating';

interface ItemMiniCardProps {
  id: string;
  cardImage: string;
  title: string;
  price: string;
  rating: number;
}

export const ItemMiniCard: React.FC<ItemMiniCardProps> = ({
  id,
  cardImage,
  title,
  price,
  rating,
}) => {
  const {colors} = useTheme();
  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();

  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(showLoader());
        navigation.navigate('ApplicationOverlay', {
          screen: 'ItemDetailScreen',
          params: {
            name: title,
            id: id,
          },
        });
      }}
      // rippleColor={colors.primary}
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          marginTop: size.spacing.s,
          marginRight: size.spacing.s,
        },
        size.elevation.xs,
      ]}>
      <View
        style={{
          borderRadius: size.borderRadius.l,
        }}>
        <View>
          <FastImage
            source={{
              uri: isValidUrl(cardImage) ? cardImage : ItemImageNotFound,
            }}
            style={styles.image}
            resizeMode="cover"></FastImage>
          <IconButton
            icon="heart-outline"
            size={size.iconSize.small}
            onPress={() => console.log('Added to wishlist')}
            style={styles.wishlistButton}
            iconColor={colors.notification}
          />
        </View>
        <View
          style={{
            paddingHorizontal: size.spacing.s,
            paddingVertical: size.spacing.xxs,
            borderBottomLeftRadius: size.borderRadius.m,
            borderBottomRightRadius: size.borderRadius.m,
          }}>
          <AppText
            fontVariant="medium"
            fontSizeVariant={'regular'}
            title={titleRange(title)}
            customStyle={{
              marginTop: size.spacing.xs,
            }}
          />
          <View style={styles.bottomContainer}>
            <AppText
              customStyle={{
                color: colors.primary,
              }}
              fontVariant="bold"
              fontSizeVariant={'title'}
              title={`₹ ${price}`}
            />
            <Rating ratingNumber={Math.floor(Math.random() * 5)}></Rating>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: AreaMapper({
      value: 185,
      scaleBy: 'width',
    }),
    borderRadius: size.borderRadius.l,
    height: 203,
  },

  imageContainer: {
    position: 'relative',
    borderRadius: 18,
    overflow: 'hidden',
  },
  image: {
    height: 135,
    width: AreaMapper({
      value: 178,
      scaleBy: 'width',
    }),
    borderRadius: size.borderRadius.m,
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
