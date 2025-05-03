import React from 'react';
import {SamagraScaller} from '../../Utilities/CustomMethods';
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
      height={SamagraScaller({
        value: 65,
        scaleBy: 'average',
      })}
      width={SamagraScaller({
        value: 65,
        scaleBy: 'average',
      })}
      style={[
        {
          borderRadius: SamagraScaller({
            value: 80,
            scaleBy: 'average',
          }),
        },
      ]}
    />
  );
};
