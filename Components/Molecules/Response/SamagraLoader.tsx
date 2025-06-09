import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Swing, Chase} from 'react-native-animated-spinkit';
import {AreaMapper} from '../../../Utilities/CustomMethods';
import {TextComponet} from '../../Elements/TextComponet';
import {size} from '../../../Prefrences/Prefrences';

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
        size={size.iconSize.xlarge}></Chase>
      <TextComponet
        customStyle={{
          marginTop: size.spacing.xxs,
        }}
        title="Loading.."
        fontSizeVariant={'regular'}
        fontVariant="regular"></TextComponet>
    </View>
  );
};
