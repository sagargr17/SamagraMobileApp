import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {BubbleCard} from '../Molecules/Cards/BubbleCard';
import AppButton from '../Elements/Button';
import {size} from '../../Prefrences/Prefrences';
import {clearTokens} from '../../client/Token/TokenAccess';
import {RowFlexLayout} from '../../Layout/PartationLayout/RowFlexLayout';
import {Switch} from 'react-native-paper';
import {AppText} from '../Elements/AppText';
import {Spacer} from '../Elements/Spacer';
import {store} from '../../StateManagement/Store';
import {useAppDispatch, useAppSelector} from '../../StateManagement/hooks';
import {showLoader} from '../../StateManagement/Error&loadingHandle/LoaderStateSlice';
import {setUserMode} from '../../StateManagement/User/UserSlice';
interface UserProfileMoreScreenProps {}

export const UserProfileLandingContainer: React.FC<
  UserProfileMoreScreenProps
> = ({}) => {
  const navigation = useNavigation<any>();
  const userLogoutHandle = () => clearTokens();
  const isUserServiceMode = useAppSelector(
    state => state.user.UserMode.isUserServiceMode,
  );
  const dispatch = useAppDispatch();
  const onToggleSwitch = () => {
    dispatch(setUserMode());
  };

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
          title: 'Services',
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
      onPress: () => {
        navigation.navigate('ApplicationOverlay', {
          screen: 'MyShopsScreen',
        });
      },
      title: "Manage Profile's",
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
      <Spacer height={20}></Spacer>
      <RowFlexLayout
        customStyle={{
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: size.borderRadius.m,
          padding: size.spacing.s,
        }}>
        <AppText
          title={isUserServiceMode ? '" Product Mode "' : '" Service Mode "'}
          fontVariant="heavy"
          fontSizeVariant="title"
          customStyle={{
            fontStyle: 'italic',
            color: isUserServiceMode ? colors.primary : '#0e46a1',
          }}></AppText>
        <Switch
          color={colors.primary}
          value={true}
          onValueChange={onToggleSwitch}></Switch>
      </RowFlexLayout>
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
