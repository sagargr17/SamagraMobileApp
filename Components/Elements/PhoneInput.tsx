import {useTheme} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Logos} from '../../Assets/SVG/Exports/Exports';
import {AreaMapper} from '../../Utilities/CustomMethods';

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
  const inputRef: any = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []); // Empty dependency array ensures it runs only once after the initial render

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
              lineHeight: AreaMapper({
                value: 22,
                scaleBy: 'height',
              }),
            },
          ]}>
          +977
        </Text>
        <View style={styles.textWrapper}>
          <TextInput
            ref={inputRef}
            keyboardType="numeric"
            inputMode="numeric"
            style={[
              styles.input,
              {
                fontFamily: fonts.regular.fontFamily,
                lineHeight: AreaMapper({
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
    fontSize: AreaMapper({
      value: 16,
      scaleBy: 'width',
    }),
    marginBottom: heightPercentageToDP(0.5),
    lineHeight: AreaMapper({
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
