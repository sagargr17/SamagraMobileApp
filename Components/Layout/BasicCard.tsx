import React from 'react';
import {StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';

import {useTheme} from '@react-navigation/native';
import {TextComponet} from '../Elements/TextComponet';
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
    <View
      style={{
        backgroundColor: 'pink',
        flex: 1,
        padding: 10,
      }}>
      {item.map(item => (
        <TextComponet
          title={item.name}
          fontVariant={item.fontVariant}></TextComponet>
      ))}
    </View>
  );
};
