import {useTheme} from '@react-navigation/native';
import React from 'react';
import {ItemCategoryCardSlider} from '../../../Components/Organism/ItemCategorySlider';
import {SamagraLoader} from '../../../Components/Elements/SamagraLoader';
import {Text} from 'react-native';
interface CategoryListScreenProps {}

export const CategoryListScreen: React.FC<CategoryListScreenProps> = ({}) => {
  const {colors} = useTheme();

  return (
    <>
      {/* <ItemCategoryCardSlider size="large"></ItemCategoryCardSlider> */}
      {/* <SamagraLoader></SamagraLoader> */}
      <Text>asdj;askd;lds</Text>
    </>
  );
};
