import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {RowFlexLayout} from '../../../Layout/PartationLayout/RowFlexLayout';
import {SkeletonBone} from '../SkeletonBone';
interface CardHorizontalSkeletonListProps {
  height?: number;
  width?: number;
  listNumber?: number;
}

export const CardHorizontalSkeletonList: React.FC<
  CardHorizontalSkeletonListProps
> = ({height = 120, width = 120, listNumber = 5}) => {
  const {colors} = useTheme();

  return (
    <RowFlexLayout>
      {Array(listNumber)
        .fill(listNumber)
        .map((_, index) => (
          <SkeletonBone
            key={index}
            height={height}
            width={width}
            style={{
              borderRadius: 20,
              marginRight: 10,
            }}></SkeletonBone>
        ))}
    </RowFlexLayout>
  );
};
