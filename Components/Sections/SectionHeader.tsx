import React from 'react';
import {View} from 'react-native';
import {TextComponet} from '../Elements/TextComponet';
import {SamagraScaller} from '../../Utilities/CustomMethods';
import {IconButton} from 'react-native-paper';

interface SectionHeaderProps {
  titleFontSize: number;
  titleHeight: number;
  title: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  titleFontSize = 18,
  titleHeight = 30,
}) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <TextComponet
        fontVariant="bold"
        fontSize={titleFontSize}
        lineHeight={titleHeight}
        title={'Category'}></TextComponet>
      <IconButton
        size={SamagraScaller({
          value: 30,
          scaleBy: 'height',
        })}
        icon={'chevron-right'}
        style={{
          margin: 0,
          padding: 0,
          borderRadius: 0,
          height: SamagraScaller({
            value: 25,
            scaleBy: 'average',
          }),
          bottom: 2,
        }}></IconButton>
    </View>
  );
};
