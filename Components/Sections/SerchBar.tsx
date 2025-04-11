import React from 'react';
import {View} from 'react-native';
import {Logos} from '../../Assets/SVG/Exports/Exports';

interface SerchBarProps {}

export const SerchBar: React.FC<SerchBarProps> = ({}) => {
  const {SearchIcon} = Logos;

  return (
    <View
      style={{
        borderRadius: 36,
        display: 'flex',
        backgroundColor: 'orage',
      }}>
      <SearchIcon height={20} width={20}></SearchIcon>
    </View>
  );
};
