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
import {AppTextElement} from '../../Components/Elements/AppTextElement';
import {SpacerElement} from '../../Components/Elements/SpacerElement';
import {size} from '../../Prefrences/Prefrences';
import {useAppSelector} from '../../StateManagement/hooks';
import {ListCardMolecule} from '../../Components/Molecules/Cards/ListCardMolecule';
import {RowFlexLayout} from '../../Layout/PartationLayout/RowFlexLayout';
import {titleRange} from '../../Utilities/CustomMethods';
import {NotMentioned} from '../../Constants/UI/Messages';
import {State} from 'react-native-gesture-handler';
interface CompleteOrderScreenProps {}

export const CompleteOrderScreen: React.FC<CompleteOrderScreenProps> = ({}) => {
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
        <AppTextElement
          title="Purchase ID"
          fontVariant="bold"
          fontSizeVariant="title"></AppTextElement>
        <SpacerElement></SpacerElement>
        <AppTextElement title="#987892" fontVariant="medium"></AppTextElement>
        <SpacerElement height={40}></SpacerElement>
      </View>
      <View>
        <SpacerElement></SpacerElement>
        <AppTextElement
          fontSizeVariant="regular"
          title={status}
          fontVariant="medium"
          customStyle={{
            color: 'white',
            marginLeft: 5,
            backgroundColor: status === 'Completed' ? colors.primary : 'gray',
            padding: size.spacing.xxs,
            borderRadius: size.borderRadius.xs,
          }}></AppTextElement>

        <SpacerElement height={40}></SpacerElement>
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
      <SpacerElement></SpacerElement>
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
          <AppTextElement
            title={'Quantity'}
            fontVariant="regular"
            fontSizeVariant="regular"></AppTextElement>
          <SpacerElement height={30}></SpacerElement>
          <AppTextElement
            title={`Qty. ${Number(orderedDetail.orderQuantity)}`}></AppTextElement>
          {/* <Counter setTotal={() => {}}></Counter> */}
        </RowFlexLayout>
        <RowFlexLayout
          customStyle={{
            justifyContent: 'space-between',
          }}>
          <AppTextElement
            title={'SubTotal'}
            fontVariant="regular"
            fontSizeVariant="regular"></AppTextElement>
          <SpacerElement height={30}></SpacerElement>
          <AppTextElement
            title={`Rs.${
              Number(orderedDetail.orderQuantity) * orderedItem.price
            }`}></AppTextElement>
          {/* <Counter setTotal={() => {}}></Counter> */}
        </RowFlexLayout>
        <RowFlexLayout
          customStyle={{
            justifyContent: 'space-between',
          }}>
          <AppTextElement
            title={'Shipping Address'}
            fontVariant="regular"
            fontSizeVariant="regular"></AppTextElement>
          <SpacerElement height={30}></SpacerElement>
          <AppTextElement
            title={titleRange(user?.address ?? NotMentioned, 22)}></AppTextElement>
        </RowFlexLayout>
        <RowFlexLayout
          customStyle={{
            justifyContent: 'space-between',
          }}>
          <AppTextElement
            title={'Taxes'}
            fontVariant="regular"
            fontSizeVariant="regular"></AppTextElement>
          <SpacerElement height={30}></SpacerElement>
          <AppTextElement title={'Rs.10'}></AppTextElement>
        </RowFlexLayout>
        <RowFlexLayout
          customStyle={{
            justifyContent: 'space-between',
          }}>
          <AppTextElement
            title={'Total'}
            fontVariant="medium"
            fontSizeVariant="title"></AppTextElement>
          <SpacerElement height={30}></SpacerElement>
          <AppTextElement
            fontVariant="medium"
            fontSizeVariant="title"
            title={`Rs.${
              Number(orderedDetail.orderQuantity) * orderedItem.price + 10
            }`}></AppTextElement>
        </RowFlexLayout>
      </Surface>
    </View>
  );

  const paymentMethoContainer = (
    <View>
      <AppTextElement
        title={'Payment Method'}
        fontVariant="bold"
        fontSizeVariant="title"></AppTextElement>
      <Divider
        style={{
          height: 1,
        }}></Divider>
      <SpacerElement></SpacerElement>
      <RowFlexLayout
        customStyle={{
          justifyContent: 'space-between',
        }}>
        <AppTextElement
          title={'Cash on delivery'}
          fontVariant="regular"
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

  const itemCard = (
    <>
      <AppTextElement
        title="Product"
        fontVariant="bold"
        fontSizeVariant="title"></AppTextElement>
      <ListCardMolecule
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
        imageUrl={orderedItem.imageUrl}></ListCardMolecule>
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
      <AppTextElement
        title={'Seller Details :'}
        fontVariant="bold"
        fontSizeVariant="title"></AppTextElement>
      <Divider
        style={{
          height: 0.2,
        }}></Divider>
      <SpacerElement></SpacerElement>
      <RowFlexLayout
        customStyle={{
          justifyContent: 'space-between',
        }}>
        <AppTextElement
          customStyle={{
            color: '#00A3A3',
          }}
          title={'Shop name'}
          fontVariant="regular"
          fontSizeVariant="regular"></AppTextElement>
        <AppTextElement
          customStyle={{
            color: '#00A3A3',
          }}
          title={sellerDetails.fullName}></AppTextElement>
      </RowFlexLayout>
      <SpacerElement></SpacerElement>
      <RowFlexLayout
        customStyle={{
          justifyContent: 'space-between',
        }}>
        <AppTextElement
          title={'Seller name'}
          fontVariant="regular"
          fontSizeVariant="regular"></AppTextElement>
        <AppTextElement title={sellerDetails.fullName}></AppTextElement>
      </RowFlexLayout>
      <SpacerElement></SpacerElement>
      <RowFlexLayout
        customStyle={{
          justifyContent: 'space-between',
        }}>
        <AppTextElement
          title={'Address'}
          fontVariant="regular"
          fontSizeVariant="regular"></AppTextElement>
        <AppTextElement title={sellerDetails.address}></AppTextElement>
      </RowFlexLayout>
      <SpacerElement></SpacerElement>
      <RowFlexLayout
        customStyle={{
          justifyContent: 'space-between',
        }}>
        <AppTextElement
          title={'Phone Number'}
          fontVariant="regular"
          fontSizeVariant="regular"></AppTextElement>
        <AppTextElement title={sellerDetails.phoneNumber}></AppTextElement>
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
      <SpacerElement></SpacerElement>
      {sellerDetailsContainer}
      <SpacerElement></SpacerElement>
      {paymentMethoContainer}
    </ScrollView>
  );
};
