import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';

import {Logos} from '../../Assets/SVG/Exports/Exports';
import {RowFlexLayout} from '../../Layout/PartationLayout/RowFlexLayout';
import {size} from '../../Prefrences/Prefrences';
import {BubbleCard} from '../Molecules/Cards/BubbleCard';
import {TextComponet} from '../Elements/TextComponet';
import {StyleSheet, View} from 'react-native';
import {Spacer} from '../Elements/Spacer';
import {TouchableRipple} from 'react-native-paper';
import {
  AddItemScreenRouteProp,
  ApplicationOverlayStackNavigationProp,
} from '../../Navigators/Stack/ApplicationOverlayStackNavigator';

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
          title: ' Activity',
          iconName: 'chart-bar-stacked',
          onPress: () => {
            console.log('Presed');
          },
        },
      ],
      secondRow: [
        {
          title: 'Favourite',
          iconName: 'heart-outline',
          onPress: () => {
            console.log('Presed');
          },
        },

        {
          title: 'Recent',
          iconName: 'view-comfy',
          onPress: () => {},
        },
      ],
    },
  ];

  const columnlist = [
    {
      title: 'Add Item',
      icon: <PlusIcon height={iconSize} width={iconSize}></PlusIcon>,
      onPress: () => {
        console.log(':::::');
        navigation.navigate('ApplicationOverlay', {
          screen: 'AddItemScreen',
          params: {
            shopId: '1',
          },
        });
      },
    },
    {
      title: 'Edit',
      icon: <PenIcon height={iconSize} width={iconSize}></PenIcon>,
      onPress: () => {
        console.log('Presed');
      },
    },
    {
      title: 'Stock',
      icon: <StockIcon height={iconSize} width={iconSize}></StockIcon>,
      onPress: () => {
        console.log('Presed');
      },
    },
    {
      title: 'Delete Shop',
      icon: <DustbinIcon height={iconSize} width={iconSize}></DustbinIcon>,
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
          <TextComponet title={item.title} />
        </RowFlexLayout>
      ))}
    </>
  );
};

const styles = StyleSheet.create({});
