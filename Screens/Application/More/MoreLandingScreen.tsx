import React, {useEffect} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {clearTokens} from '../../../client/Token/TokenAccess';
import FastImage from '@d11/react-native-fast-image';
import {useNavigation, useTheme} from '@react-navigation/native';
import AppButton from '../../../Components/Elements/Button';
import {TextComponet} from '../../../Components/Elements/TextComponet';
import {PoppedCard} from '../../../Components/Sections/Cards/PoppedCard';
import {AreaMapper} from '../../../Utilities/CustomMethods';
import {useAppSelector} from '../../../StateManagement/hooks';
import {useLazyQuery, useQuery} from '@apollo/client';
import {getLoginUser} from '../../../GraphQL/Queries/UserQueries';
import {ActivityIndicator} from 'react-native-paper';
import {ProviderCardSkeleton} from '../../../Components/Sections/RequestHandling/Loading/Skeletons/ProviderCardSkeleton';
import {UserProfileMiniCard} from '../../../Components/Sections/Cards/UserProfileMiniCard';

interface MoreLandingScreenProps {}

const flexDetailsItems = [
  {
    firstRow: [
      {
        title: 'History',
        iconName: 'history',
      },
      {
        title: ' Activity',
        iconName: 'chart-bar-stacked',
      },
    ],
    secondRow: [
      {
        title: 'Favourite',
        iconName: 'heart-outline',
      },
      {
        title: 'recent',
        iconName: 'view-comfy',
      },
    ],
  },
];

export const MoreLandingScreen: React.FC<MoreLandingScreenProps> = ({}) => {
  const {colors} = useTheme();
  const navigation = useNavigation<any>();
  let userLogoutHandle = () => clearTokens();
  const [getLoginUserQuery, {data, loading, error}] =
    useLazyQuery(getLoginUser);

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

  return (
    <ScrollView
      style={{
        padding: AreaMapper({
          value: 10,
          scaleBy: 'average',
        }),
      }}>
      {loading ?? <ActivityIndicator color="orange"></ActivityIndicator>}
      {error ? <ActivityIndicator color="red"></ActivityIndicator> : null}
      {data && data.getUser && data.getUser.username ? (
        <UserProfileMiniCard
          user={{
            username: data.getUser?.username,
            profileImageUrl: data.getUser.pofileImageUrl
              ? data.getUser.pofileImageUrl
              : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          }}></UserProfileMiniCard>
      ) : (
        <ProviderCardSkeleton></ProviderCardSkeleton>
      )}

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',

          justifyContent: 'space-between',
          marginTop: 8,
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
            onPress={() => {
              // console.log
            }}></PoppedCard>
        ))}
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',

          justifyContent: 'space-between',
          marginTop: 8,
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
            iconName={item.iconName}></PoppedCard>
        ))}
      </View>

      <View
        style={{
          marginVertical: AreaMapper({
            value: 4,
            scaleBy: 'average',
          }),
        }}>
        {columnDetailsList.map((item, index) => (
          <PoppedCard
            key={index}
            variant="large"
            title={item.title}
            iconName={item.iconName}
            onPress={item.onPress}
            comment={item.comment}></PoppedCard>
        ))}

        <AppButton onPress={userLogoutHandle} color="danger">
          Logout
        </AppButton>
      </View>
    </ScrollView>
  );
};
