import {useTheme} from '@react-navigation/native';
import React from 'react';
import {Text, View} from 'react-native';
import {
  createGradientShimmer,
  ShimmerLayout,
} from 'react-native-gradient-shimmer';
import LinearGradient from 'react-native-linear-gradient';

interface ProviderCardSkeletonProps {}

export const ProviderCardSkeleton: React.FC<
  ProviderCardSkeletonProps
> = ({}) => {
  const {colors} = useTheme();
  const CustomGradientShimmer = createGradientShimmer({
    backgroundColor: 'rgb(227, 225, 225)',
    highlightColor: 'rgb(255, 255, 255)',
    LinearGradientComponent: LinearGradient,
  });

  return (
    <>
      <View
        style={{
          marginHorizontal: 20,
        }}>
        <View>
          <CustomGradientShimmer
            height={120}
            width={120}
            style={{
              borderRadius: 60,
              margin: 8,
            }}
          />
        </View>
      </View>
    </>
  );
};
