import React, {useState} from 'react';
import {View, ViewStyle} from 'react-native';
import {Logos} from '../../../Assets/SVG/Exports/Exports';
import {Icon, IconButton, Searchbar} from 'react-native-paper';
import {AreaMapper} from '../../../Utilities/CustomMethods';
import {useTheme} from '@react-navigation/native';
import {size} from '../../../Prefrences/Prefrences';

interface SerchBarProps {
  onPress: (searchedItem: string) => void;
  placeHolder?: string;
  style?: ViewStyle;
}

export const AppSerchBar: React.FC<SerchBarProps> = ({
  onPress,
  placeHolder,
  style,
}) => {
  const {fonts} = useTheme();
  const [searchedItem, setSearchedItem] = useState<string>('');
  const {colors} = useTheme();
  return (
    <Searchbar
      style={[
        {
          backgroundColor: '#EFF1F3',
          fontFamily: fonts.regular.fontFamily,
          fontSize: size.textVariants.regular.fontSize,
          flex: 0.2,
          height: size.spacing.xxl,
        },
        style,
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
