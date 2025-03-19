import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Text} from 'react-native';

const PhoneInput = () => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.icon}>F</Text>
      <Text style={styles.number}>+977</Text>
      <View style={styles.textWrapper}>
        <TextInput placeholder="987654321" style={styles.input} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    marginTop: 20,
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
