import {useTheme} from '@react-navigation/native';
import {View} from 'moti';
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ViewProps,
  ViewStyle,
  Text,
} from 'react-native';
interface RowFlexLayoutProps<ItemT> extends ViewProps {
  children: React.ReactNode;
  customStyle?: ViewStyle;
  isTouchEnable?: boolean;
  elevationStyle?: ViewStyle;
  onPressed?: () => void;
}

export const RowFlexLayout = <ItemT,>({
  children,
  customStyle,
  elevationStyle,
  isTouchEnable = false,
  onPressed,
  ...rest
}: RowFlexLayoutProps<ItemT>) => {
  const {colors} = useTheme();

  return (
    <>
      {isTouchEnable ? (
        <TouchableOpacity
          onPress={onPressed}
          style={[styles.wrapper, customStyle, elevationStyle]}
          {...rest}>
          {children}
        </TouchableOpacity>
      ) : (
        <View style={[styles.wrapper, customStyle, elevationStyle]} {...rest}>
          {children}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
  },
});
