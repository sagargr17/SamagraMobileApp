import React, {useState} from 'react';
import {Button, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {AppText} from '../../Components/Elements/AppText';
import {size} from '../../Prefrences/Prefrences';
import {useAppSelector} from '../../StateManagement/hooks';
import {useMutation} from '@apollo/client';
import {createOrderMutation} from '../../GraphQL/Mutation/CheckOutMutation';
import {StringValueNode} from 'graphql';
interface PlaceOrderScreenProps {}

export const PlaceOrderScreen: React.FC<PlaceOrderScreenProps> = ({}) => {
  const {colors} = useTheme();
  const navigation = useNavigation<any>();
  const placeOrderDetails = useAppSelector(state => state.placeOrderParams);
  const user = useAppSelector(state => state.user.user);
  const [createOrderMutationFn, {data, loading, error}] =
    useMutation(createOrderMutation);

  const handleConfirmPlaceItem = async (
    fullName: string,
    address: string,
    phoneNumber: string,
    quantity: number,
    message: string,
    itemID: string,
  ) => {
    console.log(
      'Order Detailsss',
      fullName,
      address,
      phoneNumber,
      quantity,
      message,
      itemID,
    );

    let response = await createOrderMutationFn({
      variables: {
        fullName: fullName,
        address: address,
        phoneNumber: phoneNumber,
        quantity: quantity,
        message: message,
        itemId: itemID,
      },
    });

    console.log('order Details', response);

    if (response.data) {
      navigation.navigate('ApplicationOverlay', {
        screen: 'OrderSuccessDetailScreen',
      });
    }
  };

  return (
    <>
      <AppText
        customStyle={{
          padding: size.spacing.m,
          color: 'orange',
        }}
        fontSizeVariant="display"
        fontVariant="bold"
        title={`Place Order`}></AppText>

      <View
        style={{
          padding: size.spacing.m,
        }}>
        <View>
          <AppText
            fontSizeVariant="title"
            fontVariant="bold"
            title={
              'Name:  ' + placeOrderDetails.itemParams.name
            }></AppText>
          <AppText
            fontSizeVariant="regular"
            fontVariant="bold"
            title={
              'Location: ' + placeOrderDetails.itemParams.location
            }></AppText>
          <AppText
            fontSizeVariant="regular"
            fontVariant="bold"
            title={
              'SHopName: ' + placeOrderDetails.sellerDetails.shopName
            }></AppText>
          <AppText
            fontSizeVariant="regular"
            fontVariant="bold"
            title={
              'Phone Number: ' + placeOrderDetails.sellerDetails.phoneNumber
            }></AppText>

          <Button
            title="Confirm Order"
            onPress={() => {
              handleConfirmPlaceItem(
                user?.username ?? 'sagar',
                user?.location ?? 'Butwal',
                '9841150390',
                Number(placeOrderDetails.orderDetail.orderQuantity),
                placeOrderDetails.orderDetail.message,
                placeOrderDetails.orderDetail.itemID,
              );
            }}></Button>
        </View>
        <View></View>
      </View>
    </>
  );
};
