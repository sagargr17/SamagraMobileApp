import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { size } from '../../Prefrences/Prefrences';
import { showLoader } from '../../StateManagement/Error&loadingHandle/LoaderStateSlice';
import { useAppDispatch } from '../../StateManagement/hooks';

interface AppButtonProps extends React.ComponentProps<typeof Button> {
  color?: 'primary' | 'secondary' | 'light' | 'danger';
  showLoader?: boolean;
  customStyle?: any;
}

const AppButton = ({
  children,
  color = 'primary',
  mode,
  disabled,
  onPress,
  showLoader: showLoaderFn = false,
  ...props
}: AppButtonProps) => {
  const {colors, fonts} = useTheme();
  const dispatch = useAppDispatch();

  return (
    <Button
      rippleColor={colors.card}
      mode={mode}
      textColor={mode === 'outlined' ? colors.text : 'white'}
      labelStyle={[
        styles.label,
        {
          fontFamily: fonts.medium.fontFamily,
          fontSize: size.textVariants.regular.fontSize,
          lineHeight: size.textVariants.regular.lineHeight,
        },
      ]}
      buttonColor={
        mode === 'outlined'
          ? colors.card
          : color === 'primary'
          ? colors.primary
          : colors.notification
      }
      contentStyle={[styles.buttonContent]}
      onPress={onPress}
      onPressIn={() => {
        showLoaderFn ? dispatch(showLoader()) : null;
      }}
      {...props}>
      {children}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: size.borderRadius.full,
  },
  label: {
    fontSize: 16,
  },
  buttonContent: {
    paddingVertical: size.spacing.xxs,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default AppButton;
