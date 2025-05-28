import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Swing, Chase} from 'react-native-animated-spinkit';
import {SamagraScaller} from '../../../Utilities/CustomMethods';
import {TextComponet} from '../../Elements/TextComponet';

interface SamagraLoaderProps {}

export const SamagraLoader: React.FC<SamagraLoaderProps> = ({}) => {
  const {colors} = useTheme();

  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#f7f7f7',
        flex: 1,
      }}>
      <Chase
        color={colors.primary}
        size={SamagraScaller({
          value: 50,
          scaleBy: 'average',
        })}></Chase>
      <TextComponet
        customStyle={{
          marginTop: SamagraScaller({
            value: 20,
            scaleBy: 'height',
          }),
          opacity: 0.8,
        }}
        title="Loading"
        fontSize={18}
        lineHeight={28}
        fontVariant="regular"></TextComponet>
    </View>
  );
};
