import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {ScrollView, View} from 'react-native';
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
      <View>
        <AppButton
          textColor={colors.text}
          onPress={userLogoutHandle}
          style={{
            backgroundColor: '#C0C0C0',
            // marginTop: size.spacing.xxl,
            marginBottom: size.spacing.s,
            borderRadius: 0,
            // position: 'absolute',
            // bottom: 0,
          }}>
          Logout
        </AppButton>
      </View>
    </ScrollView>
  );
};
