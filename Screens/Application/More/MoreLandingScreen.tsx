import {
  useFocusEffect,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {BackHandler, ScrollView, View} from 'react-native';
import {clearTokens} from '../../../client/Token/TokenAccess';
import AppButton from '../../../Components/Elements/Button';
import {Spacer} from '../../../Components/Elements/Spacer';
import {UserProfileCard} from '../../../Components/Molecules/Cards/UserProfileCard';
import {ShopProfileUserContainer} from '../../../Components/Organism/ShopProfileUserContainer';
import {UserProfileLandingContainer} from '../../../Components/Organism/UserProfileLandingContainer';
import {ImageNotFound} from '../../../Constants/UI/AssetsUrls';
import {NotMentioned} from '../../../Constants/UI/Messages';
import {size} from '../../../Prefrences/Prefrences';
import {useAppSelector} from '../../../StateManagement/hooks';
import {MoreLandingSkeleton} from '../../../Components/Skeletons/Layout/MoreLandingSkeleton';

interface MoreLandingScreenProps {}

export const MoreLandingScreen: React.FC<MoreLandingScreenProps> = ({}) => {
  const {colors} = useTheme();
  const navigation = useNavigation<any>();
  let userLogoutHandle = () => clearTokens();
  const selectedShopData = useAppSelector(state => state.user.shopData);
  const selectedUserData = useAppSelector(state => state.user.user);
  const [skeletonLoading, setSkeletonLoading] = useState<boolean>(true);
  // This Parameters check weather Shop is Active or Not
  const isShopActive = useAppSelector(state => state.user.isShopActive);

  // Handle Navigation
  const handleNavigation = () => {
    console.log('cliked');
    navigation.navigate('ApplicationOverlay', {
      screen: 'SelectProfile',
    });
  };

  // This is the Header of the User Container Handler
  const headerUserProfileCard = (userName: string, profileImageUrl: string) => {
    return (
      <View
        style={{
          marginTop: size.spacing.xs,
        }}>
        <UserProfileCard
          onIconPress={handleNavigation}
          user={{
            username: userName,
            profileImageUrl: profileImageUrl,
          }}></UserProfileCard>
      </View>
    );
  };

  useEffect(() => {
    console.log('Intervall is called');

    const timer = setTimeout(() => {
      setSkeletonLoading(!setSkeletonLoading);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (skeletonLoading) return <MoreLandingSkeleton></MoreLandingSkeleton>;

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
    </ScrollView>
  );
};
