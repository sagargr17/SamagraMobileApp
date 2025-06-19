import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {RowFlexLayout} from '../../../Layout/PartationLayout/RowFlexLayout';
import {SkeletonBone} from '../SkeletonBone';
interface SearchBarSkeletonProps {}

export const SearchBarSkeleton: React.FC<SearchBarSkeletonProps> = ({}) => {
  const {colors} = useTheme();

  return (
    <RowFlexLayout>
      <SkeletonBone
        height={50}
        width={350}
        style={{
          borderRadius: 40,
        }}></SkeletonBone>
    </RowFlexLayout>
  );
};
