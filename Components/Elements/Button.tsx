import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {SamagraScaller} from '../../Utilities/CustomMethods';
import {useTheme} from '@react-navigation/native';
import {MyDarkTheme, MyTheme} from '../../Prefrences/Prefrences';

interface AppButtonProps extends React.ComponentProps<typeof Button> {
  color?: 'primary' | 'secondary' | 'light' | 'danger';
}

const AppButton = ({
  children,
  color = 'primary',
  mode,
  disabled,
  onPress,
  ...props
}: AppButtonProps) => {
  const {dark} = useTheme();
  return (
    <Button
      textColor={mode === 'outlined' ? 'black' : 'white'}
      mode={mode}
      labelStyle={[
        styles.label,
        {
          fontSize: SamagraScaller({value: 16, scaleBy: 'width'}),
        },
      ]}
      style={[
        styles.button,
        mode !== 'outlined' && intent[color],
        disabled && styles.disabled,
      ]}
      buttonColor={dark ? MyDarkTheme.colors.card : MyTheme.colors.card}
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
    fontFamily: 'Poopins-Bold',
  },
  buttonContent: {
    paddingTop: heightPercentageToDP(1.2),
    paddingBottom: heightPercentageToDP(1.2),
  },
  disabled: {
    opacity: 0.5,
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
    backgroundColor: '#a9bafd',
  },
  secondary: {
    backgroundColor: '#43C769',
  },
});

export default AppButton;
