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
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  value,
  placeholder,
  onChangeText,
  height = 50,
  left = null,
  ...props
}) => {
  const {colors, fonts} = useTheme();
  const inputRef: any = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []); // Empty dependency array ensures it runs only once after the initial render

  return (
    <View>
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
            lineHeight={19}
            fontSize={18}></TextComponet>
        )}
        <TextInput
          ref={inputRef}
          placeholder={placeholder}
          mode="outlined"
          outlineColor={colors.border}
          activeOutlineColor={colors.border}
          underlineColor="transparent"
          placeholderTextColor={'#808080'}
          tvParallaxMagnification={100}
          activeUnderlineColor="transparent"
          style={[
            styles.input,
            {
              backgroundColor: '#F6F7F7',
              borderColor: colors.border,
              color: 'orange',
              fontFamily: fonts.regular.fontFamily,
              height: SamagraScaller({
                value: height,
                scaleBy: 'average',
              }),
              fontWeight: '100',
            },
          ]}
          value={value}
          onChangeText={onChangeText}
          {...props}
          secureTextEntry={label === 'Password' ? true : false}
          left={left}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
      value: 4,
      scaleBy: 'height',
    }),
    borderRadius: SamagraScaller({
      value: 15,
      scaleBy: 'height',
    }),
  },
  inputError: {
    borderColor: 'red',
  },
});
