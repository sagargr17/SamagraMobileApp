import React from 'react';
import {TextStyle, View} from 'react-native';
import {AppTextElement} from '../../Elements/AppTextElement';
import {AreaMapper} from '../../../Utilities/CustomMethods';
import {Icon, IconButton} from 'react-native-paper';

interface SectionHeaderMoleculeProps {
  title: string;
  isIcon: boolean;
  onPress: () => void;
  style?: TextStyle;
}

export const SectionHeaderMolecule: React.FC<SectionHeaderMoleculeProps> = ({
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
      <AppTextElement
        customStyle={style}
        fontVariant="bold"
        fontSizeVariant={'headline'}
        title={title}></AppTextElement>

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
