import React from 'react';
import {View, Image, StyleSheet, TextInputComponent} from 'react-native';
import {Card, IconButton, TouchableRipple} from 'react-native-paper';
import {AppText} from '../../Elements/AppText';
import {useNavigation, useTheme} from '@react-navigation/native';
import {AreaMapper, titleRange} from '../../../Utilities/CustomMethods';
import {HomeStackNavigationProp} from '../../../Navigators/Stack/HomeStackNavigator';
import {ApplicationOverlayStackNavigationProp} from '../../../Navigators/Stack/ApplicationOverlayStackNavigator';
import {useAppDispatch} from '../../../StateManagement/hooks';
import {showLoader} from '../../../StateManagement/Error&loadingHandle/LoaderStateSlice';
import {Rating} from '../../Elements/Rating';
import {size} from '../../../Prefrences/Prefrences';

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
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          margin: size.spacing.xxs,
        },
        size.elevation.xs,
      ]}>
      <TouchableRipple
        rippleColor={colors.primary}
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
        style={{
          backgroundColor: colors.card,
          borderRadius: size.borderRadius.s,
        }}>
        <>
          <View>
            <Image
              source={{uri: cardImage}}
              style={styles.image}
              resizeMode="cover"
            />
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
              fontSizeVariant={'title'}
              title={titleRange(title)}
            />
            <View style={styles.bottomContainer}>
              <AppText
                fontVariant="bold"
                fontSizeVariant={'title'}
                title={`₹ ${price}`}
              />
              <Rating ratingNumber={Math.floor(Math.random() * 5)}></Rating>
            </View>
          </View>
        </>
      </TouchableRipple>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 165,
    borderRadius: size.borderRadius.l,
  },

  imageContainer: {
    position: 'relative',
    borderRadius: 18,
    overflow: 'hidden',
  },
  image: {
    height: 130,
    width: 165,
    borderRadius: AreaMapper({
      value: 10,
      scaleBy: 'width',
    }),
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
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
