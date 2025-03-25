import React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

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
      labelStyle={styles.label}
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
    borderRadius: heightPercentageToDP(6),
  },
  label: {
    // TODO: review the difference between hp and native value
    // fontSize: heightPercentageToDP(2),
    fontSize: 16,
  },
  buttonContent: {
    paddingTop: heightPercentageToDP(2),
    paddingBottom: heightPercentageToDP(2),
    paddingLeft: widthPercentageToDP(6),
    paddingRight: widthPercentageToDP(6),
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
