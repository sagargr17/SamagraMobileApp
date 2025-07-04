import {useTheme} from '@react-navigation/native';
import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {createGradientShimmer} from 'react-native-gradient-shimmer';
import LinearGradient from 'react-native-linear-gradient';
import {AreaMapper} from '../../../Utilities/CustomMethods';
import {FlatList} from 'react-native-gesture-handler';

interface ProviderCardSkeletonProps {
  numberOfCard?: number;
}

export const ProviderCardSkeleton: React.FC<ProviderCardSkeletonProps> = ({
  numberOfCard = 7,
}) => {
  const {colors} = useTheme();
  const CustomGradientShimmer = createGradientShimmer({
    backgroundColor: 'rgb(227, 225, 225)',
    highlightColor: 'rgb(255, 255, 255)',
    LinearGradientComponent: LinearGradient,
  });

  const card = (
    <View
      // key={Math.random()}
      style={[
        ProviderCardSkeletonStyle.cardContainer,
        {
          borderColor: colors.border,
          backgroundColor: colors.card,
        },
      ]}>
      <View style={ProviderCardSkeletonStyle.dataContainer}>
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

        <View style={ProviderCardSkeletonStyle.textContainer}>
          <CustomGradientShimmer
            height={AreaMapper({
              value: 17,
              scaleBy: 'average',
            })}
            width={AreaMapper({
              value: 250,
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
          <CustomGradientShimmer
            height={AreaMapper({
              value: 17,
              scaleBy: 'average',
            })}
            width={AreaMapper({
              value: 180,
              scaleBy: 'average',
            })}
            style={[
              {
                borderRadius: AreaMapper({
                  value: 80,
                  scaleBy: 'average',
                }),
                marginTop: AreaMapper({
                  value: 8,
                  scaleBy: 'average',
                }),
              },
            ]}
          />
          <CustomGradientShimmer
            height={AreaMapper({
              value: 17,
              scaleBy: 'average',
            })}
            width={AreaMapper({
              value: 100,
              scaleBy: 'average',
            })}
            style={[
              {
                borderRadius: AreaMapper({
                  value: 80,
                  scaleBy: 'average',
                }),
                marginTop: AreaMapper({
                  value: 8,
                  scaleBy: 'average',
                }),
              },
            ]}
          />
        </View>
      </View>
      <View style={[ProviderCardSkeletonStyle.actionContainer]}>
        <CustomGradientShimmer
          height={AreaMapper({
            value: 40,
            scaleBy: 'average',
          })}
          width={AreaMapper({
            value: 170,
            scaleBy: 'average',
          })}
          style={[
            {
              borderRadius: AreaMapper({
                value: 80,
                scaleBy: 'average',
              }),
              marginTop: AreaMapper({
                value: 8,
                scaleBy: 'average',
              }),
            },
          ]}
        />
        <CustomGradientShimmer
          height={AreaMapper({
            value: 40,
            scaleBy: 'average',
          })}
          width={AreaMapper({
            value: 170,
            scaleBy: 'average',
          })}
          style={[
            {
              borderRadius: AreaMapper({
                value: 80,
                scaleBy: 'average',
              }),
              marginTop: AreaMapper({
                value: 8,
                scaleBy: 'average',
              }),
            },
          ]}
        />
      </View>
    </View>
  );

  return (
    <FlatList
      data={Array(numberOfCard).fill(numberOfCard)}
      renderItem={() => card}></FlatList>
  );
};

const ProviderCardSkeletonStyle = StyleSheet.create({
  cardContainer: {
    borderWidth: AreaMapper({
      value: 0.4,
      scaleBy: 'average',
    }),
    margin: AreaMapper({
      value: 8,
      scaleBy: 'average',
    }),
    borderRadius: AreaMapper({
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
    marginTop: AreaMapper({
      value: 16,
      scaleBy: 'average',
    }),
    marginVertical: AreaMapper({
      value: 16,
      scaleBy: 'average',
    }),
    paddingHorizontal: AreaMapper({
      value: 16,
      scaleBy: 'average',
    }),
  },
  textContainer: {
    marginHorizontal: AreaMapper({
      value: 16,
      scaleBy: 'average',
    }),
    lineHeight: AreaMapper({
      value: 22,
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
