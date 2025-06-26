import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';
interface ReceivedSuccessOrderScreenProps {}

export const ReceivedSuccessOrderScreen: React.FC<
  ReceivedSuccessOrderScreenProps
> = ({}) => {
  const {colors} = useTheme();

  return (
    <>
      <Text>Received SuccessFull order </Text>
    </>
  );
};
