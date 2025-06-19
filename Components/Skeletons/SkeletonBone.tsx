import React from 'react';
import {AreaMapper} from '../../Utilities/CustomMethods';
import {createGradientShimmer} from 'react-native-gradient-shimmer';
import LinearGradient from 'react-native-linear-gradient';
import {ViewStyle} from 'react-native';

interface SkeletonBoneProp {
  height: number;
  width: number;
  style: ViewStyle;
}

export const SkeletonBone: React.FC<SkeletonBoneProp> = ({
  height,
  width,
  style,
}) => {
  const CustomGradientShimmer = createGradientShimmer({
    backgroundColor: 'rgb(227, 225, 225)',
    highlightColor: 'rgb(255, 255, 255)',
    LinearGradientComponent: LinearGradient,
  });
  return (
    <CustomGradientShimmer
      height={AreaMapper({
        value: height,
        scaleBy: 'average',
      })}
      width={AreaMapper({
        value: width,
        scaleBy: 'average',
      })}
      style={style}
    />
  );
};
