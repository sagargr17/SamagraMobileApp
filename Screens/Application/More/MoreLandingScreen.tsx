import React, {useEffect} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {clearTokens} from '../../../client/Token/TokenAccess';
import FastImage from '@d11/react-native-fast-image';
import {useNavigation, useTheme} from '@react-navigation/native';
import AppButton from '../../../Components/Elements/Button';
import {TextComponet} from '../../../Components/Elements/TextComponet';
import {PoppedCard} from '../../../Components/Molecules/Cards/PoppedCard';
import {AreaMapper} from '../../../Utilities/CustomMethods';
import {useAppSelector} from '../../../StateManagement/hooks';
import {useLazyQuery, useQuery} from '@apollo/client';
import {getLoginUser} from '../../../GraphQL/Queries/UserQueries';
import {ActivityIndicator} from 'react-native-paper';
import {ProviderCardSkeleton} from '../../../Components/Skeletons/ProviderCardSkeleton';
import {UserProfileCard} from '../../../Components/Molecules/Cards/UserProfileCard';
import {ImageNotFound} from '../../../Constants/UI/AssetsUrls';
import {size} from '../../../Prefrences/Prefrences';
import {UserProfileCardSkeleton} from '../../../Components/Skeletons/UserProfileCardSkeleton';
import {Spacer} from '../../../Components/Elements/Spacer';

interface MoreLandingScreenProps {}

export const MoreLandingScreen: React.FC<MoreLandingScreenProps> = ({}) => {
  const {colors} = useTheme();
  const navigation = useNavigation<any>();
  let userLogoutHandle = () => clearTokens();
  const [getLoginUserQuery, {data, loading, error}] =
    useLazyQuery(getLoginUser);

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
      title: 'Quick Access',
      iconName: 'basket-unfill',
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
      iconName: 'store',
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

  useEffect(() => {
    getLoginUserQuery();

    return () => {};
  }, []);

  // Handle Navigation
  const handleNavigation = () => {
    console.log('cliked');

    navigation.navigate('ApplicationOverlay', {
      screen: 'SelectProfile',
    });
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        paddingBottom: size.spacing.xxl,
        paddingHorizontal: size.spacing.xs,
      }}>
      {loading ?? <ActivityIndicator color="orange"></ActivityIndicator>}
      {error ? <ActivityIndicator color="red"></ActivityIndicator> : null}
      {data && data.getUser && data.getUser.username ? (
        <UserProfileCard
          onIconPress={handleNavigation}
          user={{
            username: data.getUser?.username,
            profileImageUrl:
              data?.getUser?.profileImageUrl?.[0] ?? ImageNotFound,
          }}></UserProfileCard>
      ) : (
        <UserProfileCardSkeleton></UserProfileCardSkeleton>
      )}
      <Spacer height={25}></Spacer>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        {flexDetailsItems[0].firstRow.map((item, index) => (
          <PoppedCard
            key={Math.random()}
            customStyle={{
              flex: 0.48,
            }}
            variant="small"
            title={item.title}
            iconName={item.iconName}
            onPress={item.onPress}></PoppedCard>
        ))}
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        {flexDetailsItems[0].secondRow.map((item, index) => (
          <PoppedCard
            key={index}
            customStyle={{
              flex: 0.48,
            }}
            variant="small"
            title={item.title}
            iconName={item.iconName}
            onPress={item.onPress}></PoppedCard>
        ))}
      </View>

      <View>
        {columnDetailsList.map((item, index) => (
          <PoppedCard
            key={index}
            variant="large"
            title={item.title}
            iconName={item.iconName}
            onPress={item.onPress}
            comment={item.comment}></PoppedCard>
        ))}
      </View>

      <AppButton
        textColor={colors.text}
        onPress={userLogoutHandle}
        style={{
          marginTop: size.spacing.xxl,
          marginBottom: size.spacing.s,
          backgroundColor: '#C0C0C0',
        }}>
        Logout
      </AppButton>
    </ScrollView>
  );
};
