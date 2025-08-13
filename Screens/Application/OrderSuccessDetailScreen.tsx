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

import {size} from '../../Prefrences/Prefrences';
import {useAppSelector} from '../../StateManagement/hooks';
import {RowFlexLayout} from '../../Layout/PartationLayout/RowFlexLayout';
import {AreaMapper, titleCase, titleRange} from '../../Utilities/CustomMethods';
import {NotMentioned} from '../../Constants/UI/Messages';
import {State} from 'react-native-gesture-handler';
import {AppTextElement} from '../../Components/Elements/AppTextElement';
import {SpacerElement} from '../../Components/Elements/SpacerElement';
import {ListCardMolecule} from '../../Components/Molecules/Cards/ListCardMolecule';
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
      customStyle={[
        {
          justifyContent: 'space-between',
        },
      ]}>
      <View>
        <AppTextElement
          title="Purchase ID"
          fontVariant="bold"
          fontSizeVariant="display"></AppTextElement>
        <SpacerElement />
        <AppTextElement
          title="#987892"
          fontSizeVariant="title"
          fontVariant="medium"></AppTextElement>
        <SpacerElement height={40} />
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
            padding: size.spacing.xs,
            borderRadius: size.borderRadius.xs,
            paddingHorizontal: size.spacing.m,
          }}></AppTextElement>

        <SpacerElement height={40}></SpacerElement>
      </View>
    </RowFlexLayout>
  );

  const orderSummary = (
    <View>
      <SpacerElement></SpacerElement>
      <Surface
        elevation={0}
        style={{
          borderRadius: size.borderRadius.s,
          // backgroundColor: colors.card,
          // padding: size.spacing.m,
        }}>
        <RowFlexLayout
          customStyle={[
            {
              justifyContent: 'space-between',
            },
          ]}>
          <AppTextElement
            title={'Subtotal'}
            fontVariant="regular"
            fontSizeVariant="regular"
            customStyle={{
              color: '#578F7D',
            }}></AppTextElement>
          <SpacerElement height={30}></SpacerElement>
          <AppTextElement
            title={`Rs.${
              Number(orderedDetail.orderQuantity) * orderedItem.price
            }`}></AppTextElement>
        </RowFlexLayout>
        <RowFlexLayout
          customStyle={[
            {
              justifyContent: 'space-between',
            },
          ]}>
          <AppTextElement
            customStyle={{
              color: '#578F7D',
            }}
            title={'Shipping Address'}
            fontVariant="regular"
            fontSizeVariant="regular"></AppTextElement>
          <SpacerElement height={30}></SpacerElement>
          <AppTextElement
            title={titleRange(
              user?.address ?? NotMentioned,
              22,
            )}></AppTextElement>
        </RowFlexLayout>
        <RowFlexLayout
          customStyle={[
            {
              justifyContent: 'space-between',
            },
          ]}>
          <AppTextElement
            customStyle={{
              color: '#578F7D',
            }}
            title={'Taxes'}
            fontVariant="regular"
            fontSizeVariant="regular"></AppTextElement>
          <SpacerElement height={30}></SpacerElement>
          <AppTextElement title={'Rs.10'}></AppTextElement>
        </RowFlexLayout>
        <RowFlexLayout
          customStyle={[
            {
              justifyContent: 'space-between',
            },
          ]}>
          <AppTextElement
            customStyle={{
              color: '#578F7D',
            }}
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
        fontSizeVariant="display"></AppTextElement>
      <SpacerElement height={12}></SpacerElement>
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

  console.log('>>><<<', orderedItem.imageUrl);

  const itemCard = (
    <>
      <SpacerElement height={20}></SpacerElement>
      <AppTextElement
        title="Product"
        fontVariant="bold"
        fontSizeVariant="display"></AppTextElement>
      <SpacerElement height={12}></SpacerElement>
      <ListCardMolecule
        customStyle={{
          backgroundColor: colors.background,
        }}
        id={orderedDetail.itemID}
        list={[
          {
            value: titleCase(orderedItem.name),
            type: 'title',
            fontVariant: 'medium',
          },
          {
            value: `Npr.${orderedItem.price}`,
            type: 'regular',
            fontVariant: 'medium',
          },
        ]}
        customImageStyle={{
          height: AreaMapper({value: 80}),
          width: AreaMapper({value: 80}),
        }}
        imageUrl={orderedItem.imageUrl}></ListCardMolecule>
    </>
  );

  const sellerDetailsContainer = (
    <View
      style={[
        {
          paddingVertical: size.spacing.m,
        },
      ]}>
      <SpacerElement height={20}></SpacerElement>

      <AppTextElement
        title={'Seller'}
        fontVariant="bold"
        fontSizeVariant="display"></AppTextElement>
      {/* <SpacerElement height={12}></SpacerElement> */}

      <SpacerElement></SpacerElement>
      <SpacerElement></SpacerElement>
      <RowFlexLayout
        customStyle={[
          {
            justifyContent: 'space-between',
          },
        ]}>
        <AppTextElement
          customStyle={{
            color: '#578F7D',
          }}
          title={'Seller Name'}
          fontVariant="medium"
          fontSizeVariant="regular"></AppTextElement>
        <AppTextElement title={sellerDetails.fullName}></AppTextElement>
      </RowFlexLayout>
      <SpacerElement height={10}></SpacerElement>

      <RowFlexLayout
        customStyle={[
          {
            justifyContent: 'space-between',
          },
        ]}>
        <AppTextElement
          title={'Address'}
          fontVariant="regular"
          fontSizeVariant="regular"></AppTextElement>
        <AppTextElement title={sellerDetails.address}></AppTextElement>
      </RowFlexLayout>
      <SpacerElement height={10}></SpacerElement>

      <RowFlexLayout
        customStyle={[
          {
            justifyContent: 'space-between',
          },
        ]}>
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
        paddingHorizontal: size.spacing.s,
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
