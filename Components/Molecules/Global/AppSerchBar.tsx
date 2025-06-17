import React, {useState} from 'react';
import {View} from 'react-native';
import {Logos} from '../../../Assets/SVG/Exports/Exports';
import {Icon, IconButton, Searchbar} from 'react-native-paper';
import {AreaMapper} from '../../../Utilities/CustomMethods';
import {useTheme} from '@react-navigation/native';
import {size} from '../../../Prefrences/Prefrences';

interface SerchBarProps {
  onPress: (searchedItem: string) => void;
}

export const AppSerchBar: React.FC<SerchBarProps> = ({onPress}) => {
  const {fonts} = useTheme();
  const [searchedItem, setSearchedItem] = useState<string>('');
  const {colors} = useTheme();
  return (
    <Searchbar
      style={{
        backgroundColor: '#EFF1F3',
        fontFamily: fonts.regular.fontFamily,
        fontSize: size.textVariants.regular.fontSize,
        flex: 0.2,
        height: size.spacing.xxl,
      }}
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
      placeholder="Search Anything..."
      onChangeText={strokes => {
        setSearchedItem(strokes);
      }}
      value={searchedItem}
    />
  );
};
