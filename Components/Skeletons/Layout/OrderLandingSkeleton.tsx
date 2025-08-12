import {useTheme} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import {AppHeaderSkeleton} from '../Components/AppHeaderSkeleton';
import {FormSkeleton} from '../Components/FormSkeleton';
import {SearchBarSkeleton} from '../Components/SearchBarSkeleton';
import {CardHorizontalSkeletonList} from './CardHorizontalSkeletonList';
import {size} from '../../../Prefrences/Prefrences';
import {SpacerElement} from '../../Elements/SpacerElement';
import {SkeletonBone} from '../SkeletonBone';
import {TextSkeleton} from '../Components/TextSkeleton';
interface OrderLandingSkeletonProps {}

export const OrderLandingSkeleton: React.FC<
  OrderLandingSkeletonProps
> = ({}) => {
  const {colors} = useTheme();

  const form = Array();

  return (
    <>
      <AppHeaderSkeleton></AppHeaderSkeleton>
      <View
        style={[
          {
            position: 'absolute',
            bottom: 0,
            width: '100%',
            borderRadius: size.borderRadius.full,
            paddingHorizontal: size.spacing.xs,
            paddingTop: size.spacing.xxl,
            borderColor: colors.border,
          },
        ]}>
        <TextSkeleton height={15} width={100}></TextSkeleton>
        <SpacerElement height={20}></SpacerElement>
        <CardHorizontalSkeletonList
          listNumber={4}
          height={85}
          width={80}></CardHorizontalSkeletonList>
        <SpacerElement height={20}></SpacerElement>
        <FormSkeleton></FormSkeleton>
        <SpacerElement height={20}></SpacerElement>
        <SkeletonBone
          width={380}
          height={50}
          style={{
            borderRadius: size.borderRadius.full,
          }}></SkeletonBone>
        <SpacerElement height={20}></SpacerElement>
      </View>
    </>
  );
};
