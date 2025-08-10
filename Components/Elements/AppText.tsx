import {useTheme} from '@react-navigation/native';
import React from 'react';
import {Text} from 'react-native-paper';
import {AreaMapper} from '../../Utilities/CustomMethods';
import {TextStyle} from 'react-native';
import {size} from '../../Prefrences/Prefrences';

interface AppTextProps {
  title: string;
  fontVariant?: 'regular' | 'medium' | 'bold' | 'heavy';
  fontSizeVariant?: 'regular' | 'title' | 'caption' | 'display';
  customStyle?: TextStyle;
}

export const AppText: React.FC<AppTextProps> = ({
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
          fontSize: AreaMapper({
            value: size.textVariants[fontSizeVariant]?.fontSize,
            scaleBy: 'height',
          }),
          color: colors.text,
          lineHeight: AreaMapper({
            value: size.textVariants[fontSizeVariant]?.lineHeight,
            scaleBy: 'height',
          }),
        },
        customStyle,
      ]}>
      {title}
    </Text>
  );
};
