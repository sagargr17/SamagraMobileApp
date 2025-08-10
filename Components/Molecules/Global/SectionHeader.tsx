import React from 'react';
import {TextStyle, View} from 'react-native';
import {AppText} from '../../Elements/AppText';
import {AreaMapper} from '../../../Utilities/CustomMethods';
import {Icon, IconButton} from 'react-native-paper';

interface SectionHeaderProps {
  title: string;
  isIcon: boolean;
  onPress: () => void;
  style?: TextStyle;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  isIcon = true,
  title,
  onPress,
  style,
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
      <AppText
        customStyle={style}
        fontVariant="bold"
        fontSizeVariant={'display'}
        title={title}></AppText>

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
