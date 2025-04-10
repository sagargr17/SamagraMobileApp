import React from 'react';
import {AppHeader} from '../../../Components/Layout/AppHeader';
import {ServiceCategoryCardSlider} from '../../../Components/Layout/ServiceCategorySlider';
import {Spacer} from '../../../Components/Elements/Spacer';

interface HomeLandingScreenProps {}

export const HomeLandingScreen: React.FC<HomeLandingScreenProps> = ({}) => {
  return (
    <>
      <AppHeader currentPosition="relative"></AppHeader>
      <Spacer></Spacer>
      <ServiceCategoryCardSlider></ServiceCategoryCardSlider>
    </>
  );
};
