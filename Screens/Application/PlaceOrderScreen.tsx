import React, {useState} from 'react';
import {
  Button,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {AppText} from '../../Components/Elements/AppText';
import {responseTheme, size} from '../../Prefrences/Prefrences';
import {useAppSelector} from '../../StateManagement/hooks';
import {useMutation} from '@apollo/client';
import {createOrderMutation} from '../../GraphQL/Mutation/CheckOutMutation';
import {StringValueNode} from 'graphql';
import {ListCard} from '../../Components/Molecules/Cards/ListCard';
import {RowFlexLayout} from '../../Layout/PartationLayout/RowFlexLayout';
import {Spacer} from '../../Components/Elements/Spacer';
import {Divider, RadioButton, Surface} from 'react-native-paper';
import AppButton from '../../Components/Elements/Button';
import {
  NoInternetFoundMessage,
  NoItemFound,
  NotMentioned,
} from '../../Constants/UI/Messages';
import {titleRange} from '../../Utilities/CustomMethods';
import {ScrollView} from 'react-native-gesture-handler';
import {Counter} from '../../Components/Molecules/Global/Counter';
import {showMessage} from 'react-native-flash-message';
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

  const style: ViewStyle = {
    borderWidth: size.borderWidth.xs,
    borderStyle: 'dashed',
    paddingVertical: size.spacing.m,
    borderRadius: size.borderRadius.xs,
    marginHorizontal: size.spacing.xs,
    borderColor: colors.border,
  };

  const sellerDetailsContainer = (
    <View
      style={[
        {
          paddingHorizontal: size.spacing.xxs,
        },
        style,
      ]}>
      <AppText
        title={'Seller Details :'}
        fontVariant="bold"
        fontSizeVariant="title"></AppText>
      <Divider
        style={{
          height: 1,
        }}></Divider>
      <Spacer></Spacer>
      <View
        style={{
          paddingHorizontal: size.spacing.s,
        }}>
        <RowFlexLayout
          customStyle={{
            justifyContent: 'space-between',
          }}>
          <AppText
            title={'Shop name'}
            fontVariant="regular"
            fontSizeVariant="regular"></AppText>
          <AppText title={placeOrderDetails.sellerDetails.shopName}></AppText>
        </RowFlexLayout>
        <RowFlexLayout
          customStyle={{
            justifyContent: 'space-between',
          }}>
          <AppText
            title={'Seller name'}
            fontVariant="regular"
            fontSizeVariant="regular"></AppText>
          <AppText title={placeOrderDetails.sellerDetails.fullName}></AppText>
        </RowFlexLayout>
        <RowFlexLayout
          customStyle={{
            justifyContent: 'space-between',
          }}>
          <AppText
            title={'Address'}
            fontVariant="regular"
            fontSizeVariant="regular"></AppText>
          <AppText title={placeOrderDetails.sellerDetails.address}></AppText>
        </RowFlexLayout>
        <RowFlexLayout
          customStyle={{
            justifyContent: 'space-between',
          }}>
          <AppText
            title={'Phone Number'}
            fontVariant="regular"
            fontSizeVariant="regular"></AppText>
          <AppText
            title={placeOrderDetails.sellerDetails.phoneNumber}></AppText>
        </RowFlexLayout>
      </View>
    </View>
  );

  const paymentMethoContainer = (
    <View style={style}>
      <AppText
        title={'Payment Method'}
        fontVariant="bold"
        fontSizeVariant="title"></AppText>
      <Divider
        style={{
          height: 1,
        }}></Divider>
      <Spacer></Spacer>
      <RowFlexLayout
        customStyle={{
          justifyContent: 'space-between',
        }}>
        <AppText
          title={'Cash on delivery'}
          fontVariant="regular"
          fontSizeVariant="regular"></AppText>
        <RadioButton
          color={colors.primary}
          value="second"
          status={'checked'}
          // onPress={() => setChecked('second')}
        />
      </RowFlexLayout>
    </View>
  );

  const orderSummary = (
    <View
      style={{
        marginHorizontal: size.spacing.xs,
      }}>
      <AppText
        title={'Order Summary'}
        fontVariant="bold"
        fontSizeVariant="title"></AppText>
      <Spacer></Spacer>
      <Surface
        elevation={1}
        style={{
          borderRadius: size.borderRadius.s,
          backgroundColor: colors.card,
          padding: size.spacing.m,
        }}>
        <RowFlexLayout
          customStyle={{
            justifyContent: 'space-between',
          }}>
          <AppText
            title={'Order Quantity'}
            fontVariant="regular"
            fontSizeVariant="regular"></AppText>
          <Spacer height={30}></Spacer>
          <AppText
            title={
              'Qty : ' + placeOrderDetails.orderDetail.orderQuantity
            }></AppText>
          {/* <Counter setTotal={() => {}}></Counter> */}
        </RowFlexLayout>
        <RowFlexLayout
          customStyle={{
            justifyContent: 'space-between',
          }}>
          <AppText
            title={'Shipping Address'}
            fontVariant="regular"
            fontSizeVariant="regular"></AppText>
          <Spacer height={30}></Spacer>
          <AppText
            title={titleRange(user?.location ?? NotMentioned, 22)}></AppText>
        </RowFlexLayout>
        <RowFlexLayout
          customStyle={{
            justifyContent: 'space-between',
          }}>
          <AppText
            title={'Taxes'}
            fontVariant="regular"
            fontSizeVariant="regular"></AppText>
          <Spacer height={30}></Spacer>
          <AppText title={'Rs.10'}></AppText>
        </RowFlexLayout>
      </Surface>
    </View>
  );

  const totalPriceDetail = (
    <RowFlexLayout
      customStyle={{
        justifyContent: 'space-between',
        paddingHorizontal: size.spacing.xs,
      }}>
      <AppText
        title={'Total'}
        fontVariant="bold"
        fontSizeVariant="title"></AppText>
      <AppText
        title={`Rs.${
          placeOrderDetails.itemDetails.price *
            Number(placeOrderDetails.orderDetail.orderQuantity) +
          10
        }`}
        fontVariant="bold"
        fontSizeVariant="regular"></AppText>
    </RowFlexLayout>
  );

  return (
    <ScrollView
      style={{
        paddingHorizontal: size.spacing.xxs,
      }}>
      <ListCard
        surfaceLevel={2}
        item={{
          name: placeOrderDetails.itemDetails.name,
          price: placeOrderDetails.itemDetails.price,
          imageUrl: placeOrderDetails.itemDetails.imageUrl,
          rating: 3,
          shop: {
            name: placeOrderDetails.sellerDetails.shopName,
          },
        }}></ListCard>
      <Spacer height={20}></Spacer>
      {sellerDetailsContainer}
      <Spacer height={20}></Spacer>
      {paymentMethoContainer}
      <Spacer height={20}></Spacer>
      {orderSummary}
      <Spacer height={20}></Spacer>
      {totalPriceDetail}
      <Spacer height={20}></Spacer>
      <AppButton
        showLoader={true}
        onPress={() => {
          try {
            if (
              user &&
              placeOrderDetails?.orderDetail?.orderQuantity &&
              placeOrderDetails.orderDetail.itemID
            )
              handleConfirmPlaceItem(
                user?.username,
                user?.location,
                user?.phoneNumber,
                Number(placeOrderDetails.orderDetail.orderQuantity),
                placeOrderDetails.orderDetail.message,
                placeOrderDetails.orderDetail.itemID,
              );
          } catch (e) {
            showMessage(
              responseTheme(NoItemFound, NoInternetFoundMessage, 'success'),
            );
          }
        }}>
        Place Order
      </AppButton>
    </ScrollView>
  );
};
