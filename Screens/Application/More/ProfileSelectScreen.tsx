import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {TextComponet} from '../../../Components/Elements/TextComponet';
interface ProfileSelectScreenProps {}

export const ProfileSelectScreen: React.FC<ProfileSelectScreenProps> = ({}) => {
  const {colors} = useTheme();

  return (
    <>
      <TextComponet
        title="Profiles"
        fontVariant="medium"
        fontSizeVariant="display"></TextComponet>
    </>
  );
};
