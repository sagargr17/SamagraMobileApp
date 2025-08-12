import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { size } from '../../../Prefrences/Prefrences';
import { SpacerElement } from '../../Elements/SpacerElement';
import { AppHeaderSkeleton } from '../Components/AppHeaderSkeleton';
import { SearchBarSkeleton } from '../Components/SearchBarSkeleton';
import { SlidderBannerSkeleton } from '../Components/SlidderBanerSkeleton';
import { TextSkeleton } from '../Components/TextSkeleton';
import { SkeletonBone } from '../SkeletonBone';
import { CardHorizontalSkeletonList } from './CardHorizontalSkeletonList';
import { CardVerticleListSkeleton } from './CardVerticleListSkeleton';
interface HomeLandingSkeletonProps {}

export const HomeLandingSkeleton: React.FC<HomeLandingSkeletonProps> = ({}) => {
  const {colors} = useTheme();

  const text = (
    <SkeletonBone
      height={20}
      width={150}
      style={{
        borderRadius: 8,
      }}></SkeletonBone>
  );



  return (
    <View
      style={{
        paddingHorizontal: size.spacing.xs,
      }}>
      <AppHeaderSkeleton></AppHeaderSkeleton>
      <SpacerElement height={20}></SpacerElement>
      <SearchBarSkeleton></SearchBarSkeleton>
      <SpacerElement height={20}></SpacerElement>
      <SlidderBannerSkeleton></SlidderBannerSkeleton>
      <SpacerElement height={30}></SpacerElement>
      <TextSkeleton></TextSkeleton>
      <SpacerElement height={10}></SpacerElement>
      <CardHorizontalSkeletonList></CardHorizontalSkeletonList>
      <SpacerElement height={20}></SpacerElement>
      <TextSkeleton></TextSkeleton>
      <SpacerElement height={10}></SpacerElement>
      <CardVerticleListSkeleton></CardVerticleListSkeleton>
    </View>
  );
};
