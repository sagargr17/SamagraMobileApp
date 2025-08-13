import React, {useState} from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {AppTextElement} from '../../Components/Elements/AppTextElement';
import {responseTheme, size} from '../../Prefrences/Prefrences';
import {useAppSelector} from '../../StateManagement/hooks';
import {useMutation} from '@apollo/client';
import {createOrderMutation} from '../../GraphQL/Mutation/CheckOutMutation';
import {StringValueNode} from 'graphql';
import {ListCardMolecule} from '../../Components/Molecules/Cards/ListCardMolecule';
import {RowFlexLayout} from '../../Layout/PartationLayout/RowFlexLayout';
import {SpacerElement} from '../../Components/Elements/SpacerElement';
import {Divider, RadioButton, Surface} from 'react-native-paper';
import AppButtonElement from '../../Components/Elements/ButtonElement';
import {
  NoInternetFoundMessage,
  NoItemFound,
  NotMentioned,
} from '../../Constants/UI/Messages';
import DateTimeToAgoTime, {
  AreaMapper,
  titleCase,
  titleRange,
} from '../../Utilities/CustomMethods';
import {ScrollView} from 'react-native-gesture-handler';
import {CounterMolecule} from '../../Components/Molecules/Global/CounterMolecule';
import {showMessage} from 'react-native-flash-message';
interface PlaceOrderScreenProps {}

