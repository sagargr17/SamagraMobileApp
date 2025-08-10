import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {ListCardSkeleton} from './ListCardSkeleton';
import {RowFlexLayout} from '../../../Layout/PartationLayout/RowFlexLayout';
import {size} from '../../../Prefrences/Prefrences';
import {SkeletonBone} from '../SkeletonBone';
import {Spacer} from '../../Elements/Spacer';
import {ScrollView} from 'react-native-gesture-handler';
interface MoreLandingSkeletonProps {}

export const MoreLandingSkeleton: React.FC<MoreLandingSkeletonProps> = ({}) => {
  const {colors} = useTheme();

  const smallCard = (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        marginBottom: 30,
        backgroundColor: colors.card,
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          margin: 10,
        }}>
        <SkeletonBone
          height={50}
          width={80}
          style={{
            borderRadius: 10,
          }}></SkeletonBone>
        <SkeletonBone
          width={50}
          height={20}
          style={{
            borderRadius: 10,
            marginLeft: 10,
            marginTop: 10,
          }}></SkeletonBone>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          margin: 10,
        }}>
        <SkeletonBone
          height={50}
          width={80}
          style={{
            borderRadius: 10,
          }}></SkeletonBone>
        <SkeletonBone
          width={50}
          height={20}
          style={{
            borderRadius: 10,
            marginLeft: 10,
            marginTop: 10,
          }}></SkeletonBone>
      </View>
    </View>
  );

  return (
    <View
      style={{
        paddingHorizontal: size.spacing.xs,
      }}>
      <ListCardSkeleton numberOfList={1} numberOfText={2}></ListCardSkeleton>
      <Spacer height={10}></Spacer>
      {smallCard}
      {smallCard}
      {/* <Spacer height={10}></Spacer> */}
      <ListCardSkeleton numberOfList={3} numberOfText={2}></ListCardSkeleton>
      <Spacer height={20}></Spacer>
      <SkeletonBone
        width={380}
        height={50}
        style={{
          borderRadius: size.borderRadius.full,
          marginHorizontal: size.spacing.xs,
          marginBottom: size.spacing.xxs,
        }}></SkeletonBone>
    </View>
  );
};
