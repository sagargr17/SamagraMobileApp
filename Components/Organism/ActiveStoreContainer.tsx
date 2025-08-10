import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';

import {useMutation} from '@apollo/client';
import {Alert, StyleSheet, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {Logos} from '../../Assets/SVG/Exports/Exports';
import {WentwrongMessage} from '../../Constants/UI/Messages';
import {RowFlexLayout} from '../../Layout/PartationLayout/RowFlexLayout';
import {responseTheme, size} from '../../Prefrences/Prefrences';
import {useAppDispatch, useAppSelector} from '../../StateManagement/hooks';
import {AppText} from '../Elements/AppText';
import {Spacer} from '../Elements/Spacer';
import {BubbleCard} from '../Molecules/Cards/BubbleCard';
import {showLoader} from '../../StateManagement/Error&loadingHandle/LoaderStateSlice';
import {SamagraLoader} from '../Elements/SamagraLoader';

interface ActiveStoreContainerProps {
  shopId: string;
}

export const ActiveStoreContainer: React.FC<ActiveStoreContainerProps> = ({
  shopId,
}) => {
  const {colors} = useTheme();
  const navigation = useNavigation<any>();
  const {PenIcon, DustbinIcon, StockIcon, PlusIcon} = Logos;
  const iconSize = size.iconSize.small;
  const shopName = useAppSelector(state => state.user.shopData?.name);
  const dispatch = useAppDispatch();
  // const [removeStoreFn] = useMutation(deleteStore);

  const flexDetailsItems = [
    {
      firstRow: [
        {
          title: 'History',
          iconName: 'history',
          onPress: () => {
            console.log('Presed');
          },
        },
        {
          title: 'Items',
          iconName: 'chart-bar-stacked',
          onPress: () => {
            navigation.navigate('MyShopItemsScreen', {
              shopName: shopName,
              shopId: shopId,
            });
          },
        },
      ],
      secondRow: [
        {
          title: 'Pending',
          iconName: 'calendar-clock-outline',
          onPress: () => {
            navigation.navigate('PendingOrderScreen', {
              shopId: shopId,
            });
          },
        },

        {
          title: 'Stocks',
          iconName: <StockIcon height={iconSize} width={iconSize}></StockIcon>,
          onPress: () => {
            navigation.navigate('StockScreen', {
              shopId: shopId,
            });
          },
        },
      ],
    },
  ];

  const columnlist = [
    {
      title: 'Add Item',
      icon: <PlusIcon height={iconSize} width={iconSize}></PlusIcon>,
      onPress: () => {
        navigation.navigate('ApplicationOverlay', {
          screen: 'AddItemScreen',
          params: {
            shopName: shopName,
            shopId: shopId,
          },
        });
      },
    },
    {
      title: 'Edit Shop',
      icon: <PenIcon height={iconSize} width={iconSize}></PenIcon>,
      onPress: () => {
        console.log('Presed');
      },
    },
    {
      title: 'Delete Shop',
      icon: (
        <DustbinIcon
          height={iconSize}
          width={iconSize}
          color="red"></DustbinIcon>
      ),
      onPress: () => {
        // Alert.alert("Are you Sure want to delete?",)
      },
    },
  ];

  return (
    <>
      <RowFlexLayout
        customStyle={
          {
            // justifyContent: 'space-around',
          }
        }>
        {flexDetailsItems[0].firstRow.map((item, index) => (
          <BubbleCard
            key={index}
            customStyle={{
              flex: 0.65,
              borderColor: colors.background,
            }}
            variant="small"
            title={item.title}
            iconName={item.iconName}
            onPress={item.onPress}></BubbleCard>
        ))}
      </RowFlexLayout>
      <RowFlexLayout
        customStyle={
          {
            // justifyContent: 'space-around',
          }
        }>
        {flexDetailsItems[0].secondRow.map((item, index) => (
          <BubbleCard
            key={index}
            customStyle={{
              flex: 0.45,
              borderColor: colors.background,
            }}
            variant="small"
            title={item.title}
            iconName={item.iconName}
            onPress={item.onPress}></BubbleCard>
        ))}
      </RowFlexLayout>
      <Spacer height={size.spacing.s}></Spacer>
      {columnlist.map((item, index) => (
        <RowFlexLayout
          onPressed={item.onPress}
          isTouchEnable={true}
          key={index}
          customStyle={{
            justifyContent: 'flex-start',
            marginBottom: size.spacing.l,
            paddingHorizontal: size.spacing.xxs,
          }}>
          <View
            style={{
              backgroundColor: colors.card,
              padding: size.spacing.xs,
              borderRadius: size.borderRadius.s,
              marginRight: size.spacing.m,
            }}>
            {item.icon}
          </View>
          <AppText title={item.title} />
        </RowFlexLayout>
      ))}
    </>
  );
};

const styles = StyleSheet.create({});
