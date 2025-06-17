import React, {useEffect} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {clearTokens} from '../../../client/Token/TokenAccess';
import FastImage from '@d11/react-native-fast-image';
import {useNavigation, useTheme} from '@react-navigation/native';
import AppButton from '../../../Components/Elements/Button';
import {TextComponet} from '../../../Components/Elements/TextComponet';
import {BubbleCard} from '../../../Components/Molecules/Cards/BubbleCard';
import {AreaMapper} from '../../../Utilities/CustomMethods';
import {useAppDispatch, useAppSelector} from '../../../StateManagement/hooks';
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
import {login} from '../../../StateManagement/User/UserSlice';
import {NotMentioned} from '../../../Constants/UI/Messages';

interface MoreLandingScreenProps {}

export const MoreLandingScreen: React.FC<MoreLandingScreenProps> = ({}) => {
  const {colors} = useTheme();
  const navigation = useNavigation<any>();
  let userLogoutHandle = () => clearTokens();
  const selectedShopData = useAppSelector(state => state.user.shopData);
  const selectedUserData = useAppSelector(state => state.user.user);

  // This Parameters check weather Shop is Active or Not
  const isShopActive = useAppSelector(state => state.user.isShopActive);

  const handleNavigation = () => {
    console.log('cliked');
    navigation.navigate('ApplicationOverlay', {
      screen: 'SelectProfile',
    });
  };

  // This is the Header of the User Container Handler
  const headerUserProfileCard = (userName: string, profileImageUrl: string) => {
    return (
      <UserProfileCard
        onIconPress={handleNavigation}
        user={{
          username: userName,
          profileImageUrl: profileImageUrl,
        }}></UserProfileCard>
    );
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        paddingBottom: size.spacing.xxl,
        paddingHorizontal: size.spacing.xs,
      }}>
      <>
        {!isShopActive && selectedUserData
          ? headerUserProfileCard(
              selectedUserData?.username ?? NotMentioned,
              ImageNotFound,
            )
          : headerUserProfileCard(
              selectedShopData?.name ?? NotMentioned,
              ImageNotFound,
            )}
      </>
      <Spacer height={25}></Spacer>
      {isShopActive && selectedShopData?.shopId ? (
        <ShopProfileUserContainer
          shopId={selectedShopData?.shopId}></ShopProfileUserContainer>
      ) : (
        <UserProfileLandingContainer></UserProfileLandingContainer>
      )}
      {/* App Button */}
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
