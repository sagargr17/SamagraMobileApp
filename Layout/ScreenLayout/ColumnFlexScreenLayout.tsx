import React from 'react';
import {StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {size} from '../../Prefrences/Prefrences';
interface FlatProps {
  // icon: any;
  // title: string;
  children: React.ReactNode;
  style?: ViewStyle;
}

export const ColumnFlexScreenlayout: React.FC<FlatProps> = ({
  children,
  style,
}) => {
  const {colors} = useTheme();

  return <View style={[styles.wrapper, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: size.spacing.m,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
