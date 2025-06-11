import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {useAppDispatch} from '../../StateManagement/hooks';
import {AreaMapper} from '../../Utilities/CustomMethods';
import {size} from '../../Prefrences/Prefrences';

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
  const dispatch = useAppDispatch();
  return (
    <Button
      rippleColor={'#ddfcd9'}
      mode={mode}
      textColor={mode === 'outlined' ? colors.text : 'white'}
      labelStyle={[
        styles.label,
        {
          fontFamily: fonts.medium.fontFamily,
          fontSize:14
        },
      ]}
      // style={[styles.button, disabled && styles.disabled]}
      buttonColor={
        mode === 'outlined'
          ? colors.card
          : color === 'primary'
          ? colors.primary
          : colors.notification
      }
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
    marginVertical: AreaMapper({
      value: 10,
      scaleBy: 'average',
    }),
  },
  label: {
    fontSize: 16,
  },
  buttonContent: {
    paddingVertical: AreaMapper({
      value: 3,
      scaleBy: 'average',
    }),
  },
  disabled: {
    opacity: 0.5,
  },
});

export default AppButton;
