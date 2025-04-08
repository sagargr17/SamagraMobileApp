import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {ProviderCard} from '../../../Components/Sections/ProviderCard';

interface MoreScreenProps {}

export const MoreScreen: React.FC<MoreScreenProps> = ({}) => {
  return (
    <ScrollView>
      <Text>This is More screen</Text>
    </ScrollView>
  );
};
