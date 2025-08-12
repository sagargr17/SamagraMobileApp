import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Logos} from '../../Assets/SVG/Exports/Exports';
import {AreaMapper} from '../../Utilities/CustomMethods';
import {size} from '../../Prefrences/Prefrences';
import {TouchableRipple} from 'react-native-paper';
import {View} from 'moti';
import {useTheme} from '@react-navigation/native';

interface NotificationIconElementProps {}

export const NotificationIconElement: React.FC<NotificationIconElementProps> = ({}) => {
  const {BellRing: Icon, BellRingTail} = Logos;
  const {colors} = useTheme();

  return (
    <TouchableOpacity
      style={[
        {
          borderWidth: size.borderWidth.xs,
          borderRadius: size.borderRadius.full,
          padding: size.spacing.xxs,
          alignItems: 'center',
          borderColor: colors.border,
        },
      ]}>
      <View
        style={{
          alignItems: 'center',
          padding: size.spacing.xxs,
        }}>
        <Icon height={size.iconSize.small}></Icon>
        <BellRingTail></BellRingTail>
      </View>
    </TouchableOpacity>
  );
};
