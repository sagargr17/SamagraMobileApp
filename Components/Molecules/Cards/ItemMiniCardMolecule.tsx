import FastImage from '@d11/react-native-fast-image';
import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import {ItemImageNotFound} from '../../../Constants/UI/AssetsUrls';
import {size} from '../../../Prefrences/Prefrences';
import {showLoader} from '../../../StateManagement/Error&loadingHandle/LoaderStateSlice';
import {useAppDispatch} from '../../../StateManagement/hooks';
import {
  AreaMapper,
  isValidUrl,
  titleRange,
} from '../../../Utilities/CustomMethods';
import {AppTextElement} from '../../Elements/AppTextElement';
import {RatingElement} from '../../Elements/RatingElement';

interface ItemMiniCardMoleculeProps {
  id: string;
  cardImage: string;
  title: string;
  price: string;
  rating: number;
}

export const ItemMiniCardMolecule: React.FC<ItemMiniCardMoleculeProps> = ({
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
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          marginTop: size.spacing.s,
          borderWidth: size.borderWidth.xs,
          borderColor: colors.border,
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
          <AppTextElement
            fontVariant="medium"
            fontSizeVariant={'regular'}
            title={titleRange(title)}
            customStyle={{
              marginTop: size.spacing.xs,
            }}
          />
          <View style={styles.bottomContainer}>
            <AppTextElement
              customStyle={{
                color: colors.primary,
              }}
              fontVariant="bold"
              fontSizeVariant={'title'}
              title={`₹ ${price}`}
            />
            <RatingElement ratingNumber={Math.floor(Math.random() * 5)}></RatingElement>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: AreaMapper({
      value: 180,
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
      value: 179,
      scaleBy: 'width',
    }),
    borderTopRightRadius: size.borderRadius.l,
    borderTopLeftRadius: size.borderRadius.l,
    borderBottomLeftRadius: size.borderRadius.m,
    borderBottomRightRadius: size.borderRadius.m,
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
