import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';

import {Logos} from '../../Assets/SVG/Exports/Exports';
import {RowFlexLayout} from '../../Layout/PartationLayout/RowFlexLayout';
import {size} from '../../Prefrences/Prefrences';
import {BubbleCard} from '../Molecules/Cards/BubbleCard';
import {TextComponet} from '../Elements/TextComponet';
import {StyleSheet, View} from 'react-native';
import {Spacer} from '../Elements/Spacer';

interface ShopProfileUserContainerProps {}

export const ShopProfileUserContainer: React.FC<
  ShopProfileUserContainerProps
> = ({}) => {
  const {colors} = useTheme();
  const navigation = useNavigation<any>();
  const {PenIcon, DustbinIcon, StockIcon, PlusIcon} = Logos;
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
          onPress: () => console.log('rect'),

          // navigation.navigate('ApplicationOverlay', {
          //   screen: 'OrderListScreen',
          // }),
        },
      ],
    },
  ];

  const columnlist = [
    {
      title: 'Add Item',
      icon: (
        <PlusIcon
          height={size.iconSize.medium}
          width={size.iconSize.medium}></PlusIcon>
      ),
      onPress: () => {
        console.log('Presed');
      },
    },
    {
      title: 'Edit',
      icon: (
        <PenIcon
          height={size.iconSize.medium}
          width={size.iconSize.medium}></PenIcon>
      ),
      onPress: () => {
        console.log('Presed');
      },
    },
    {
      title: 'Stock',
      icon: (
        <StockIcon
          height={size.iconSize.medium}
          width={size.iconSize.medium}></StockIcon>
      ),
      onPress: () => {
        console.log('Presed');
      },
    },
    {
      title: 'Delete Shop',
      icon: (
        <DustbinIcon
          height={size.iconSize.medium}
          width={size.iconSize.medium}></DustbinIcon>
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
