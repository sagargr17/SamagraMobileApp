import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

import {useTheme} from '@react-navigation/native';
import {AppText} from '../Elements/AppText';
interface BasicCardProps {
  item: Array<{
    name: string;
    fontVariant: 'medium' | 'regular';
  }>;
  containerStyle: ViewStyle;
}

export const BasicCard: React.FC<BasicCardProps> = ({item}) => {
  const {colors} = useTheme();

  return (
    <View style={styles.wrapperStyle}>
      {item.map(item => (
        <AppText
          fontSizeVariant="title"
          title={item.name}
          fontVariant={item.fontVariant}></AppText>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapperStyle: {
    backgroundColor: 'pink',
    flex: 1,
    padding: 10,
  },
});
