import {gql, useLazyQuery, useQuery} from '@apollo/client';
import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
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
  setUserShopDetail,
} from '../../../StateManagement/User/UserSlice';
import {getLoginUser} from '../../../GraphQL/Queries/UserQueries';
import {SingnlePageInfo} from '../../../Components/Organism/SinglePageInfo';
import {GetAuthenticateClient} from '../../../client/Graphql/AuthenticatedClient';
import useGraphQLQuery from '../../../CustomHooks/useQueryEffect';
import {titleCase} from '../../../Utilities/CustomMethods';
interface ProfileSelectScreenProps {}

export const ProfileSelectScreen: React.FC<ProfileSelectScreenProps> = ({}) => {
  const {colors} = useTheme();
  const {} = useTheme();

  const {data, loading, error, refetch} = useQuery(myShops, {
    fetchPolicy: 'network-only',
  });

  const authenticateClient = GetAuthenticateClient;
  const selectedTab = useAppSelector(state => state.user.shopData?.name);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();
  const userData = useAppSelector(state => state.user.user);

  useEffect(() => {
    refetch();
  }, []);

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
    dispatch(
      login({
        user: {
          username: userData?.username ?? NotMentioned,
          pofileImageUrl: ImageNotFound,
          email: 'sagar@gmail.com',
          Userlocation: 'butwal',
          phoneNumber: '9841150390',
        },
      }),
    );
    navigationHandle();
  };

  return (
    <FlatList
      ListHeaderComponent={
        <UserProfileCard
          onCardPressed={() => handleUserSelect()}
          customStyle={{
            elevation: 0,
            marginBottom: size.spacing.xxs,
            paddingHorizontal: 0,
            borderRadius: 0,
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
          title={EmptyMessage}
          fontVariant="medium"
          fontSizeVariant="display"></AppText>
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
            borderColor:
              item?.name === selectedTab ? colors.notification : colors.card,
            borderWidth: size.borderWidth.xs,
            paddingVertical: size.spacing.m,
          }}
          user={{
            username: item?.name ?? NotMentioned,
            profileImageUrl: item?.profileImageUrl?.[0] ?? ImageNotFound,
          }}></UserProfileCard>
      )}
    />
  );
};
