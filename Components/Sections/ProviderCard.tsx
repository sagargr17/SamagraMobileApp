import React from 'react';
import {Text, View} from 'react-native';
import {Button, Card} from 'react-native-paper';
import {TextComponet} from '../Elements/TextComponet';
import {SamagraScaller} from '../../Utilities/CustomMethods';

import {
  ShimmerLayout,
  ShimmerLayoutContainerType,
  createGradientShimmer,
  GradientShimmerPropsType,
} from 'react-native-gradient-shimmer';
import LinearGradient from 'react-native-linear-gradient';

// import SkeletonContent from 'react-native-skeleton-content';

interface ProviderCardProps {}

export const ProviderCard: React.FC<ProviderCardProps> = ({}) => {
  const layoutExample: ShimmerLayoutContainerType = {
    content: [
      {
        flexDirection: 'row',
        content: [
          {
            height: 150,
            width: 100,
            marginRight: 16,
          },
          {
            justifyContent: 'space-between',
            content: [
              {
                height: 40,
                width: 250,
              },
              {
                height: 40,
                width: 250,
              },
              {
                height: 40,
                width: 120,
              },
            ],
          },
        ],
      },
      {
        marginTop: 16,
        flexDirection: 'row',
        // gap only works with React Native 0.71 or Expo 48
        columnGap: 16,
        content: [
          {
            width: 100,
            height: 100,
          },
          {
            width: 100,
            height: 100,
          },
          {
            width: 100,
            height: 100,
          },
          {
            width: 100,
            height: 100,
          },
          {
            width: 100,
            height: 100,
          },
        ],
      },
    ],
  };
  return (
    <>
      {/* <SkeletonContent
        containerStyle={{flex: 1, width: 300}}
        isLoading={true}
        layout={[
          {key: 'someId', width: 220, height: 20, marginBottom: 6},
          {key: 'someOtherId', width: 180, height: 20, marginBottom: 6},
        ]}
      /> */}

      {/* <Card
          style={{
            marginHorizontal: SamagraScaller({
              value: 10,
              scaleBy: 'average',
            }),
            backgroundColor: 'white',
            padding: SamagraScaller({
              value: 20,
              scaleBy: 'height',
            }),
          }}>
          <TextComponet
            customStyle={{
              marginBottom: SamagraScaller({
                value: 5,
                scaleBy: 'average',
              }),
            }}
            title={'alslkjkdjlasjdlk'}
            fontVariant="heavy"
            lineHeight={19}
            fontSize={20}></TextComponet>{' '}
          <Card.Content>
            <TextComponet
              customStyle={{
                marginBottom: SamagraScaller({
                  value: 5,
                  scaleBy: 'average',
                }),
              }}
              title={'label'}
              fontVariant="regular"
              lineHeight={19}
              fontSize={16}></TextComponet>
          </Card.Content>
          <Card.Actions>
            <Button
              style={{
                backgroundColor: 'green',
              }}>
              Decline
            </Button>
            <Button>Accept</Button>
          </Card.Actions>
        </Card> */}
      {/* </SkeletonContent> */}
      <View
        style={{
          marginHorizontal: 20,
        }}>
        <Text>Shimmer layout</Text>
        <ShimmerLayout
          LinearGradientComponent={LinearGradient}
          layout={layoutExample}
          defaultShimmerProps={{
            style: {
              borderRadius: 8,
            },
          }}
        />
      </View>
    </>
  );
};
