import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  createGradientShimmer,
  ShimmerLayout,
} from 'react-native-gradient-shimmer';
import LinearGradient from 'react-native-linear-gradient';
import {PaperProvider} from 'react-native-paper';
import {SamagraScaller} from '../../../../../Utilities/CustomMethods';

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
    <View
      style={[
        ProviderCardSkeletonStyle.cardContainer,
        {
          borderColor: colors.border,
          backgroundColor: colors.card,
        },
      ]}>
      <View style={ProviderCardSkeletonStyle.dataContainer}>
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

        <View style={ProviderCardSkeletonStyle.textContainer}>
          <CustomGradientShimmer
            height={SamagraScaller({
              value: 17,
              scaleBy: 'average',
            })}
            width={SamagraScaller({
              value: 250,
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
          <CustomGradientShimmer
            height={SamagraScaller({
              value: 17,
              scaleBy: 'average',
            })}
            width={SamagraScaller({
              value: 180,
              scaleBy: 'average',
            })}
            style={[
              {
                borderRadius: SamagraScaller({
                  value: 80,
                  scaleBy: 'average',
                }),
                marginTop: SamagraScaller({
                  value: 8,
                  scaleBy: 'average',
                }),
              },
            ]}
          />
          <CustomGradientShimmer
            height={SamagraScaller({
              value: 17,
              scaleBy: 'average',
            })}
            width={SamagraScaller({
              value: 100,
              scaleBy: 'average',
            })}
            style={[
              {
                borderRadius: SamagraScaller({
                  value: 80,
                  scaleBy: 'average',
                }),
                marginTop: SamagraScaller({
                  value: 8,
                  scaleBy: 'average',
                }),
              },
            ]}
          />
        </View>
      </View>
      {/* <View style={[ProviderCardSkeletonStyle.actionContainer]}>
        <CustomGradientShimmer
          height={SamagraScaller({
            value: 40,
            scaleBy: 'average',
          })}
          width={SamagraScaller({
            value: 170,
            scaleBy: 'average',
          })}
          style={[
            {
              borderRadius: SamagraScaller({
                value: 80,
                scaleBy: 'average',
              }),
              marginTop: SamagraScaller({
                value: 8,
                scaleBy: 'average',
              }),
            },
          ]}
        />
        <CustomGradientShimmer
          height={SamagraScaller({
            value: 40,
            scaleBy: 'average',
          })}
          width={SamagraScaller({
            value: 170,
            scaleBy: 'average',
          })}
          style={[
            {
              borderRadius: SamagraScaller({
                value: 80,
                scaleBy: 'average',
              }),
              marginTop: SamagraScaller({
                value: 8,
                scaleBy: 'average',
              }),
            },
          ]}
        />
      </View> */}
    </View>
  );
};

const ProviderCardSkeletonStyle = StyleSheet.create({
  cardContainer: {
    borderWidth: SamagraScaller({
      value: 0.4,
      scaleBy: 'average',
    }),
    margin: SamagraScaller({
      value: 8,
      scaleBy: 'average',
    }),
    borderRadius: SamagraScaller({
      value: 8,
      scaleBy: 'average',
    }),
    elevation: 1,
    shadowOffset: {
      height: 5,
      width: 0.1,
    },
  },
  dataContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: SamagraScaller({
      value: 16,
      scaleBy: 'average',
    }),
    marginVertical: SamagraScaller({
      value: 16,
      scaleBy: 'average',
    }),
    paddingHorizontal: SamagraScaller({
      value: 16,
      scaleBy: 'average',
    }),
  },
  textContainer: {
    marginHorizontal: SamagraScaller({
      value: 16,
      scaleBy: 'average',
    }),
    lineHeight: SamagraScaller({
      value: 22,
      scaleBy: 'average',
    }),
  },
  image: {
    height: SamagraScaller({
      value: 65,
      scaleBy: 'average',
    }),
    width: SamagraScaller({
      value: 65,
      scaleBy: 'average',
    }),
    borderRadius: SamagraScaller({
      value: 80,
      scaleBy: 'average',
    }),
    borderWidth: SamagraScaller({
      value: 2,
      scaleBy: 'average',
    }),
  },

  actionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: SamagraScaller({
      value: 8,
      scaleBy: 'average',
    }),
  },

  action: {
    flex: 0.4,
  },
});
