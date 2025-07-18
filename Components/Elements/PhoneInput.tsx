import {useTheme} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Logos} from '../../Assets/SVG/Exports/Exports';
import {size} from '../../Prefrences/Prefrences';
import {AreaMapper} from '../../Utilities/CustomMethods';
import {AppText} from './AppText';
import {heightPercentageToDP} from 'react-native-responsive-screen';

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
                fontFamily: fonts.medium.fontFamily,
                lineHeight: heightPercentageToDP(4.5),
                fontSize: size.textVariants.regular.fontSize,
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
    marginBottom: AreaMapper({value: 0.5, scaleBy: 'height'}),
    lineHeight: AreaMapper({
      value: 19,
      scaleBy: 'height',
    }),
  },
  wrapper: {
    flexDirection: 'row',
    borderWidth: 1,
    alignItems: 'center',
    gap: 2,
    paddingTop: AreaMapper({value: 1, scaleBy: 'height'}),
    paddingBottom: AreaMapper({value: 1, scaleBy: 'height'}),
    paddingLeft: AreaMapper({value: 4, scaleBy: 'height'}),
    paddingRight: AreaMapper({value: 4, scaleBy: 'height'}),
    borderRadius: AreaMapper({value: 1, scaleBy: 'height'}),
    width: '100%',
    overflow: 'hidden',
  },
  wrapperError: {
    borderColor: 'red',
  },
  number: {
    fontSize: AreaMapper({value: 1.8, scaleBy: 'height'}),
  },
  textWrapper: {
    flex: 1,
  },
  input: {
    fontSize: AreaMapper({value: 1.8, scaleBy: 'height'}),
  },
});

export default PhoneInput;
