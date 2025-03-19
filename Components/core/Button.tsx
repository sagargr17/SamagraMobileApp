import React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';

interface AppButtonProps extends React.ComponentProps<typeof Button> {}

const AppButton = ({onPress, children, ...props}: AppButtonProps) => {
  return (
    <Button
      textColor="white"
      style={styles.button}
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
    color: 'red',
    backgroundColor: '#1FD0C9',
    borderRadius: 50,
  },
  buttonContent: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 24,
    paddingRight: 24,
  },
});

export default AppButton;