export const PlaceOrderScreen: React.FC<PlaceOrderScreenProps> = ({}) => {
  const {colors} = useTheme();
  const navigation = useNavigation<any>();
  const placeOrderDetails = useAppSelector(state => state.placeOrderParams);
  const location = useAppSelector(state => state.user.userLocation?.address);
  const user = useAppSelector(state => state.user.Profile);
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

    try {
      let response = await createOrderMutationFn({
        variables: {
          fullName: fullName,
          address: address,
          phoneNumber: phoneNumber,
          quantity: 1,
          message: message,
          itemId: itemID,
        },
      });

      if (response.data) {
        navigation.navigate('ApplicationOverlay', {
          screen: 'OrderSuccessDetailScreen',
        });
      }
    } catch (err) {
      console.log('Error:::...', err);
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
      <AppTextElement
        title={'Seller Details :'}
        fontVariant="bold"
        fontSizeVariant="title"></AppTextElement>
      <SpacerElement></SpacerElement>
      <Divider
        style={{
          height: 1,
        }}></Divider>
      <SpacerElement></SpacerElement>
      <View>
        <RowFlexLayout
          customStyle={[
            {
              justifyContent: 'space-between',
            },
          ]}>
          <AppTextElement
            title={'Seller name'}
            fontVariant="medium"
            fontSizeVariant="regular"></AppTextElement>
          <AppTextElement
            fontVariant="medium"
            title={titleRange(
              placeOrderDetails.sellerDetails.fullName,
            )}></AppTextElement>
        </RowFlexLayout>
        <SpacerElement height={4}></SpacerElement>
        <RowFlexLayout
          customStyle={[
            {
              justifyContent: 'space-between',
            },
          ]}>
          <AppTextElement
            title={'Address'}
            fontVariant="medium"
            fontSizeVariant="title"></AppTextElement>
          <AppTextElement
            fontVariant="medium"
            fontSizeVariant="regular"
            title={titleCase(
              placeOrderDetails.sellerDetails.address,
            )}></AppTextElement>
        </RowFlexLayout>
        <SpacerElement height={4}></SpacerElement>
        <RowFlexLayout
          customStyle={[
            {
              justifyContent: 'space-between',
            },
          ]}>
          <AppTextElement
            fontVariant="medium"
            fontSizeVariant="regular"
            title={'Phone Number'}></AppTextElement>
          <AppTextElement
            fontVariant="medium"
            fontSizeVariant="regular"
            title={
              placeOrderDetails.sellerDetails.phoneNumber
            }></AppTextElement>
        </RowFlexLayout>
      </View>
    </View>
  );

  const paymentMethoContainer = (
    <View style={style}>
      <AppTextElement
        title={'Payment Method'}
        fontVariant="bold"
        fontSizeVariant="title"></AppTextElement>
      <SpacerElement></SpacerElement>
      <Divider
        style={{
          height: 1,
        }}></Divider>
      <SpacerElement></SpacerElement>
      <RowFlexLayout
        customStyle={[
          {
            justifyContent: 'space-between',
          },
        ]}>
        <AppTextElement
          title={'Cash on delivery'}
          fontVariant="medium"
          fontSizeVariant="regular"></AppTextElement>
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
        marginHorizontal: size.spacing.xxs,
      }}>
      <AppTextElement
        title={'Order Summary'}
        fontVariant="bold"
        fontSizeVariant="title"></AppTextElement>
      <SpacerElement></SpacerElement>
      <Surface
        elevation={1}
        style={{
          borderRadius: size.borderRadius.s,
          backgroundColor: colors.card,
          paddingHorizontal: size.spacing.xs,
          paddingVertical: size.spacing.xs,
        }}>
        <RowFlexLayout
          customStyle={[
            {
              justifyContent: 'space-between',
            },
          ]}>
          <AppTextElement
            title={'Order Date'}
            fontVariant="medium"
            fontSizeVariant="regular"></AppTextElement>
          <SpacerElement height={30}></SpacerElement>
          <AppTextElement
            fontVariant="medium"
            fontSizeVariant="regular"
            title={`${new Date().getFullYear()} - ${new Date().getMonth()}-${new Date().getDate()} `}></AppTextElement>
          {/* <Counter setTotal={() => {}}></Counter> */}
        </RowFlexLayout>
        <RowFlexLayout
          customStyle={[
            {
              justifyContent: 'space-between',
            },
          ]}>
          <AppTextElement
            title={'Message'}
            fontVariant="medium"
            fontSizeVariant="regular"></AppTextElement>
          <SpacerElement height={30}></SpacerElement>
          <AppTextElement
            fontVariant="medium"
            fontSizeVariant="regular"
            title={
              placeOrderDetails.orderDetail.message ?? 'No Messages'
            }></AppTextElement>
          {/* <Counter setTotal={() => {}}></Counter> */}
        </RowFlexLayout>
        <RowFlexLayout
          customStyle={[
            {
              justifyContent: 'space-between',
            },
          ]}>
          <AppTextElement
            title={'Shipping Address'}
            fontVariant="medium"
            fontSizeVariant="regular"></AppTextElement>
          <SpacerElement height={30}></SpacerElement>
          <AppTextElement
            fontVariant="medium"
            fontSizeVariant="regular"
            title={titleRange(location ?? NotMentioned, 22)}></AppTextElement>
        </RowFlexLayout>
        <RowFlexLayout
          customStyle={[
            {
              justifyContent: 'space-between',
            },
          ]}>
          <AppTextElement
            title={'Taxes'}
            fontVariant="medium"
            fontSizeVariant="regular"></AppTextElement>
          <SpacerElement height={30}></SpacerElement>
          <AppTextElement
            fontVariant="medium"
            fontSizeVariant="regular"
            title={'Rs.10'}></AppTextElement>
        </RowFlexLayout>
      </Surface>
    </View>
  );

  const totalPriceDetail = (
    <RowFlexLayout
      customStyle={[
        {
          justifyContent: 'space-between',
          paddingHorizontal: size.spacing.s,
          paddingVertical: size.spacing.s,
        },
      ]}>
      <AppTextElement
        title={'Total'}
        fontVariant="bold"
        fontSizeVariant="title"></AppTextElement>
      <AppTextElement
        title={`Rs.${placeOrderDetails.itemDetails.price + 10}`}
        fontVariant="bold"
        fontSizeVariant="title"></AppTextElement>
    </RowFlexLayout>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: size.spacing.s,
      }}>
      <SpacerElement height={25}></SpacerElement>
      <ScrollView showsVerticalScrollIndicator={false} style={{}}>
        <ListCardMolecule
          customImageStyle={{
            height: AreaMapper({
              value: 80,
            }),
            width: AreaMapper({
              value: 80,
            }),
            marginVertical: size.spacing.m,
          }}
          customStyle={{
            paddingHorizontal: size.spacing.m,
          }}
          id={placeOrderDetails.itemDetails.imageUrl}
          surfaceLevel={2}
          imageUrl={placeOrderDetails.itemDetails.imageUrl}
          list={[
            {
              type: 'title',
              value: placeOrderDetails.itemDetails.name,
              fontVariant: 'heavy',
            },
            {
              type: 'regular',
              value: `Npr.${placeOrderDetails.itemDetails.price}`,
              fontVariant: 'medium',
            },
          ]}></ListCardMolecule>
        <SpacerElement height={30}></SpacerElement>
        {sellerDetailsContainer}
        <SpacerElement height={20}></SpacerElement>
        {paymentMethoContainer}
        <SpacerElement height={20}></SpacerElement>
        {orderSummary}
        <SpacerElement height={25}></SpacerElement>
        {totalPriceDetail}
        <SpacerElement height={20}></SpacerElement>
        <AppButtonElement
          showLoader={true}
          onPress={() => {
            try {
              {
                console.log('ITem IDDd>>>', placeOrderDetails);

                handleConfirmPlaceItem(
                  user?.username ?? 'sagar',
                  location ?? 'butwal',
                  user?.phoneNumber ?? '9841150390',
                  Number(
                    placeOrderDetails.orderDetail.orderQuantity === '0'
                      ? 1
                      : placeOrderDetails.orderDetail.orderQuantity,
                  ),
                  placeOrderDetails.orderDetail.message,
                  placeOrderDetails.orderDetail.itemID,
                );
              }
            } catch (e) {
              showMessage(
                responseTheme(NoItemFound, NoInternetFoundMessage, 'danger'),
              );
            }
          }}>
          Place Order
        </AppButtonElement>
      </ScrollView>
    </SafeAreaView>
  );
};
