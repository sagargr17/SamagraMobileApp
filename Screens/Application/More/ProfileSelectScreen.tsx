import {NetworkStatus, useQuery} from '@apollo/client';
import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Text} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {AppText} from '../../../Components/Elements/AppText';
import {UserProfileCard} from '../../../Components/Molecules/Cards/UserProfileCard';
import {ListCardSkeleton} from '../../../Components/Skeletons/Layout/ListCardSkeleton';
import {ImageNotFound} from '../../../Constants/UI/AssetsUrls';
import {EmptyMessage, NotMentioned} from '../../../Constants/UI/Messages';
import {myShops} from '../../../GraphQL/Queries/PrivateShopQueries';
import {size} from '../../../Prefrences/Prefrences';
import {useAppDispatch, useAppSelector} from '../../../StateManagement/hooks';
import {
  login,
  setShopState,
  setUserShopDetail,
} from '../../../StateManagement/User/UserSlice';
import {titleCase} from '../../../Utilities/CustomMethods';
import {SamagraLoader} from '../../../Components/Molecules/Response/SamagraLoader';
interface ProfileSelectScreenProps {}

export const ProfileSelectScreen: React.FC<ProfileSelectScreenProps> = ({}) => {
  const {colors} = useTheme();
  const {data, loading, error, networkStatus, fetchMore, refetch} = useQuery(
    myShops,
    {
      notifyOnNetworkStatusChange: true,
      variables: {after: null},
      onCompleted: () => {
        setPaginationLoading(false);
      },
      onError: () => {
        setPaginationLoading(false);
      },
      fetchPolicy: 'cache-and-network',
    },
  );
  const selectedTab = useAppSelector(state => state.user.shopData?.name);
  const isShopActive = useAppSelector(state => state.user.isShopActive);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();
  const userData = useAppSelector(state => state.user.Profile);
  const [paginationLoading, setPaginationLoading] = useState<boolean>(false);

  const isLoadingInitialData =
    loading && !data && networkStatus === NetworkStatus.loading;

  const isFetchingMore =
    networkStatus === NetworkStatus.fetchMore || paginationLoading;

  // Navigation Handle
  const navigationHandle = () => {
    navigation.navigate('BottomTab', {
      screen: 'More',
    });
  };

  if (loading && !data)
    return <ListCardSkeleton numberOfList={7}></ListCardSkeleton>;

  if (error && !data) return <Text>{error.message}</Text>;
  if (error && !data) console.log('Error::::', error);

  const profileHandleSelect = (
    shopId: string,
    username: string,
    location: string,
  ) => {
    dispatch(
      setUserShopDetail({
        shopId: shopId,
        name: username,
        location: location,
      }),
    );
    navigationHandle();
  };

  const handleUserSelect = () => {
    dispatch(setShopState(false));
    navigationHandle();
  };

  return (
    <FlatList
      onRefresh={() => {
        refetch();
      }}
      refreshing
      onEndReached={() => {
        if (data?.getShops?.pageInfo.hasNextPage && !isFetchingMore) {
          fetchMore({
            variables: {after: data?.getShops?.pageInfo.endCursor},
          });
        }
      }}
      onEndReachedThreshold={0.6}
      ListHeaderComponent={
        <UserProfileCard
          onCardPressed={() => handleUserSelect()}
          customStyle={{
            elevation: 0,
            // marginBottom: size.spacing.xxs,
            borderRadius: 0,
            borderColor: isShopActive === false ? colors.primary : colors.card,
            // borderWidth: size.borderWidth.xs,
          }}
          user={{
            username: titleCase(userData?.username ?? NotMentioned),
            profileImageUrl: ImageNotFound,
          }}></UserProfileCard>
      }
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: size.spacing.xxs,
      }}
      ListEmptyComponent={
        <AppText
          title={'No Any Shop Found !!'}
          fontVariant="medium"
          fontSizeVariant="display"></AppText>
      }
      data={data?.getShops?.edges}
      renderItem={({item, index}) => (
        <UserProfileCard
          onCardPressed={() =>
            profileHandleSelect(
              item?.node?.id ?? NotMentioned,
              item?.node?.name ?? NotMentioned,
              item?.node?.location ?? NotMentioned,
            )
          }
          customStyle={{
            elevation: 0,
            // marginBottom: size.spacing.xxs,
            paddingHorizontal: size.spacing.s,
            borderColor:
              item?.node?.name === selectedTab && isShopActive
                ? colors.primary
                : colors.card,
            backgroundColor:
              item?.node?.name === selectedTab && isShopActive
                ? '#f7fcf7'
                : colors.card,
            borderWidth: size.borderWidth.s,
            paddingVertical: size.spacing.s + 2,
            // borderRadius: 0,
          }}
          user={{
            username: item?.node?.name ?? NotMentioned,
            profileImageUrl: item?.node?.profileImageUrl?.[0] ?? ImageNotFound,
          }}></UserProfileCard>
      )}
      ListFooterComponent={isFetchingMore ? <SamagraLoader /> : null}
    />
  );
};
