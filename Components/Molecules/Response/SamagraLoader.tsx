import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Chase } from 'react-native-animated-spinkit';
import { ColumnFlexScreenlayout } from '../../../Layout/ScreenLayout/ColumnFlexScreenLayout';
import { size } from '../../../Prefrences/Prefrences';

interface SamagraLoaderProps {
  iconSize?: number;
}

export const SamagraLoader: React.FC<SamagraLoaderProps> = ({
  iconSize = size.iconSize.medium,
}) => {
  const {colors} = useTheme();

  return (
    <ColumnFlexScreenlayout>
      <Chase color={colors.primary} size={iconSize}></Chase>
    </ColumnFlexScreenlayout>
  );
};
