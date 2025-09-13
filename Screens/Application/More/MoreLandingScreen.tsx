import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {clearTokens} from '../../../client/Token/TokenAccess';
import {SpacerElement} from '../../../Components/Elements/SpacerElement';
import {ProfileCardMolecule} from '../../../Components/Molecules/Cards/ProfileCardMolecule';
import {UserContainer} from '../../../Components/Organism/ApplicationOverLays/More/UserContainerOrganism';
import {MoreLandingSkeleton} from '../../../Components/Skeletons/Layout/MoreLandingSkeleton';
import {ImageNotFound} from '../../../Constants/UI/AssetsUrls';
import {NotMentioned} from '../../../Constants/UI/Messages';
import {size} from '../../../Prefrences/Prefrences';
import {useAppSelector} from '../../../StateManagement/hooks';
import DropShadow from 'react-native-drop-shadow';

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
      <DropShadow
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 1,
            height: 2,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.5,
        }}>
        <View
          style={{
            marginTop: size.spacing.m,
            marginBottom: size.spacing.xs,
          }}>
          <ProfileCardMolecule
            customStyle={{
              borderWidth: 1,
              borderColor: '#DBE0E5',
            }}
            user={{
              username: userName,
              profileImageUrl: profileImageUrl,
            }}></ProfileCardMolecule>
        </View>
      </DropShadow>
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
        marginHorizontal: size.spacing.s,
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
      <SpacerElement height={10}></SpacerElement>
      <UserContainer></UserContainer>
    </ScrollView>
  );
};
