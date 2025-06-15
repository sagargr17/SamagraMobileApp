import {useQuery} from '@apollo/client';
import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {TextComponet} from '../../../Components/Elements/TextComponet';
import {UserProfileCard} from '../../../Components/Molecules/Cards/UserProfileCard';
import {UserProfileCardSkeleton} from '../../../Components/Skeletons/UserProfileCardSkeleton';
import {ImageNotFound} from '../../../Constants/UI/AssetsUrls';
import {EmptyErrorMessage, NoDataMessage} from '../../../Constants/UI/Messages';
import {myShops} from '../../../GraphQL/Queries/PrivateShopQueries';
import {size} from '../../../Prefrences/Prefrences';
import {useAppDispatch} from '../../../StateManagement/hooks';
import {
  login,
  setUserShopDetail,
} from '../../../StateManagement/User/UserSlice';
interface ProfileSelectScreenProps {}

export const ProfileSelectScreen: React.FC<ProfileSelectScreenProps> = ({}) => {
  const {colors} = useTheme();
  const {data, loading, error} = useQuery(myShops, {
    fetchPolicy: 'cache-first',
  });
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();

  const profileRender = (
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

  if (loading && !data) return profileRender;
  if (error && !data)
    return (
      <TextComponet
        title="Profiles"
        fontVariant="medium"
        fontSizeVariant="display"></TextComponet>
    );

  const profileHandleSelect = (username: string, location: string) => {
    dispatch(
      setUserShopDetail({
        name: username,
        location: location,
      }),
    );
    navigation.navigate('BottomTab', {
      screen: 'More',
    });
  };

  return (
    <View>
      <FlatList
      ListHeaderComponent={<>
      
      
      </>}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          {
            // paddingHorizontal: size.spacing.s,
          }
        }
        ListEmptyComponent={
          <TextComponet
            title={EmptyErrorMessage}
            fontVariant="medium"
            fontSizeVariant="display"></TextComponet>
        }
        data={data?.getShops?.nodes}
        renderItem={({item, index}) => (
          <UserProfileCard
            onCardPressed={() =>
              profileHandleSelect(
                item?.name ?? NoDataMessage,
                item?.location ?? NoDataMessage,
              )
            }
            customStyle={{
              elevation: 0,
              marginBottom: size.spacing.xxs,
              paddingHorizontal: 0,
              borderRadius: 0,
            }}
            user={{
              username: item?.name ?? NoDataMessage,
              profileImageUrl: item?.profileImageUrl?.[0] ?? ImageNotFound,
            }}></UserProfileCard>
        )}
      />
    </View>
  );
};
