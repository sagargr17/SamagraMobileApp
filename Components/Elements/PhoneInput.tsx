import {useTheme} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Logos} from '../../Assets/SVG/Exports/Exports';
import {AreaMapper} from '../../Utilities/CustomMethods';
import {size} from '../../Prefrences/Prefrences';
import {AppText} from './AppText';

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
  const [borderColor, setBorderColor] = useState<string>(colors.border);
  const inputRef: any = useRef(null);

  return (
    <View>
      {label && (
        <AppText fontVariant="medium" fontSizeVariant="regular" title={label} />
      )}
      <View
        style={[
          styles.wrapper,
          error && styles.wrapperError,
          {
            backgroundColor: '#E8EDF5',
            borderWidth: size.borderWidth.xs,
            borderRadius: size.borderRadius?.xs,
            marginVertical: size.spacing.xxs,
            borderColor: borderColor,
          },
        ]}>
        <NepalFlag height={size.iconSize.large} width={size.iconSize.large} />
        <AppText fontVariant="medium" fontSizeVariant="regular" title="+977" />
        <View style={styles.textWrapper}>
          <TextInput
            onFocus={() => setBorderColor(colors.primary)}
            onBlur={() => setBorderColor(colors.border)}
            keyboardType="numeric"
            inputMode="numeric"
            style={[
              styles.input,
              {
                fontFamily: fonts.regular.fontFamily,
                lineHeight: 22,
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
