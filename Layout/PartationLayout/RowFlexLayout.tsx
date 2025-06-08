import {useTheme} from '@react-navigation/native';
import {View} from 'moti';
import React from 'react';
import {
  StyleSheet,
  StyleSheetProperties,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native';
interface RowFlexLayoutProps<ItemT> extends ViewProps {
  children: React.ReactNode;
  customStyle?: ViewStyle;
  elevationStyle?: ViewStyle;
}

export const RowFlexLayout = <ItemT,>({
  children,
  customStyle,
  elevationStyle,
  ...rest
}: RowFlexLayoutProps<ItemT>) => {
  const {colors} = useTheme();

  return (
    <View style={[styles.wrapper, customStyle, elevationStyle]} {...rest}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
