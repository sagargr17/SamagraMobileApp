import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {SkeletonBone} from '../SkeletonBone';
import {size} from '../../../Prefrences/Prefrences';
interface CardVerticleListSkeletonProps {}

export const CardVerticleListSkeleton: React.FC<
  CardVerticleListSkeletonProps
> = ({}) => {
  const {colors} = useTheme();

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft: 2,
      }}>
      {Array(10)
        .fill(5)
        .map((_, index) => (
          <SkeletonBone
            key={index}
            height={180}
            width={180}
            style={{
              borderRadius: 20,
              marginRight: 11,
              marginTop: index % 2 === 0 ? 0 : size.spacing.xs + 5,
            }}></SkeletonBone>
        ))}
    </View>
  );
};
