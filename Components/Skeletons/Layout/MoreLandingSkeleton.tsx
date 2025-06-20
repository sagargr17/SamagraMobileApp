import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {ListCardSkeleton} from './ListCardSkeleton';
import {RowFlexLayout} from '../../../Layout/PartationLayout/RowFlexLayout';
import {size} from '../../../Prefrences/Prefrences';
import {SkeletonBone} from '../SkeletonBone';
import {Spacer} from '../../Elements/Spacer';
interface MoreLandingSkeletonProps {}

export const MoreLandingSkeleton: React.FC<MoreLandingSkeletonProps> = ({}) => {
  const {colors} = useTheme();

  return (
    <>
      <ListCardSkeleton numberOfList={1} numberOfText={2}></ListCardSkeleton>
      <Spacer height={10}></Spacer>
      <RowFlexLayout>
        <ListCardSkeleton numberOfList={2} numberOfText={2}></ListCardSkeleton>
      </RowFlexLayout>
      <RowFlexLayout>
        <Spacer height={10}></Spacer>
        <ListCardSkeleton numberOfList={2} numberOfText={2}></ListCardSkeleton>
      </RowFlexLayout>
      <Spacer height={10}></Spacer>
      <ListCardSkeleton numberOfList={4} numberOfText={2}></ListCardSkeleton>
      <Spacer height={20}></Spacer>
      <SkeletonBone
        width={380}
        height={50}
        style={{
          borderRadius: size.borderRadius.full,
        }}></SkeletonBone>
    </>
  );
};
