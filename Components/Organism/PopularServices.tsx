import {useTheme} from '@react-navigation/native';
import React from 'react';
import {Alert} from 'react-native';
import {Logos} from '../../Assets/SVG/Exports/Exports';
import {cardDetail, CardSlider} from '../Molecules/Cards/CardSlider';
import {size} from '../../Prefrences/Prefrences';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {AreaMapper} from '../../Utilities/CustomMethods';
interface PopularSevicesProps {}

export const PopularSevices: React.FC<PopularSevicesProps> = ({}) => {
  const {colors} = useTheme();
  const {Electric, HouseKeeping, Plumbing} = Logos;

  const data: cardDetail[] = [
    {
      title: 'Home Cleaning',
      frame: (
        <HouseKeeping
          height={AreaMapper({value: 240, scaleBy: 'height'})}
          width={AreaMapper({value: 240, scaleBy: 'width'})}></HouseKeeping>
      ),
      onPress: () => Alert.alert('<<'),
      comment: '4.8 · 1200+ reviews',
    },

    {
      title: 'Plumbing',
      frame: (
        <Plumbing
          height={AreaMapper({value: 240, scaleBy: 'height'})}
          width={AreaMapper({value: 240, scaleBy: 'width'})}></Plumbing>
      ),
      onPress: () => Alert.alert('<<'),
      comment: '4.8 · 1200+ reviews',
    },
    {
      title: 'Wiring',
      frame: (
        <Electric
          height={AreaMapper({value: 240, scaleBy: 'height'})}
          width={AreaMapper({value: 240, scaleBy: 'width'})}></Electric>
      ),
      onPress: () => Alert.alert('<<'),
      comment: '4.8 · 1200+ reviews',
    },
  ];
  return (
    <CardSlider cardDetail={data} headerTitle="Popular Services"></CardSlider>
  );
};
