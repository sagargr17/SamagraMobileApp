import React from 'react';
import {StyleSheet, TextInput, View, Image} from 'react-native';
import {Text} from 'react-native';
import {Logos} from '../../Assets/SVG/Exports/Exports';
import {heightPercentageToDP, widthPercentageToDP} from 'react-native-responsive-screen';

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
  const handleChange = (text: string) => {
    const newText = text.replace(/[^0-9]/g, '');
    onChangeText && onChangeText(newText);
  };
  const {NepalFlag} = Logos;

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.wrapper, error && styles.wrapperError]}>
        <NepalFlag
          height={heightPercentageToDP(5)}
          width={heightPercentageToDP(4)}
        />
        <Text style={styles.number}>+977</Text>
        <View style={styles.textWrapper}>
          <TextInput
            keyboardType="numeric"
            inputMode="numeric"
            placeholder="987654321"
            style={styles.input}
            value={value}
            dataDetectorTypes={'phoneNumber'}
            onChangeText={handleChange}
            {...props}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: heightPercentageToDP(1.8),
    color: '#2D2D2D',
    marginBottom: heightPercentageToDP(1.4),
  },
  wrapper: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#C0C0C0',
    alignItems: 'center',
    gap: widthPercentageToDP(2),
    paddingTop: heightPercentageToDP(1),
    paddingBottom: heightPercentageToDP(1),
    paddingLeft: widthPercentageToDP(4),
    paddingRight: widthPercentageToDP(4),
    borderRadius: heightPercentageToDP(1),
    width: '100%',
    overflow: 'hidden',
  },
  wrapperError: {
    borderColor: 'red',
  },
  number: {
    fontSize: heightPercentageToDP(1.8),
  },
  textWrapper: {
    flex: 1,
  },
  input: {
    fontSize: heightPercentageToDP(1.8),
  },
});

export default PhoneInput;
