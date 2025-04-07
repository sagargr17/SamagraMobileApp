import React from 'react';
import {Text, View} from 'react-native';
import {ProviderCard} from '../../../Components/Sections/ProviderCard';

interface MoreScreenProps {}

export const MoreScreen: React.FC<MoreScreenProps> = ({}) => {
  return (
    <View>
      <ProviderCard></ProviderCard>
    </View>
  );
};
