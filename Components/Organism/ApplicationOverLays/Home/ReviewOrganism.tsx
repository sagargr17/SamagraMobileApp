import React from 'react';
import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {cardDetail, CardSliderMoleCule} from '../../../Molecules/Cards/CardSliderMolecule';
import {Logos} from '../../../../Assets/SVG/Exports/Exports';
import {AreaMapper, titleRange} from '../../../../Utilities/CustomMethods';
interface OfferDiscountProps {}

export const Reviews: React.FC<OfferDiscountProps> = ({}) => {
  const {colors} = useTheme();
  const {Rating1, Rating2, Rating3} = Logos;

  const data: cardDetail[] = [
    {
      title: titleRange('Cleaning'),
      frame: (
        <Rating1
          height={AreaMapper({value: 160, scaleBy: 'height'})}
          width={AreaMapper({value: 160, scaleBy: 'width'})}
        />
      ),
      onPress: () => Alert.alert('<<'),
      comment: '319 Reviews',
    },

    {
      title: 'Massage',
      frame: (
        <Rating2
          height={AreaMapper({value: 160, scaleBy: 'height'})}
          width={AreaMapper({value: 160, scaleBy: 'width'})}
        />
      ),
      onPress: () => Alert.alert('<<'),
      comment: '20 Reviews',
    },
    {
      title: 'Car Wash',
      frame: (
        <Rating3
          height={AreaMapper({value: 160, scaleBy: 'height'})}
          width={AreaMapper({value: 160, scaleBy: 'width'})}
        />
      ),
      onPress: () => Alert.alert('<<'),
      comment: '1992 Reviews',
    },
  ];

  return (
    <>
      <CardSliderMoleCule cardDetail={data} headerTitle="Review's"></CardSliderMoleCule>
    </>
  );
};
