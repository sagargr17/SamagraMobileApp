import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {RowFlexLayout} from '../../../Layout/PartationLayout/RowFlexLayout';
import {SkeletonBone} from '../SkeletonBone';
interface CardHorizontalSkeletonListProps {}

export const CardHorizontalSkeletonList: React.FC<CardHorizontalSkeletonListProps> = ({}) => {
  const {colors} = useTheme();

  return (
    <RowFlexLayout>
      {Array(5)
        .fill(5)
        .map((_, index) => (
          <SkeletonBone
            key={index}
            height={120}
            width={120}
            style={{
              borderRadius: 20,
              marginRight: 10,
            }}></SkeletonBone>
        ))}
    </RowFlexLayout>
  );
};
