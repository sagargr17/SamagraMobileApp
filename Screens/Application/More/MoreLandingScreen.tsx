import React, {useEffect} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {clearTokens} from '../../../client/Token/TokenAccess';
import FastImage from '@d11/react-native-fast-image';
import {useNavigation, useTheme} from '@react-navigation/native';
import AppButton from '../../../Components/Elements/Button';
import {TextComponet} from '../../../Components/Elements/TextComponet';
import {BubbleCard} from '../../../Components/Molecules/Cards/BubbleCard';
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
import {UserProfileLandingContainer} from '../../../Components/Organism/UserProfileLandingContainer';
import {ShopProfileUserContainer} from '../../../Components/Organism/ShopProfileUserContainer';
import useGraphQLQuery from '../../../CustomHooks/useQueryEffect';

interface MoreLandingScreenProps {}

export const MoreLandingScreen: React.FC<MoreLandingScreenProps> = ({}) => {
  const {colors} = useTheme();
  const navigation = useNavigation<any>();
  let userLogoutHandle = () => clearTokens();
  const [getLoginUserDataQuery, {data, loading, error}] =
    useLazyQuery(getLoginUser);
  const isShopActive = useAppSelector(state => state.user.isShopActive);

  useEffect(() => {
    getLoginUserDataQuery();

    return () => {};
  }, []);

  console.log('User Profile>>>', data);

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
      {isShopActive ? (
        <ShopProfileUserContainer></ShopProfileUserContainer>
      ) : (
        <UserProfileLandingContainer></UserProfileLandingContainer>
      )}
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
