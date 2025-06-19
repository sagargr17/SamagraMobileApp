import {useTheme} from '@react-navigation/native';
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {createGradientShimmer} from 'react-native-gradient-shimmer';
import LinearGradient from 'react-native-linear-gradient';
import {AreaMapper} from '../../Utilities/CustomMethods';
import {size} from '../../Prefrences/Prefrences';

interface ListSkeletonProps {
  isElevated?: boolean;
  numberOfList: number;
  numberOfText?: number;
}

export const ListCardSkeleton: React.FC<ListSkeletonProps> = ({
  isElevated = false,
  numberOfList,
  numberOfText = 2,
}) => {
  const {colors} = useTheme();
  const CustomGradientShimmer = createGradientShimmer({
    backgroundColor: 'rgb(227, 225, 225)',
    highlightColor: 'rgb(255, 255, 255)',
    LinearGradientComponent: LinearGradient,
  });

  const width = [230, 180, 150, 100, 20];

  const SkeletonCard = (
    <View
      style={[
        {
          borderColor: colors.text,
          backgroundColor: colors.card,
          borderRadius: size.borderRadius.m,
          marginBottom: size.spacing.xs,
          padding: size.spacing.xxs,
        },
        isElevated ? size.elevation.l : null,
      ]}>
      <View style={ProviderCardSkeletonStyle.dataContainer}>
        {/* It is a Image  */}
        <CustomGradientShimmer
          height={AreaMapper({
            value: 100,
            scaleBy: 'average',
          })}
          width={AreaMapper({
            value: 105,
            scaleBy: 'average',
          })}
          style={[
            {
              borderRadius: AreaMapper({
                value: size.borderRadius.m,
                scaleBy: 'average',
              }),
            },
          ]}
        />
        {/* It is a List Items */}
        <View style={ProviderCardSkeletonStyle.textContainer}>
          <FlatList
            data={Array(numberOfText).fill(Number)}
            renderItem={({index}) => (
              <View key={index}>
                <CustomGradientShimmer
                  height={AreaMapper({
                    value: 17,
                    scaleBy: 'average',
                  })}
                  width={AreaMapper({
                    value: width[index],
                    scaleBy: 'average',
                  })}
                  style={[
                    {
                      borderRadius: AreaMapper({
                        value: 80,
                        scaleBy: 'average',
                      }),
                      marginTop: size.spacing.xs,
                    },
                  ]}
                />
              </View>
            )}></FlatList>
        </View>
      </View>
    </View>
  );

  return (
    <FlatList
      data={Array(numberOfList).fill(numberOfList)}
      renderItem={({index}) => (
        <View key={index}>{SkeletonCard}</View>
      )}></FlatList>
  );
};

const ProviderCardSkeletonStyle = StyleSheet.create({
  dataContainer: {
    display: 'flex',
    flexDirection: 'row',
    // alignItems: 'flex-start',
    // marginTop: AreaMapper({
    //   value: 16,
    //   scaleBy: 'average',
    // }),
    marginVertical: AreaMapper({
      value: 16,
      scaleBy: 'average',
    }),

    paddingHorizontal: AreaMapper({
      value: 16,
      scaleBy: 'average',
    }),
    alignItems: 'center',
  },
  textContainer: {
    marginHorizontal: AreaMapper({
      value: 16,
      scaleBy: 'average',
    }),
  },
  image: {
    height: AreaMapper({
      value: 65,
      scaleBy: 'average',
    }),
    width: AreaMapper({
      value: 65,
      scaleBy: 'average',
    }),
    borderRadius: AreaMapper({
      value: 80,
      scaleBy: 'average',
    }),
    borderWidth: AreaMapper({
      value: 2,
      scaleBy: 'average',
    }),
  },

  actionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: AreaMapper({
      value: 8,
      scaleBy: 'average',
    }),
  },

  action: {
    flex: 0.4,
  },
});
