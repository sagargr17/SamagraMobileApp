import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {TextInput} from 'react-native-paper';
import {AreaMapper} from '../../../Utilities/CustomMethods';
import {AppTextElement} from '../../Elements/AppTextElement';
// import AntDesign from '@expo/vector-icons/AntDesign';

interface DropdownMoleculeProps {
  labelTitle?: string;
  data: Array<{label: string; value: string}>;
}

export const DropdownMolecule: React.FC<DropdownMoleculeProps> = ({
  labelTitle: label,
  data,
}) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const {colors, fonts} = useTheme();

  return (
    <View style={styles.container}>
      {label && (
        <AppTextElement
          customStyle={{
            marginBottom: AreaMapper({
              value: 5,
              scaleBy: 'average',
            }),
          }}
          title={label}
          fontVariant="regular"
          fontSizeVariant={'regular'}></AppTextElement>
      )}
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: colors.border}]}
        placeholderStyle={[
          styles.placeholderStyle,
          {
            fontFamily: fonts.regular.fontFamily,
          },
        ]}
        selectedTextStyle={[
          styles.selectedTextStyle,
          {
            fontFamily: fonts.regular.fontFamily,
          },
        ]}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search={false}
        maxHeight={AreaMapper({
          value: 150,
          scaleBy: 'average',
        })}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
        }}
        itemTextStyle={{
          fontFamily: fonts.regular.fontFamily,
          margin: 0,
          padding: 0,
        }}
        containerStyle={{
          borderRadius: AreaMapper({
            value: 12,
            scaleBy: 'average',
          }),
          margin: 0,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: AreaMapper({
      value: 4,
      scaleBy: 'average',
    }),
  },
  dropdown: {
    height: AreaMapper({
      value: 56,
      scaleBy: 'height',
    }),
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: AreaMapper({
      value: 10,
      scaleBy: 'height',
    }),
    paddingVertical: AreaMapper({
      value: 10,
      scaleBy: 'height',
    }),
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    // backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    color: 'orange',
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: AreaMapper({
      value: 16,
      scaleBy: 'average',
    }),
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
