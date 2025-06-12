import React, {useState} from 'react';
import {Button, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {TextComponet} from '../../Components/Elements/TextComponet';
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
            fontSizeVariant="title"
            fontVariant="bold"
            title={
              'Name:  ' + placeOrderDetails.itemParams.name
            }></TextComponet>
          <TextComponet
            fontSizeVariant="regular"
            fontVariant="bold"
            title={
              'Location: ' + placeOrderDetails.itemParams.location
            }></TextComponet>
          <TextComponet
            fontSizeVariant="regular"
            fontVariant="bold"
            title={
              'SHopName: ' + placeOrderDetails.sellerDetails.shopName
            }></TextComponet>
          <TextComponet
            fontSizeVariant="regular"
            fontVariant="bold"
            title={
              'Phone Number: ' + placeOrderDetails.sellerDetails.phoneNumber
            }></TextComponet>

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
