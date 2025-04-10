import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {SamagraScaller} from '../../Utilities/CustomMethods';
import {useTheme} from '@react-navigation/native';
import {MyDarkTheme, MyTheme} from '../../Prefrences/Prefrences';

interface AppButtonProps extends React.ComponentProps<typeof Button> {
  color?: 'primary' | 'secondary' | 'light' | 'danger';
  customStyle?: any;
}

const AppButton = ({
  children,
  color = 'primary',
  mode,
  disabled,
  onPress,
  ...props
}: AppButtonProps) => {
  const {colors, fonts} = useTheme();
  const {customStyle} = props;

  return (
    <Button
      rippleColor={colors.primary}
      mode={mode}
      textColor={mode === 'outlined' ? colors.text : 'white'}
      labelStyle={[
        styles.label,
        {
          fontSize: SamagraScaller({value: 16, scaleBy: 'width'}),
          fontFamily: fonts.medium.fontFamily,
        },
      ]}
      style={[styles.button, disabled && styles.disabled]}
      buttonColor={mode === 'outlined' ? colors.card : colors.primary}
      contentStyle={[styles.buttonContent]}
      onPress={onPress}
      {...props}>
      {children}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: heightPercentageToDP(6),
    marginVertical: SamagraScaller({
      value: 10,
      scaleBy: 'average',
    }),
  },
  label: {
    fontFamily: 'Poopins-Bold',
  },
  buttonContent: {
    paddingVertical: SamagraScaller({
      value: 3,
      scaleBy: 'average',
    }),
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
