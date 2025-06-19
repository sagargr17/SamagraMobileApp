import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {SkeletonBone} from '../SkeletonBone';
interface TextSkeletonProps {
  width?: number;
}

export const TextSkeleton: React.FC<TextSkeletonProps> = ({width = 100}) => {
  const {colors} = useTheme();

  return (
    <SkeletonBone
      height={10}
      width={width}
      style={{
        borderRadius: 8,
      }}></SkeletonBone>
  );
};
