import {useLazyQuery, useQuery} from '@apollo/client';
import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {TextComponet} from '../../../Components/Elements/TextComponet';
import {UserProfileCard} from '../../../Components/Molecules/Cards/UserProfileCard';
import {UserProfileCardSkeleton} from '../../../Components/Skeletons/UserProfileCardSkeleton';
import {ImageNotFound} from '../../../Constants/UI/AssetsUrls';
import {
  EmptyLaundnryErrorMessage,
  NotMentioned,
} from '../../../Constants/UI/Messages';
import {myShops} from '../../../GraphQL/Queries/PrivateShopQueries';
import {size} from '../../../Prefrences/Prefrences';
import {useAppDispatch, useAppSelector} from '../../../StateManagement/hooks';
import {
  login,
  setUserShopDetail,
} from '../../../StateManagement/User/UserSlice';
import {getLoginUser} from '../../../GraphQL/Queries/UserQueries';
interface ProfileSelectScreenProps {}

export const ProfileSelectScreen: React.FC<ProfileSelectScreenProps> = ({}) => {
  const {colors} = useTheme();
  const {data, loading, error} = useQuery(myShops, {
    fetchPolicy: 'cache-first',
  });
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();
  const userData = useAppSelector(state => state.user.user);

  const navigationHandle = () => {
    navigation.navigate('BottomTab', {
      screen: 'More',
    });
  };

  const profileSkeleton = (
    <View
      style={{
        paddingHorizontal: size.spacing.s,
      }}>
      <UserProfileCardSkeleton></UserProfileCardSkeleton>
      <UserProfileCardSkeleton></UserProfileCardSkeleton>
      <UserProfileCardSkeleton></UserProfileCardSkeleton>
      <UserProfileCardSkeleton></UserProfileCardSkeleton>
      <UserProfileCardSkeleton></UserProfileCardSkeleton>
      <UserProfileCardSkeleton></UserProfileCardSkeleton>
      <UserProfileCardSkeleton></UserProfileCardSkeleton>
    </View>
  );

  if (loading && !data) return profileSkeleton;
  if (error && !data)
    return (
      <TextComponet
        title="Profiles"
        fontVariant="medium"
        fontSizeVariant="display"></TextComponet>
    );

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
    dispatch(
      login({
        user: {
          username: userData?.username ?? NotMentioned,
          pofileImageUrl: ImageNotFound,
          email: 'sagar@gmail.com',
          location: 'butwal',
        },
      }),
    );
    navigationHandle();
  };

  return (
    <FlatList
      ListHeaderComponent={
        <>
          <UserProfileCard
            onCardPressed={() => handleUserSelect()}
            customStyle={{
              elevation: 0,
              marginBottom: size.spacing.xxs,
              paddingHorizontal: 0,
              borderRadius: 0,
            }}
            user={{
              username: userData?.username ?? NotMentioned,
              profileImageUrl: ImageNotFound,
            }}></UserProfileCard>
        </>
      }
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: size.spacing.xxs,
      }}
      ListEmptyComponent={
        <TextComponet
          title={EmptyLaundnryErrorMessage}
          fontVariant="medium"
          fontSizeVariant="display"></TextComponet>
      }
      data={data?.getShops?.nodes}
      renderItem={({item, index}) => (
        <UserProfileCard
          onCardPressed={() =>
            profileHandleSelect(
              item?.id ?? NotMentioned,
              item?.name ?? NotMentioned,
              item?.location ?? NotMentioned,
            )
          }
          customStyle={{
            elevation: 0,
            marginBottom: size.spacing.xxs,
            paddingHorizontal: size.spacing.s,
            borderRadius: 0,
          }}
          user={{
            username: item?.name ?? NotMentioned,
            profileImageUrl: item?.profileImageUrl?.[0] ?? ImageNotFound,
          }}></UserProfileCard>
      )}
    />
  );
};
