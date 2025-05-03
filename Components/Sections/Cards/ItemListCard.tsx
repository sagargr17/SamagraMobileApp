import FastImage from '@d11/react-native-fast-image';
import {useTheme} from '@react-navigation/native';
import {View} from 'moti';
import React, {useState} from 'react';
import {Icon, Surface, Text, TouchableRipple} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {SamagraScaller} from '../../../Utilities/CustomMethods';
import {TextComponet} from '../../Elements/TextComponet';

interface ItemListCardProps {
  title?: string;
  item: {
    name: string;
    price: number;
    imageUrl: string;
    rating: number;
  };
}

export const ItemListtCard: React.FC<ItemListCardProps> = ({item}) => {
  const {colors} = useTheme();
 

  return (
    <Surface
      elevation={3}
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
              fontSize={25}
              fontVariant="medium"
              lineHeight={18}
              title={`${item.name}`}></TextComponet>
            <View
              style={{
                display: 'flex',
              }}>
              <TextComponet
                customStyle={{
                  color: colors.primary,
                }}
                fontSize={18}
                fontVariant="bold"
                lineHeight={35}
                title={`रु.${item.price.toFixed(2)}`}></TextComponet>
              <View style={styles.ratingContainer}>
                <Icon source="star" size={16} color={colors.notification} />
                <Text style={[styles.ratingText, {color: colors.text}]}>
                  {item.rating.toFixed(1)}
                </Text>
              </View>
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
    width: SamagraScaller({value: 100, scaleBy: 'width'}),
    height: SamagraScaller({value: 100, scaleBy: 'height'}),
    marginRight: SamagraScaller({value: 10, scaleBy: 'height'}),
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
    alignItems: 'center',
    // justifyContent: 'space-between',
  },

  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
  },
});
