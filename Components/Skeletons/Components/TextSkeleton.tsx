import { useTheme } from '@react-navigation/native';
import React from 'react';
import { SkeletonBone } from '../SkeletonBone';
interface TextSkeletonProps {
  width?: number;
  height?: number;
}

export const TextSkeleton: React.FC<TextSkeletonProps> = ({
  width = 100,
  height = 10,
}) => {
  const {colors} = useTheme();

  return (
    <SkeletonBone
      height={height}
      width={width}
      style={{
        borderRadius: 8,
      }}></SkeletonBone>
  );
};
