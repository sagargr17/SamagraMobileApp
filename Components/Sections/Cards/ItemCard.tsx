import React from 'react';
import {View, Image, StyleSheet, TextInputComponent} from 'react-native';
import {Card, IconButton, TouchableRipple} from 'react-native-paper';
import {TextComponet} from '../../Elements/TextComponet';
import {useNavigation, useTheme} from '@react-navigation/native';
import {SamagraScaller, titleRange} from '../../../Utilities/CustomMethods';
import {HomeStackNavigationProp} from '../../../Navigators/Stack/HomeStackNavigator';
import {ApplicationOverlayStackNavigationProp} from '../../../Navigators/Stack/ApplicationOverlayStackNavigator';

interface ItemCardProps {
  cardImage: string;
  title: string;
  price: string;
  rating: number;
  margin: number;
  marginTop?: number;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  cardImage,
  title,
  price,
  rating,
  margin = 0,
  marginTop = 0,
}) => {
  const {colors} = useTheme();
  const navigation: any = useNavigation();
  // useNavigation<ApplicationOverlayStackNavigationProp<'ItemDetailScreen'>>();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          padding: 0,
          margin: SamagraScaller({
            value: margin,
            scaleBy: 'average',
          }),
          marginTop: SamagraScaller({
            value: marginTop,
            scaleBy: 'average',
          }),
        },
      ]}>
      <TouchableRipple
        rippleColor={colors.primary}
        onPress={() => {
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
            borderRadius: SamagraScaller({
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
              paddingHorizontal: SamagraScaller({
                value: 10,
                scaleBy: 'average',
              }),
              paddingTop: SamagraScaller({
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
    width: SamagraScaller({
      value: 172,
      scaleBy: 'width',
    }),
    borderRadius: SamagraScaller({
      value: 30,
      scaleBy: 'width',
    }),
    elevation: 2,
    // margin: 20,
  },

  imageContainer: {
    position: 'relative',
    borderRadius: 18,
    overflow: 'hidden',
  },
  image: {
    height: SamagraScaller({
      value: 130,
      scaleBy: 'height',
    }),
    width: SamagraScaller({
      value: 172,
      scaleBy: 'width',
    }),
    borderRadius: SamagraScaller({
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
