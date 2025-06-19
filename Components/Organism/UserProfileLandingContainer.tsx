import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {BubbleCard} from '../Molecules/Cards/BubbleCard';
import AppButton from '../Elements/Button';
import {size} from '../../Prefrences/Prefrences';
import {clearTokens} from '../../client/Token/TokenAccess';
interface UserProfileMoreScreenProps {}

export const UserProfileLandingContainer: React.FC<
  UserProfileMoreScreenProps
> = ({}) => {
  const navigation = useNavigation<any>();
  const userLogoutHandle = () => clearTokens();

  // Flex Container
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
          title: 'Add Shop',
          iconName: 'store-plus',
          onPress: () => {
            console.log('pressed');
            navigation.navigate('ApplicationOverlay', {
              screen: 'AddShopScreen',
            });
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
          title: 'Live Orders',
          iconName: 'view-comfy',
          onPress: () =>
            navigation.navigate('ApplicationOverlay', {
              screen: 'OrderListScreen',
            }),
        },
      ],
    },
  ];
  // Column Navigation
  const columnDetailsList = [
    {
      title: 'Services',
      iconName: 'account-hard-hat',
      onPress: () => {
        navigation.navigate('ApplicationOverlay', {
          screen: 'MyShopItemsScreen',
          params: {
            name: 'Hamro Shop',
          },
        });
      },
      comment: 'Stocks,Orders & Other  Management',
    },
    {
      onPress: () => {
        navigation.navigate('ApplicationOverlay', {
          screen: 'MyShopsScreen',
        });
      },
      title: 'Manage Store',
      variant: 'large',
      comment: 'Shops, Details and management ',
      iconName: 'store-edit',
    },
    {
      onPress: () => console.log('Error'),
      title: 'Personal Account',
      variant: 'large',
      comment: 'Profile, Update User',
      iconName: 'account',
    },
    {
      onPress: () => console.log('Error'),
      title: 'App Setting',
      variant: 'large',
      comment: 'Personal & Shop Setting',
      iconName: 'wrench',
    },
  ];
  const {colors} = useTheme();
  return (
    <>
      <View style={styles.flexcontainer}>
        {flexDetailsItems[0].firstRow.map((item, index) => (
          <BubbleCard
            key={index}
            customStyle={{
              flex: 0.48,
            }}
            variant="small"
            title={item.title}
            iconName={item.iconName}
            onPress={item.onPress}></BubbleCard>
        ))}
      </View>
      <View style={styles.flexcontainer}>
        {flexDetailsItems[0].secondRow.map((item, index) => (
          <BubbleCard
            key={index}
            customStyle={{
              flex: 0.48,
            }}
            variant="small"
            title={item.title}
            iconName={item.iconName}
            onPress={item.onPress}></BubbleCard>
        ))}
      </View>

      <View>
        {columnDetailsList.map((item, index) => (
          <BubbleCard
            key={index}
            variant="large"
            title={item.title}
            iconName={item.iconName}
            onPress={item.onPress}
            comment={item.comment}></BubbleCard>
        ))}
      </View>
      <AppButton
        textColor={colors.text}
        onPress={userLogoutHandle}
        style={{
          backgroundColor: '#C0C0C0',
          marginTop: size.spacing.m,
          marginBottom: size.spacing.xxs,
          borderRadius: size.spacing.s,
        }}>
        Logout
      </AppButton>
    </>
  );
};

const styles = StyleSheet.create({
  flexcontainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
