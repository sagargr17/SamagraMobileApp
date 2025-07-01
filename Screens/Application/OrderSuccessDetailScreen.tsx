import React, {useState} from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {Divider, Icon, RadioButton, Surface} from 'react-native-paper';
import {AppText} from '../../Components/Elements/AppText';
import {Spacer} from '../../Components/Elements/Spacer';
import {size} from '../../Prefrences/Prefrences';
import {useAppSelector} from '../../StateManagement/hooks';
import {ListCard} from '../../Components/Molecules/Cards/ListCard';
import {RowFlexLayout} from '../../Layout/PartationLayout/RowFlexLayout';
import {titleRange} from '../../Utilities/CustomMethods';
import {NotMentioned} from '../../Constants/UI/Messages';
import {State} from 'react-native-gesture-handler';
interface OrderSuccessDetailScreenProps {}

export const OrderSuccessDetailScreen: React.FC<
  OrderSuccessDetailScreenProps
> = ({}) => {
  const {colors} = useTheme();
  const navigation = useNavigation<any>();
  const orderedItem = useAppSelector(
    state => state.placeOrderParams.itemDetails,
  );
  const sellerDetails = useAppSelector(
    state => state.placeOrderParams.sellerDetails,
  );
  const orderedDetail = useAppSelector(
    state => state.placeOrderParams.orderDetail,
  );
  const user = useAppSelector(state => state.user.userLocation);
  const status = 'Completed';

  const header = (
    <RowFlexLayout
      customStyle={{
        justifyContent: 'space-between',
      }}>
      <View>
        <AppText
          title="Purchase ID"
          fontVariant="bold"
          fontSizeVariant="title"></AppText>
        <Spacer></Spacer>
        <AppText title="#987892" fontVariant="medium"></AppText>
        <Spacer height={40}></Spacer>
      </View>
      <View>
        <Spacer></Spacer>
        <AppText
          fontSizeVariant="regular"
          title={status}
          fontVariant="medium"
          customStyle={{
            color: 'white',
            marginLeft: 5,
            backgroundColor: status === 'Completed' ? colors.primary : 'gray',
            padding: size.spacing.xxs,
            borderRadius: size.borderRadius.xs,
          }}></AppText>

        <Spacer height={40}></Spacer>
      </View>
    </RowFlexLayout>
  );

  const orderSummary = (
    <View
      style={
        {
          // marginHorizontal: size.spacing.xs,
        }
      }>
      <Spacer></Spacer>
      <Surface
        elevation={0}
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
            title={'Quantity'}
            fontVariant="regular"
            fontSizeVariant="regular"></AppText>
          <Spacer height={30}></Spacer>
          <AppText
            title={`Qty. ${Number(orderedDetail.orderQuantity)}`}></AppText>
          {/* <Counter setTotal={() => {}}></Counter> */}
        </RowFlexLayout>
        <RowFlexLayout
          customStyle={{
            justifyContent: 'space-between',
          }}>
          <AppText
            title={'SubTotal'}
            fontVariant="regular"
            fontSizeVariant="regular"></AppText>
          <Spacer height={30}></Spacer>
          <AppText
            title={`Rs.${
              Number(orderedDetail.orderQuantity) * orderedItem.price
            }`}></AppText>
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
            title={titleRange(user?.address ?? NotMentioned, 22)}></AppText>
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
        <RowFlexLayout
          customStyle={{
            justifyContent: 'space-between',
          }}>
          <AppText
            title={'Total'}
            fontVariant="medium"
            fontSizeVariant="title"></AppText>
          <Spacer height={30}></Spacer>
          <AppText
            fontVariant="medium"
            fontSizeVariant="title"
            title={`Rs.${
              Number(orderedDetail.orderQuantity) * orderedItem.price + 10
            }`}></AppText>
        </RowFlexLayout>
      </Surface>
    </View>
  );

  const paymentMethoContainer = (
    <View>
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

  const itemCard = (
    <>
      <AppText
        title="Product"
        fontVariant="bold"
        fontSizeVariant="title"></AppText>
      <ListCard
        id={orderedDetail.itemID}
        list={[
          {
            value: orderedItem.name,
            type: 'regular',
            fontVariant: 'medium',
          },
          {
            value: `${orderedItem.price}`,
            type: 'regular',
            fontVariant: 'medium',
          },
        ]}
        imageUrl={orderedItem.imageUrl}></ListCard>
    </>
  );

  const sellerDetailsContainer = (
    <View
      style={[
        {
          paddingHorizontal: size.spacing.xxs,
          backgroundColor: colors.card,
          paddingVertical: size.spacing.m,
        },
      ]}>
      <AppText
        title={'Seller Details :'}
        fontVariant="bold"
        fontSizeVariant="title"></AppText>
      <Divider
        style={{
          height: 0.2,
        }}></Divider>
      <Spacer></Spacer>
      <RowFlexLayout
        customStyle={{
          justifyContent: 'space-between',
        }}>
        <AppText
          customStyle={{
            color: '#00A3A3',
          }}
          title={'Shop name'}
          fontVariant="regular"
          fontSizeVariant="regular"></AppText>
        <AppText
          customStyle={{
            color: '#00A3A3',
          }}
          title={sellerDetails.shopName}></AppText>
      </RowFlexLayout>
      <Spacer></Spacer>
      <RowFlexLayout
        customStyle={{
          justifyContent: 'space-between',
        }}>
        <AppText
          title={'Seller name'}
          fontVariant="regular"
          fontSizeVariant="regular"></AppText>
        <AppText title={sellerDetails.fullName}></AppText>
      </RowFlexLayout>
      <Spacer></Spacer>
      <RowFlexLayout
        customStyle={{
          justifyContent: 'space-between',
        }}>
        <AppText
          title={'Address'}
          fontVariant="regular"
          fontSizeVariant="regular"></AppText>
        <AppText title={sellerDetails.address}></AppText>
      </RowFlexLayout>
      <Spacer></Spacer>
      <RowFlexLayout
        customStyle={{
          justifyContent: 'space-between',
        }}>
        <AppText
          title={'Phone Number'}
          fontVariant="regular"
          fontSizeVariant="regular"></AppText>
        <AppText title={sellerDetails.phoneNumber}></AppText>
      </RowFlexLayout>
    </View>
  );

  return (
    <ScrollView
      style={{
        paddingHorizontal: size.spacing.xs,
      }}>
      {header}
      {itemCard}
      {orderSummary}
      <Spacer></Spacer>
      {sellerDetailsContainer}
      <Spacer></Spacer>
      {paymentMethoContainer}
    </ScrollView>
  );
};
