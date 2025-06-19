import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {SkeletonBone} from '../SkeletonBone';
interface TextSkeletonProps {}

export const TextSkeleton: React.FC<TextSkeletonProps> = ({}) => {
  const {colors} = useTheme();

  return (
    <SkeletonBone
      height={20}
      width={100}
      style={{
        borderRadius: 8,
      }}></SkeletonBone>
  );
};
