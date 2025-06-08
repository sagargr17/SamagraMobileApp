import React from 'react';
import {AreaMapper} from '../../Utilities/CustomMethods';
import {createGradientShimmer} from 'react-native-gradient-shimmer';
import LinearGradient from 'react-native-linear-gradient';

interface SerchBarSkeletonnProps {}

export const SerchBarSkeletonn: React.FC<SerchBarSkeletonnProps> = ({}) => {
  const CustomGradientShimmer = createGradientShimmer({
    backgroundColor: 'rgb(227, 225, 225)',
    highlightColor: 'rgb(255, 255, 255)',
    LinearGradientComponent: LinearGradient,
  });
  return (
    <CustomGradientShimmer
      height={AreaMapper({
        value: 65,
        scaleBy: 'average',
      })}
      width={AreaMapper({
        value: 65,
        scaleBy: 'average',
      })}
      style={[
        {
          borderRadius: AreaMapper({
            value: 80,
            scaleBy: 'average',
          }),
        },
      ]}
    />
  );
};
