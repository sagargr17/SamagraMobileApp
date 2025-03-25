import React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';

interface AppButtonProps extends React.ComponentProps<typeof Button> {
  color?: 'primary' | 'secondary' | 'light' | 'danger';
}

const AppButton = ({
  children,
  color = 'primary',
  mode,
  onPress,
  ...props
}: AppButtonProps) => {
  return (
    <Button
      textColor={mode === 'outlined' ? 'black' : 'white'}
      mode={mode}
      style={[styles.button, mode !== 'outlined' && intent[color]]}
      contentStyle={styles.buttonContent}
      onPress={onPress}
      {...props}>
      {children}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    fontSize: 16,
    borderRadius: 50,
  },
  buttonContent: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 24,
    paddingRight: 24,
  },
});

const intent = StyleSheet.create({
  primary: {
    backgroundColor: '#1FD0C9',
  },
  danger: {
    backgroundColor: '#EC4B3C',
  },
  light: {
    //
  },
  secondary: {
    //
  },
});

export default AppButton;
