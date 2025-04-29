import {useTheme} from '@react-navigation/native';
import React from 'react';
import {Text} from 'react-native-paper';
import {SamagraScaller} from '../../Utilities/CustomMethods';
import { TextStyle } from 'react-native';


interface TextComponetProps {
  title: string;
  fontVariant: 'regular' | 'medium' | 'bold' | 'heavy';
  lineHeight?: number;
  fontSize?: number;
  customStyle?: TextStyle;
}

export const TextComponet: React.FC<TextComponetProps> = ({
  title,
  fontVariant,
  lineHeight,
  fontSize,
  customStyle,
}) => {
  const {colors, fonts} = useTheme();
  const font = fonts[fontVariant];

  return (
    <Text
      style={[
        {
          fontFamily: font.fontFamily,
          fontSize: SamagraScaller({
            value: fontSize ? fontSize : 16,
            scaleBy: 'height',
          }),
          color: colors.text,
          lineHeight: lineHeight
            ? SamagraScaller({
                value: lineHeight ? lineHeight : 16,
                scaleBy: 'average',
              })
            : SamagraScaller({
                value: 19,
                scaleBy: 'average',
              }),
        },
        customStyle,
      ]}>
      {title}
    </Text>
  );
};
