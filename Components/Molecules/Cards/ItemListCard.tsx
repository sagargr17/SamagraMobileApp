import FastImage from '@d11/react-native-fast-image';
import {useTheme} from '@react-navigation/native';
import {View} from 'moti';
import React, {useState} from 'react';
import {Icon, Surface, Text, TouchableRipple} from 'react-native-paper';
import {StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import {AreaMapper, titleCase} from '../../../Utilities/CustomMethods';
import {AppText} from '../../Elements/AppText';
import {Rating} from '../../Elements/Rating';
import {size} from '../../../Prefrences/Prefrences';

interface ItemListCardProps {
  item: {
    name: string;
    price: number;
    imageUrl: string;
    rating: number;
    stocks?: number;
    shop?: {
      name: string;
    };
  };
  buttonDetails?: {
    title: string;
  };
  surfaceLevel?: 0 | 1 | 2 | 3 | 4 | 5 | any;
  customStyle?: ViewStyle;
  onImagePress?: any;
}

export const ItemListtCard: React.FC<ItemListCardProps> = ({
  item,
  surfaceLevel = 0,
  customStyle,
  onImagePress,
}) => {
  const {colors} = useTheme();

  return (
    <Surface
      elevation={surfaceLevel ? surfaceLevel : 0}
      style={[styles.container, {backgroundColor: colors.card}, customStyle]}>
      <View style={styles.detailsContainer}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onPress={() => onImagePress()}
            style={[
              styles.imageContainer,
              size.elevation.l,
              {
                borderRadius: size.borderRadius.full,
              },
            ]}>
            <FastImage
              style={styles.image}
              source={{
                uri: item.imageUrl,
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onImagePress()}
            style={styles.pricingContainer}>
            <AppText
              fontSizeVariant={'regular'}
              fontVariant="medium"
              title={titleCase(item.name)}></AppText>
            <Rating ratingNumber={item.rating}></Rating>
            <AppText
              customStyle={{
                color: item.stocks ? colors.text : colors.primary,
              }}
              fontSizeVariant={'regular'}
              fontVariant={item.stocks ? 'medium' : 'bold'}
              title={`रु.${item.price.toFixed(2)}`}></AppText>
            {item.stocks ? (
              <AppText
                customStyle={{
                  color: colors.primary,
                }}
                fontSizeVariant={'regular'}
                fontVariant="bold"
                title={`QTY : ${item.stocks} `}></AppText>
            ) : null}
          </TouchableOpacity>
        </View>
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 8,
    marginVertical: 2,
    // marginHorizontal: 8,
    overflow: 'hidden',
  },
  imageContainer: {
    width: AreaMapper({value: 100, scaleBy: 'width'}),
    height: AreaMapper({value: 100, scaleBy: 'height'}),
    marginRight: AreaMapper({value: 10, scaleBy: 'height'}),
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius:size.borderRadius.s
  },
  detailsContainer: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  pricingContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop:size.spacing.xxs
  },

  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: AreaMapper({
      value: 16,
      scaleBy: 'average',
    }),
  },
});
