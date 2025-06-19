import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Swing, Chase} from 'react-native-animated-spinkit';
import {AreaMapper} from '../../../Utilities/CustomMethods';
import {AppText} from '../../Elements/AppText';
import {size} from '../../../Prefrences/Prefrences';
import {ColumnFlexScreenlayout} from '../../../Layout/ScreenLayout/ColumnFlexScreenLayout';

interface SamagraLoaderProps {}

export const SamagraLoader: React.FC<SamagraLoaderProps> = ({}) => {
  const {colors} = useTheme();

  return (
    <ColumnFlexScreenlayout>
      <Chase color={colors.primary} size={size.iconSize.large}></Chase>
    </ColumnFlexScreenlayout>
  );
};
