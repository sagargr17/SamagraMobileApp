import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Logos} from '../../Assets/SVG/Exports/Exports';
import {SamagraScaller} from '../../Utilities/CustomMethods';

interface NotifcaitonIconProps {}

export const NotifcaitonIcon: React.FC<NotifcaitonIconProps> = ({}) => {
  const {BellRing, BellRingTail} = Logos;

  return (
    <TouchableOpacity
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: SamagraScaller({
          value: 3,
          scaleBy: 'average',
        }),
      }}>
      <BellRing
        width={SamagraScaller({
          value: 20,
          scaleBy: 'average',
        })}
        height={SamagraScaller({
          value: 20,
          scaleBy: 'average',
        })}></BellRing>
      <BellRingTail></BellRingTail>
    </TouchableOpacity>
  );
};
