import {useTheme} from '@react-navigation/native';
import React from 'react';
import {Logos} from '../../Assets/SVG/Exports/Exports';
import {View} from 'moti';
import {BasicCard} from '../Layout/BasicCard';
import {Surface} from 'react-native-paper';
import {TextComponet} from '../Elements/TextComponet';

interface ShopDisplayCardProps {
  shop: {
    id: string;
    icon: any;
    shopName: string;
    shopDescription: string;
    rating: number;
    item: {
      totalProduct: number;
      totalServices: number;
    };

    owner: {
      owner: {
        ownerName: string;
        phoneNumber: string;
      };
    };
  };
}

export const ShopDisplayCard: React.FC<ShopDisplayCardProps> = ({shop}) => {
  const {colors} = useTheme();

  return (
    <>
      <View>
        <View
          style={{
            alignItems: "center",
          }}>
          {shop.icon}
        </View>
        <View></View>
      </View>
    </>
  );
};
