import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {TextSkeleton} from './TextSkeleton';
import {SkeletonBone} from '../SkeletonBone';
import {size} from '../../../Prefrences/Prefrences';
import {Spacer} from '../../Elements/Spacer';
interface FormSkeletonProps {
  FormListNumber?: number;
}

export const FormSkeleton: React.FC<FormSkeletonProps> = ({
  FormListNumber = 3,
}) => {
  const {colors} = useTheme();

  return (
    <View>
      {Array(FormListNumber)
        .fill(null)
        .map(({_, index}) => (
          <View
            key={index}
            style={{
              marginBottom: size.spacing.xs,
            }}>
            <TextSkeleton width={20}></TextSkeleton>
            <Spacer></Spacer>
            <SkeletonBone
              height={50}
              width={380}
              style={{
                borderRadius: size.spacing.xs,
              }}></SkeletonBone>
          </View>
        ))}
    </View>
  );
};
