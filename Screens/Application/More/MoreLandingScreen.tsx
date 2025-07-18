import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {clearTokens} from '../../../client/Token/TokenAccess';
import {Spacer} from '../../../Components/Elements/Spacer';
import {ProfileCard} from '../../../Components/Molecules/Cards/ProfileCard';
import {ActiveStoreContainer} from '../../../Components/Organism/ActiveStoreContainer';
import {ActiveUserContainer} from '../../../Components/Organism/ActiveUserContainer';
import {MoreLandingSkeleton} from '../../../Components/Skeletons/Layout/MoreLandingSkeleton';
import {ImageNotFound} from '../../../Constants/UI/AssetsUrls';
import {NotMentioned} from '../../../Constants/UI/Messages';
import {size} from '../../../Prefrences/Prefrences';
import {useAppSelector} from '../../../StateManagement/hooks';

interface MoreLandingScreenProps {}

export const MoreLandingScreen: React.FC<MoreLandingScreenProps> = ({}) => {
  const navigation = useNavigation<any>();
  let userLogoutHandle = () => clearTokens();
  const selectedShopData = useAppSelector(state => state.user.shopData);
  const selectedUserData = useAppSelector(state => state.user.Profile);
  const [skeletonLoading, setSkeletonLoading] = useState<boolean>(true);
  // This Parameters check weather Shop is Active or Not
  const isShopActive = useAppSelector(state => state.user.isShopActive);

  // Handle Navigation
  const handleNavigation = () => {
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
        <ProfileCard
          onCardPressed={handleNavigation}
          onIconPress={handleNavigation}
          user={{
            username: userName,
            profileImageUrl: profileImageUrl,
          }}></ProfileCard>
      </View>
    );
  };

  useEffect(() => {
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
      <Spacer height={10}></Spacer>

      {isShopActive && selectedShopData?.shopId ? (
        <ActiveStoreContainer
          shopId={selectedShopData?.shopId}></ActiveStoreContainer>
      ) : (
        <ActiveUserContainer></ActiveUserContainer>
      )}
    </ScrollView>
  );
};
