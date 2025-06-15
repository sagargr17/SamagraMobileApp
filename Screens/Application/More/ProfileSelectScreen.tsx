import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {TextComponet} from '../../../Components/Elements/TextComponet';
import {PoppedCard} from '../../../Components/Molecules/Cards/PoppedCard';
import {useQuery} from '@apollo/client';
import {myShops} from '../../../GraphQL/Queries/PrivateShopQueries';
import {UserProfileCardSkeleton} from '../../../Components/Skeletons/UserProfileCardSkeleton';
import {FlatList} from 'react-native-gesture-handler';
import {EmptyErrorMessage, NoDataMessage} from '../../../Constants/UI/Messages';
import {UserProfileCard} from '../../../Components/Molecules/Cards/UserProfileCard';
import {ImageNotFound} from '../../../Constants/UI/AssetsUrls';
import {size} from '../../../Prefrences/Prefrences';
interface ProfileSelectScreenProps {}

export const ProfileSelectScreen: React.FC<ProfileSelectScreenProps> = ({}) => {
  const {colors} = useTheme();
  const {data, loading, error} = useQuery(myShops, {
    fetchPolicy: 'cache-first',
  });

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

  return (
    <View>
      <FlatList
        contentContainerStyle={{
          paddingHorizontal: size.spacing.s,
        }}
        ListEmptyComponent={
          <TextComponet
            title={EmptyErrorMessage}
            fontVariant="medium"
            fontSizeVariant="display"></TextComponet>
        }
        data={data?.getShops?.nodes}
        renderItem={({item, index}) => (
          <UserProfileCard
            customStyle={size.elevation.xs}
            user={{
              username: item?.name ?? NoDataMessage,
              profileImageUrl: item?.profileImageUrl?.[0] ?? ImageNotFound,
            }}></UserProfileCard>
        )}
      />
    </View>
  );
};
