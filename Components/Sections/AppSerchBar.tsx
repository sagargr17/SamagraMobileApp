import React, {useState} from 'react';
import {View} from 'react-native';
import {Logos} from '../../Assets/SVG/Exports/Exports';
import {Searchbar} from 'react-native-paper';
import {AreaMapper} from '../../Utilities/CustomMethods';
import {useTheme} from '@react-navigation/native';

interface SerchBarProps {
  onPress: () => void;
}

export const AppSerchBar: React.FC<SerchBarProps> = ({}) => {
  const {SearchIcon} = Logos;
  const {fonts} = useTheme();
  const [searchedItem, setSearchedItem] = useState<string>('');

  return (
    <Searchbar
      style={{
        backgroundColor: '#EFF1F3',
        fontFamily: fonts.regular.fontFamily,
        marginHorizontal: AreaMapper({
          scaleBy: 'average',
          value: 16,
        }),
        fontSize: AreaMapper({
          value: 2,
          scaleBy: 'average',
        }),

        flex: 0.2,
        height: AreaMapper({
          value: 54,
          scaleBy: 'height',
        }),
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
