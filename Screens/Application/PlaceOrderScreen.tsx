import React from 'react';
import {Button, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {TextComponet} from '../../Components/Elements/TextComponet';
import {size} from '../../Prefrences/Prefrences';
interface PlaceOrderScreenProps {}

export const PlaceOrderScreen: React.FC<PlaceOrderScreenProps> = ({}) => {
  const {colors} = useTheme();
  const navigation = useNavigation<any>();

  return (
    <>
      <TextComponet
        customStyle={{
          padding: size.spacing.m,
          color: 'orange',
        }}
        fontSizeVariant="display"
        fontVariant="bold"
        title={`Place Order`}></TextComponet>

      <View
        style={{
          padding: size.spacing.m,
        }}>
        <View>
          <TextComponet
            fontSizeVariant="display"
            fontVariant="bold"
            title={`Ram Shrestha`}></TextComponet>
          <TextComponet
            fontSizeVariant="display"
            fontVariant="bold"
            title={`Apple`}></TextComponet>
          <Button
            title="Confirm Order"
            onPress={() => {
              navigation.navigate('ApplicationOverlay', {
                screen: 'OrderSuccessDetailScreen',
              });
            }}></Button>
        </View>
        <View></View>
      </View>
    </>
  );
};
