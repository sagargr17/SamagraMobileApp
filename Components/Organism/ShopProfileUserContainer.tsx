import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';

import {Logos} from '../../Assets/SVG/Exports/Exports';
import {RowFlexLayout} from '../../Layout/PartationLayout/RowFlexLayout';
import {size} from '../../Prefrences/Prefrences';
import {BubbleCard} from '../Molecules/Cards/BubbleCard';
import {AppText} from '../Elements/AppText';
import {StyleSheet, View} from 'react-native';
import {Spacer} from '../Elements/Spacer';
import {Icon, TouchableRipple} from 'react-native-paper';
import {
  AddItemScreenRouteProp,
  ApplicationOverlayStackNavigationProp,
} from '../../Navigators/Stack/ApplicationOverlayStackNavigator';
import {State} from 'react-native-gesture-handler';
import {useAppDispatch, useAppSelector} from '../../StateManagement/hooks';
import {clearTokens} from '../../client/Token/TokenAccess';
import AppButton from '../Elements/Button';

interface ShopProfileUserContainerProps {
  shopId: string;
}

export const ShopProfileUserContainer: React.FC<
  ShopProfileUserContainerProps
> = ({shopId}) => {
  const {colors} = useTheme();
  const navigation = useNavigation<any>();
  const {PenIcon, DustbinIcon, StockIcon, PlusIcon} = Logos;
  const iconSize = size.iconSize.small;
  const shopName = useAppSelector(state => state.user.shopData?.name);

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
            navigation.navigate('ApplicationOverlay', {
              screen: 'MyShopItemsScreen',
              params: {
                shopName: shopName,
                shopId: shopId,
              },
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
          iconName: 'view-comfy',
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
      title: 'Stocks',
      icon: <StockIcon height={iconSize} width={iconSize}></StockIcon>,
      onPress: () => {
        // navigation.navigate('StockScreen');
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
        console.log('Presed');
      },
    },
  ];

  return (
    <>
      <RowFlexLayout>
        {flexDetailsItems[0].firstRow.map((item, index) => (
          <BubbleCard
            key={index}
            customStyle={{
              flex: 0.46,
              borderColor: colors.background,
            }}
            variant="small"
            title={item.title}
            iconName={item.iconName}
            onPress={item.onPress}></BubbleCard>
        ))}
      </RowFlexLayout>
      <RowFlexLayout>
        {flexDetailsItems[0].secondRow.map((item, index) => (
          <BubbleCard
            key={index}
            customStyle={{
              flex: 0.46,
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
