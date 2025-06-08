import FastImage from '@d11/react-native-fast-image';
import {useTheme} from '@react-navigation/native';
import {View} from 'moti';
import React, {useState} from 'react';
import {Icon, Surface, Text, TouchableRipple} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {AreaMapper, titleCase} from '../../../Utilities/CustomMethods';
import {TextComponet} from '../../Elements/TextComponet';

interface ItemListCardProps {
  item: {
    name: string;
    price: number;
    imageUrl: string;
    rating: number;
    stocks?: number;
    shop: {
      name: string;
    };
  };
  buttonDetails?: {
    title: string;
  };
}

export const ItemListtCard: React.FC<ItemListCardProps> = ({item}) => {
  const {colors} = useTheme();

  return (
    <Surface
      elevation={0}
      style={[styles.container, {backgroundColor: colors.card}]}>
      <TouchableRipple
        onPress={() => console.log('Result')}
        style={styles.detailsContainer}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}>
          <View style={styles.imageContainer}>
            <FastImage
              style={styles.image}
              source={{
                uri: item.imageUrl,
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
          <View style={styles.pricingContainer}>
            <TextComponet
              fontSizeVariant={18}
              fontVariant="medium"
              lineHeight={24}
              title={titleCase(item.name)}></TextComponet>
            <View
              style={{
                display: 'flex',
              }}>
              <View style={styles.ratingContainer}>
                <Icon source="star" size={16} color={colors.notification} />
                <Text style={[styles.ratingText, {color: colors.text}]}>
                  {item.rating.toFixed(1)}
                </Text>
              </View>
              <TextComponet
                customStyle={{
                  color: '#6cad8b',
                }}
                fontSizeVariant={18}
                fontVariant="regular"
                lineHeight={24}
                title={titleCase(item.shop.name)}></TextComponet>
              {!item.stocks ? (
                <TextComponet
                  customStyle={{
                    color: item.stocks ? colors.text : colors.primary,
                  }}
                  fontSizeVariant={item.stocks ? 16 : 25}
                  fontVariant={item.stocks ? 'medium' : 'bold'}
                  lineHeight={28}
                  title={`रु.${item.price.toFixed(2)}`}></TextComponet>
              ) : null}
              {item.stocks ? (
                <TextComponet
                  customStyle={{
                    color: colors.primary,
                  }}
                  fontSizeVariant={25}
                  fontVariant="bold"
                  lineHeight={24}
                  title={`QTY : ${item.stocks} `}></TextComponet>
              ) : null}
            </View>
          </View>
        </View>
      </TouchableRipple>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 8,
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
