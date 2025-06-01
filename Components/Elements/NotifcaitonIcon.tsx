import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Logos} from '../../Assets/SVG/Exports/Exports';
import {AreaMapper} from '../../Utilities/CustomMethods';

interface NotifcaitonIconProps {}

export const NotifcaitonIcon: React.FC<NotifcaitonIconProps> = ({}) => {
  const {"BellRing": Icon, BellRingTail} = Logos;

  return (
    <TouchableOpacity
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: AreaMapper({
          value: 3,
          scaleBy: 'average',
        }),
      }}>
      <Icon
        width={AreaMapper({
          value: 20,
          scaleBy: 'average',
        })}
        height={AreaMapper({
          value: 20,
          scaleBy: 'average',
        })}></Icon>
      <BellRingTail></BellRingTail>
    </TouchableOpacity>
  );
};
