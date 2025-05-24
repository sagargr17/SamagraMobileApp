import {useTheme} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {TextInput} from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {TextComponet} from './TextComponet';
import {SamagraScaller} from '../../Utilities/CustomMethods';
// import {EvilIcons} from 'react-native-vector-icons/';

interface InputProps extends React.ComponentProps<typeof TextInput> {
  label?: string;
  error?: boolean;
  height?: number;
  lef?: any;
  right?: any;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  value,
  placeholder,
  onChangeText,
  height = 54,
  left = null,
  right,
  ...props
}) => {
  const {colors, fonts} = useTheme();
  const inputRef: any = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <View style={styles.inputContainer}>
      <View
        style={[
          styles.inputWrapper,
          {backgroundColor: colors.background, borderColor: colors.border},
          !!error && styles.inputError,
          {
            marginVertical: SamagraScaller({
              value: 2,
              scaleBy: 'average',
            }),
          },
        ]}>
        {label && (
          <TextComponet
            title={label}
            fontVariant="regular"
            lineHeight={24}
            fontSize={16}></TextComponet>
        )}
        <TextInput
          ref={inputRef}
          placeholder={placeholder}
          mode="outlined"
          outlineStyle={{
            borderWidth: 1,
          }}
          activeOutlineColor={colors.primary}
          placeholderTextColor={'#808080'}
          tvParallaxMagnification={100}
          style={[
            styles.input,
            {
              backgroundColor: colors.background,

              fontFamily: fonts.regular.fontFamily,
              height: SamagraScaller({
                value: height,
                scaleBy: 'average',
              }),
              borderRadius: SamagraScaller({
                value: 8,
                scaleBy: 'average',
              }),

              borderColor: colors.border,
            },
          ]}
          value={value}
          onChangeText={onChangeText}
          {...props}
          secureTextEntry={label === 'Password' ? true : false}
          left={left}
          contentStyle={{
            minHeight: 0,
            fontFamily: fonts.regular.fontFamily,
            fontSize: SamagraScaller({
              value: 14,
              scaleBy: 'height',
            }),
          }}
          right={right}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: SamagraScaller({
      value: 0,
      scaleBy: 'average',
    }),
  },
  inputLabel: {
    marginBottom: SamagraScaller({
      value: 2,
      scaleBy: 'average',
    }),
  },
  inputWrapper: {
    overflow: 'hidden',

    borderColor: '#C0C0C0',
    borderRadius: SamagraScaller({
      value: 8,
      scaleBy: 'height',
    }),
    paddingHorizontal: SamagraScaller({
      value: 1,
      scaleBy: 'width',
    }),
  },
  input: {
    marginVertical: SamagraScaller({
      value: 2,
      scaleBy: 'height',
    }),
    borderRadius: SamagraScaller({
      value: 18,
      scaleBy: 'height',
    }),
    borderWidth: SamagraScaller({
      value: 0.001,
      scaleBy: 'height',
    }),
  },
  inputError: {
    borderColor: 'red',
  },
});
