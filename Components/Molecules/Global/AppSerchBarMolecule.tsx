import React, {useState} from 'react';
import {View, ViewStyle} from 'react-native';
import {Logos} from '../../../Assets/SVG/Exports/Exports';
import {Icon, IconButton, Searchbar} from 'react-native-paper';
import {AreaMapper} from '../../../Utilities/CustomMethods';
import {useTheme} from '@react-navigation/native';
import {size} from '../../../Prefrences/Prefrences';

interface SerchBarMoleculeProps {
  onPress?: () => void;
  placeHolder?: string;
  style?: ViewStyle;
}

export const SerchBarMolecule: React.FC<SerchBarMoleculeProps> = ({
  onPress,
  placeHolder,
  style,
}) => {
  const {fonts} = useTheme();
  const [searchedItem, setSearchedItem] = useState<string>('');
  const {colors} = useTheme();
  return (
    <Searchbar
      onFocus={onPress}
      style={[
        {
          backgroundColor: colors.background,
          fontFamily: fonts.regular.fontFamily,
          fontSize: size.textVariants.regular.fontSize,
          // flex: ,
        },
        style,
        {
          borderRadius: size.borderRadius.m,
          borderWidth: size.borderWidth.m,
          borderColor: '#DBE0E5',
        },
      ]}
      inputStyle={{
        minHeight: 0,
        fontFamily: fonts.regular.fontFamily,
        fontSize: AreaMapper({
          value: 15,
          scaleBy: 'height',
        }),
        lineHeight: 22,
      }}
      placeholderTextColor={'#C0C0C0'}
      placeholder={placeHolder ? placeHolder : 'Search Anything...'}
      onChangeText={strokes => {
        setSearchedItem(strokes);
      }}
      value={searchedItem}
    />
  );
};
