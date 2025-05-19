import {useTheme} from '@react-navigation/native';
import React from 'react';
import {ItemCategoryCardSlider} from '../../../Components/Layout/ItemCategorySlider';
import {SamagraLoader} from '../../../Components/Sections/ErrorHandling/SamagraLoader';
interface CategoryListScreenProps {}

export const CategoryListScreen: React.FC<CategoryListScreenProps> = ({}) => {
  const {colors} = useTheme();

  return (
    <>
      {/* <ItemCategoryCardSlider size="large"></ItemCategoryCardSlider> */}
      <SamagraLoader></SamagraLoader>
    </>
  );
};
