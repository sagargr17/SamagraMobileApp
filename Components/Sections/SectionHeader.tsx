import React from 'react';
import {View} from 'react-native';
import {TextComponet} from '../Elements/TextComponet';
import {SamagraScaller} from '../../Utilities/CustomMethods';
import {Icon, IconButton} from 'react-native-paper';

interface SectionHeaderProps {
  titleFontSize: number;
  titleHeight: number;
  title: string;
  isIcon: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  titleFontSize = 18,
  titleHeight = 30,
  isIcon = true,
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

      {isIcon ? (
        <Icon
          size={SamagraScaller({
            value: 30,
            scaleBy: 'height',
          })}
          source={'chevron-right'}></Icon>
      ) : null}
    </View>
  );
};
