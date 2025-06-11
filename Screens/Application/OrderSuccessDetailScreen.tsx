import React from 'react';
import {Button, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {Icon} from 'react-native-paper';
import {TextComponet} from '../../Components/Elements/TextComponet';
interface OrderSuccessDetailScreenProps {}

export const OrderSuccessDetailScreen: React.FC<
  OrderSuccessDetailScreenProps
> = ({}) => {
  const {colors} = useTheme();
  const navigation = useNavigation<any>();

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }}>
      <Icon source={'thumb-up'} size={50} color={colors.primary}></Icon>
      <TextComponet
        customStyle={{
          color: colors.primary,
        }}
        fontSizeVariant="display"
        fontVariant="bold"
        title={`Order Complted SuccessFully`}></TextComponet>
      <TextComponet
        fontSizeVariant="display"
        fontVariant="bold"
        title={`Please Follow Up ervice Provider`}></TextComponet>
      <Button
        title="Back To SHoping"
        onPress={() => {
          navigation.navigate('BottomTab', {
            screen: 'ServiceScreen',
          });
        }}></Button>
    </View>
  );
};
