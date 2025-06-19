import {useTheme} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import {AppHeaderSkeleton} from '../Components/AppHeaderSkeleton';
import {FormSkeleton} from '../Components/FormSkeleton';
import {SearchBarSkeleton} from '../Components/SearchBarSkeleton';
import {CardHorizontalSkeletonList} from './CardHorizontalSkeletonList';
import {size} from '../../../Prefrences/Prefrences';
import {Spacer} from '../../Elements/Spacer';
import {SkeletonBone} from '../SkeletonBone';
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
            borderTopWidth: 0.5,
            borderColor: colors.border,
          },
        ]}>
        <CardHorizontalSkeletonList
          listNumber={4}
          height={90}
          width={80}></CardHorizontalSkeletonList>
        <Spacer height={20}></Spacer>
        <FormSkeleton></FormSkeleton>
        <Spacer height={20}></Spacer>
        <SkeletonBone
          width={380}
          height={50}
          style={{
            borderRadius: size.borderRadius.full,
          }}></SkeletonBone>
        <Spacer height={20}></Spacer>
      </View>
    </>
  );
};
