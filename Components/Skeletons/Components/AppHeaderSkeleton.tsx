import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {RowFlexLayout} from '../../../Layout/PartationLayout/RowFlexLayout';
import {SkeletonBone} from '../SkeletonBone';
interface AppHeaderSkeletonProps {}

export const AppHeaderSkeleton: React.FC<AppHeaderSkeletonProps> = ({}) => {
  const {colors} = useTheme();

  return (
    <RowFlexLayout
      customStyle={{
        marginVertical: 10,
      }}>
      <SkeletonBone
        height={50}
        width={50}
        style={{
          borderRadius: '50%',
        }}></SkeletonBone>
      <SkeletonBone
        height={50}
        width={250}
        style={{
          borderRadius: 45,
        }}></SkeletonBone>
      <SkeletonBone
        height={50}
        width={50}
        style={{
          borderRadius: '50%',
        }}></SkeletonBone>
    </RowFlexLayout>
  );
};
