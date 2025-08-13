import React from 'react';
import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {
  cardDetail,
  CardSliderMoleCule,
} from '../../../Molecules/Cards/CardSliderMolecule';
import {Logos} from '../../../../Assets/SVG/Exports/Exports';
import {AreaMapper} from '../../../../Utilities/CustomMethods';
interface OfferDiscountProps {}

export const OfferDiscount: React.FC<OfferDiscountProps> = ({}) => {
  const {colors} = useTheme();
  const {CarWash, Massage, HairCut} = Logos;

  const data: cardDetail[] = [
    {
      title: 'HairCut',
      frame: (
        <HairCut
          height={AreaMapper({value: 160, scaleBy: 'height'})}
          width={AreaMapper({value: 160, scaleBy: 'width'})}
        />
      ),
      onPress: () => Alert.alert('<<'),
      comment: '15% off',
    },

    {
      title: 'Massage',
      frame: (
        <Massage
          height={AreaMapper({value: 160, scaleBy: 'height'})}
          width={AreaMapper({value: 160, scaleBy: 'width'})}
        />
      ),
      onPress: () => Alert.alert('<<'),
      comment: '20% off',
    },
    {
      title: 'Car Wash',
      frame: (
        <CarWash
          height={AreaMapper({value: 160, scaleBy: 'height'})}
          width={AreaMapper({value: 160, scaleBy: 'width'})}
        />
      ),
      onPress: () => Alert.alert('<<'),
      comment: '10% off',
    },
  ];

  return (
    <>
      <CardSliderMoleCule
        cardDetail={data}
        headerTitle="Offer & Discount"></CardSliderMoleCule>
    </>
  );
};
