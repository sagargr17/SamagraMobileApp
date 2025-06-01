import React from 'react';
import {TextStyle, View} from 'react-native';
import {TextComponet} from '../Elements/TextComponet';
import {AreaMapper} from '../../Utilities/CustomMethods';
import {Icon, IconButton} from 'react-native-paper';

interface SectionHeaderProps {
  titleFontSize: number;
  titleHeight: number;
  title: string;
  isIcon: boolean;
  onPress: () => void;
  style?:TextStyle
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  titleFontSize = 18,
  titleHeight = 30,
  isIcon = true,
  title,
  onPress,
  style
}) => {
  return (
    <View
      onTouchEnd={onPress}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <TextComponet
        customStyle={style}
        fontVariant="bold"
        fontSize={titleFontSize}
        lineHeight={titleHeight}
        title={title}></TextComponet>

      {isIcon ? (
        <Icon
          size={AreaMapper({
            value: 30,
            scaleBy: 'height',
          })}
          source={'chevron-right'}></Icon>
      ) : null}
    </View>
  );
};
