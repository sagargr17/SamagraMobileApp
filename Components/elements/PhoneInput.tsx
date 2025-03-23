import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Text} from 'react-native';

interface PhoneInputProps extends React.ComponentProps<typeof TextInput> {
  label?: string;
  error?: boolean;
}

const PhoneInput = ({
  label,
  value,
  error,
  onChangeText,
  ...props
}: PhoneInputProps) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.wrapper, error && styles.wrapperError]}>
        <Text style={styles.icon}>F</Text>
        <Text style={styles.number}>+977</Text>
        <View style={styles.textWrapper}>
          <TextInput
            placeholder="987654321"
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            {...props}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    color: '#2D2D2D',
    marginBottom: 10,
  },
  wrapper: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#C0C0C0',
    alignItems: 'center',
    gap: 14,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 8,
    width: '100%',
    overflow: 'hidden',
  },
  wrapperError: {
    borderColor: 'red',
  },
  icon: {
    fontSize: 16,
    width: 40,
  },
  number: {
    fontSize: 16,
  },
  textWrapper: {
    flex: 1,
  },
  input: {
    lineHeight: 22,
    fontSize: 16,
  },
});

export default PhoneInput;
