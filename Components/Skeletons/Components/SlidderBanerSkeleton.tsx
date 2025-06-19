import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {RowFlexLayout} from '../../../Layout/PartationLayout/RowFlexLayout';
import {SkeletonBone} from '../SkeletonBone';
interface SlidderBannerSkeletonProps {}

export const SlidderBannerSkeleton: React.FC<
  SlidderBannerSkeletonProps
> = ({}) => {
  const {colors} = useTheme();

  return (
    <RowFlexLayout customStyle={{}}>
      <SkeletonBone
        height={140}
        width={250}
        style={{
          borderRadius: 10,
          marginRight: 10,
        }}></SkeletonBone>
      <SkeletonBone
        height={140}
        width={350}
        style={{
          borderRadius: 10,
        }}></SkeletonBone>
    </RowFlexLayout>
  );
};
