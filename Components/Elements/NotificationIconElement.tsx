import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Logos} from '../../Assets/SVG/Exports/Exports';
import {AreaMapper} from '../../Utilities/CustomMethods';
import {size} from '../../Prefrences/Prefrences';
import {TouchableRipple} from 'react-native-paper';
import {View} from 'moti';
import {useTheme} from '@react-navigation/native';

interface NotificationIconElementProps {}

export const NotificationIconElement: React.FC<
  NotificationIconElementProps
> = ({}) => {
  const {BellRing: Icon, BellRingTail} = Logos;
  const {colors} = useTheme();

  return (
    <TouchableOpacity
      style={[
        {
          borderWidth: size.borderWidth.xs,
          borderRadius: size.borderRadius.full,
          alignItems: 'center',
          paddingHorizontal: size.spacing.s - 2,
          paddingVertical: size.spacing.xs + 3,
          backgroundColor: colors.background,
          borderColor: colors.border,
        },

        size.elevation.s,
      ]}>
      <View
        style={{
          alignItems: 'center',
          padding: size.spacing.xxs,
        }}>
        <Icon height={size.iconSize.xsmall} width={size.iconSize.small}></Icon>
        <BellRingTail></BellRingTail>
      </View>
    </TouchableOpacity>
  );
};
