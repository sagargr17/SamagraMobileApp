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
  const {colors, fonts} = useTheme();

  return (
    <Button
      textColor={mode === 'outlined' ? '#2A56FE' : 'white'}
      mode={mode}
      labelStyle={[
        styles.label,
        {
          fontSize: SamagraScaller({value: 16, scaleBy: 'width'}),
          fontFamily: fonts.medium.fontFamily,
        },
      ]}
      style={[
        styles.button,
        disabled && styles.disabled,
        {
          borderColor: mode === 'outlined' ? '#2A56FE' : colors.border,
        },
      ]}
      buttonColor={mode === 'outlined' ? colors.background : colors.primary}
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
    marginVertical: SamagraScaller({
      value: 10,
      scaleBy: 'average',
    }),
    // backgroundColor: 'pink',
  },
  label: {
    fontFamily: 'Poopins-Bold',
  },
  buttonContent: {
    paddingTop: SamagraScaller({
      value: 4,
      scaleBy: 'average',
    }),
    paddingBottom: SamagraScaller({
      value: 4,
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
