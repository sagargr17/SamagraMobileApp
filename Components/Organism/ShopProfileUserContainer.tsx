import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';

import {useMutation} from '@apollo/client';
import {Alert, StyleSheet, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {Logos} from '../../Assets/SVG/Exports/Exports';
import {WentwrongMessage} from '../../Constants/UI/Messages';
import {deleteStore} from '../../GraphQL/Mutation/ShopMutations';
import {RowFlexLayout} from '../../Layout/PartationLayout/RowFlexLayout';
import {responseTheme, size} from '../../Prefrences/Prefrences';
import {useAppDispatch, useAppSelector} from '../../StateManagement/hooks';
import {AppText} from '../Elements/AppText';
import {Spacer} from '../Elements/Spacer';
import {BubbleCard} from '../Molecules/Cards/BubbleCard';
import {showLoader} from '../../StateManagement/Error&loadingHandle/LoaderStateSlice';
import {SamagraLoader} from '../Molecules/Response/SamagraLoader';

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
  const dispatch = useAppDispatch();
  const [removeStoreFn] = useMutation(deleteStore);

  const handleRemoveStore = async () => {
    dispatch(showLoader());
    try {
      let response = await removeStoreFn({
        variables: {
          id: shopId,
        },
      });

      if (response.data) {
        showMessage(
          responseTheme(
            'SuccessFully Store Removed',
            'Navigating to Profile',
            'success',
          ),
        );
        navigation.navigate('ApplicationOverlay', {
          screen: 'SelectProfile',
        });
      }
      if (response.errors) {
        showMessage(
          responseTheme(
            response.errors[0].message,
            'Please try again later!',
            'danger',
          ),
        );
      }
    } catch (e) {
      showMessage(
        responseTheme(WentwrongMessage, 'Please try again later!', 'danger'),
      );
    }
  };

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
        handleRemoveStore();
      },
    },
  ];

  return (
    <>
      <RowFlexLayout
        customStyle={{
          // justifyContent: 'space-around',
        }}>
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
        customStyle={{
          // justifyContent: 'space-around',
        }}>
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
