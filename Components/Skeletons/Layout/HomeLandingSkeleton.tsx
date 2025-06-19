import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { size } from '../../../Prefrences/Prefrences';
import { Spacer } from '../../Elements/Spacer';
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
      <Spacer height={20}></Spacer>
      <SearchBarSkeleton></SearchBarSkeleton>
      <Spacer height={20}></Spacer>
      <SlidderBannerSkeleton></SlidderBannerSkeleton>
      <Spacer height={30}></Spacer>
      <TextSkeleton></TextSkeleton>
      <Spacer height={10}></Spacer>
      <CardHorizontalSkeletonList></CardHorizontalSkeletonList>
      <Spacer height={20}></Spacer>
      <TextSkeleton></TextSkeleton>
      <Spacer height={10}></Spacer>
      <CardVerticleListSkeleton></CardVerticleListSkeleton>
    </View>
  );
};
