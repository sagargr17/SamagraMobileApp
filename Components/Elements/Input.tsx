import {useTheme} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon, TextInput} from 'react-native-paper';
import {AreaMapper} from '../../Utilities/CustomMethods';
import {TextComponet} from './TextComponet';
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

  // useEffect(() => {
  //   if (inputRef.current) {
  //     inputRef.current.focus();
  //   }
  // }, []);

  return (
    <View style={styles.inputContainer}>
      <View
        style={[
          styles.inputWrapper,
          {backgroundColor: colors.background, borderColor: colors.border},
          !!error && styles.inputError,
          {
            marginVertical: AreaMapper({
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
              height: AreaMapper({
                value: height,
                scaleBy: 'average',
              }),
              borderRadius: AreaMapper({
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
            fontSize: AreaMapper({
              value: 14,
              scaleBy: 'height',
            }),
          }}
          right={<Icon size={20} source={'eye-outline'} color="red"></Icon>}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: AreaMapper({
      value: 0,
      scaleBy: 'average',
    }),
  },
  inputLabel: {
    marginBottom: AreaMapper({
      value: 2,
      scaleBy: 'average',
    }),
  },
  inputWrapper: {
    overflow: 'hidden',

    borderColor: '#C0C0C0',
    borderRadius: AreaMapper({
      value: 8,
      scaleBy: 'height',
    }),
    paddingHorizontal: AreaMapper({
      value: 1,
      scaleBy: 'width',
    }),
  },
  input: {
    marginVertical: AreaMapper({
      value: 2,
      scaleBy: 'height',
    }),
    borderRadius: AreaMapper({
      value: 18,
      scaleBy: 'height',
    }),
    borderWidth: AreaMapper({
      value: 0.001,
      scaleBy: 'height',
    }),
  },
  inputError: {
    borderColor: 'red',
  },
});
