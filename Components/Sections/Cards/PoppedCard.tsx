import {useTheme} from '@react-navigation/native';

import React, {Children} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {SamagraScaller} from '../../../Utilities/CustomMethods';
interface PoppedCardProps {
  variant: 'large' | 'small';
  title: string;
  comment: string;
  children: React.ReactNode;
  customStyle: ViewStyle;
}

export const PoppedCard: React.FC<PoppedCardProps> = ({
  variant = 'large',
  title,
  comment,
  children,
  customStyle,
}) => {
  const {colors} = useTheme();

  return <View style={[styles.viewContainer, {}]}>{children}</View>;
};

const styles = StyleSheet.create({
  viewContainer: {
    borderWidth: SamagraScaller({
      value: 2,
      scaleBy: 'average',
    }),
    elevation: 1,
  },
});
