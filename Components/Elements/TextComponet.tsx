import {useTheme} from '@react-navigation/native';
import React from 'react';
import {Text} from 'react-native-paper';
import {AreaMapper} from '../../Utilities/CustomMethods';
import {TextStyle} from 'react-native';
import {size} from '../../Prefrences/Prefrences';

interface TextComponetProps {
  title: string;
  fontVariant?: 'regular' | 'medium' | 'bold' | 'heavy';
  fontSizeVariant?: 'regular' | 'title' | 'caption' | 'display';
  customStyle?: TextStyle;
}

export const TextComponet: React.FC<TextComponetProps> = ({
  title,
  fontVariant = 'regular',
  fontSizeVariant = 'regular',
  customStyle,
}) => {
  const {colors, fonts} = useTheme();

  return (
    <Text
      style={[
        {
          fontFamily: fonts[fontVariant].fontFamily,
          fontWeight: fonts[fontVariant].fontWeight,
          fontSize: size.textVariants[fontSizeVariant]?.fontSize,
          color: colors.text,
          lineHeight: size.textVariants[fontSizeVariant]?.lineHeight,
        },
        customStyle,
      ]}>
      {title}
    </Text>
  );
};
