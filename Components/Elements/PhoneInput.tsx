import React from 'react';
import {StyleSheet, TextInput, View, Text} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Logos} from '../../Assets/SVG/Exports/Exports';
import {useTheme} from '@react-navigation/native';
import {SamagraScaller} from '../../Utilities/CustomMethods';

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
  const {colors, fonts} = useTheme();

  return (
    <View>
      {label && (
        <Text
          style={[
            styles.label,
            {color: colors.text, fontFamily: fonts.regular.fontFamily},
          ]}>
          {label}
        </Text>
      )}
      <View
        style={[
          styles.wrapper,
          error && styles.wrapperError,
          {backgroundColor: colors.card, borderColor: colors.border},
        ]}>
        <NepalFlag height={heightPercentageToDP(5)} />
        <Text
          style={[
            styles.number,
            {
              color: colors.text,
              fontFamily: fonts.regular.fontFamily,
              lineHeight: SamagraScaller({
                value: 22,
                scaleBy: 'height',
              }),
            },
          ]}>
          +977
        </Text>
        <View style={styles.textWrapper}>
          <TextInput
            keyboardType="numeric"
            inputMode="numeric"
            placeholder="Phone Number"
            style={[
              styles.input,
              {
                fontFamily: fonts.regular.fontFamily,
                lineHeight: SamagraScaller({
                  value: 22,
                  scaleBy: 'height',
                }),
              },
            ]}
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
    fontSize: SamagraScaller({
      value: 16,
      scaleBy: 'width',
    }),
    marginBottom: heightPercentageToDP(0.5),
    lineHeight: SamagraScaller({
      value: 19,
      scaleBy: 'height',
    }),
  },
  wrapper: {
    flexDirection: 'row',
    borderWidth: 1,
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
