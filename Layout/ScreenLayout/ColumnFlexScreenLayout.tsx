import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
interface FlatProps {
  // icon: any;
  // title: string;
  children: React.ReactNode;
}

export const ViewScreen: React.FC<FlatProps> = ({children}) => {
  const {colors} = useTheme();

  return <View style={styles.wrapper}>{children}</View>;
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
});
