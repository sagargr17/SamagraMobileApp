import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {TextInput} from 'react-native-paper';
import {heightPercentageToDP} from 'react-native-responsive-screen';

interface InputProps extends React.ComponentProps<typeof TextInput> {
  label?: string;
  error?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  value,
  placeholder,
  onChangeText,
  ...props
}) => {
  const {colors} = useTheme();
  return (
    <View>
      {label && (
        <Text style={[styles.inputLabel, {color: colors.text}]}>{label}</Text>
      )}
      <View
        style={[
          styles.inputWrapper,
          {backgroundColor: colors.background, borderColor: colors.border},
          !!error && styles.inputError,
        ]}>
        <TextInput
          placeholder={placeholder}
          mode="outlined"
          outlineColor="transparent"
          activeOutlineColor="transparent"
          underlineColor="transparent"
          activeUnderlineColor="transparent"
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          {...props}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputLabel: {
    fontSize: heightPercentageToDP(1.8),
    marginBottom: heightPercentageToDP(1),
  },
  inputWrapper: {
    overflow: 'hidden',
    borderWidth: 1,
    borderRadius: heightPercentageToDP(1),
  },
  input: {
    // backgroundColor: '#FDFDFD',
  },
  inputError: {
    // borderColor: 'red',
  },
});
