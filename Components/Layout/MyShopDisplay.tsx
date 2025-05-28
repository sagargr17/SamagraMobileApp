import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {SamagraScaller} from '../../Utilities/CustomMethods';
import {ScrollView} from 'react-native-gesture-handler';
import {PoppedCard} from '../Sections/Cards/PoppedCard';
import {SamagraBottomSheet} from '../Sections/SamagraBottomSheet';
import {Badge, Icon, Surface} from 'react-native-paper';
import FastImage from '@d11/react-native-fast-image';
import {TextComponet} from '../Elements/TextComponet';
import AppButton from '../Elements/Button';
interface MyShopDisplayProps {
  shop: {
    name: string;
    aboutShop: string;
    stars: {
      stars: number;
    };
    location: string;
    phoneNumber: string;
    profileImageUrl: string;
  };
  navigationHandles?: {
    onProductNavigationHandle?: () => void;
    onServiceNavigationHadle?: () => void;
    onPendingOrdersNavigationHandle?: () => void;
    onManageStocksNavigationHandle?: () => void;
    onHitoryNavigationHandle?: () => void;
  };
  onCreateNewShop: () => void;
}

export const MyShopDisplay: React.FC<MyShopDisplayProps> = ({
  shop,
  navigationHandles,
  onCreateNewShop,
}) => {
  const {colors} = useTheme();

  return (
    <>
      <View
        key="Hamro Retal Shop"
        style={{
          paddingHorizontal: SamagraScaller({
            value: 14,
            scaleBy: 'average',
          }),
          paddingTop: 0,
          flex: 1,
        }}>
        <ScrollView
          style={{
            flex: 1,
          }}
          contentContainerStyle={{
            height: SamagraScaller({
              value: 80,
              scaleBy: 'height',
            }),
          }}>
          {navigationHandles ? (
            <>
              <PoppedCard
                onPress={navigationHandles.onProductNavigationHandle}
                variant="large"
                iconName="dolly"
                comment="Create, Update,  Delete  & More on Products "
                title="Products"></PoppedCard>
              <PoppedCard
                onPress={navigationHandles.onServiceNavigationHadle}
                iconName="account-hard-hat"
                comment="Create, Update,  Delete  & More on Services "
                variant="large"
                title="Services"></PoppedCard>
              <PoppedCard
                onPress={navigationHandles.onPendingOrdersNavigationHandle}
                children={
                  <Badge
                    selectionColor={'pink'}
                    style={{
                      bottom: 30,
                      left: 17,
                      // backgroundColor: 'green',
                    }}>
                    120
                  </Badge>
                }
                variant="large"
                iconName="truck-delivery"
                comment="Accept or Delete User Request"
                title="Pending Orders"></PoppedCard>
              <PoppedCard
                onPress={navigationHandles.onManageStocksNavigationHandle}
                variant="large"
                iconName="tray-full"
                comment="Update Your Stock Items"
                title="Manage Stocks"></PoppedCard>
              <PoppedCard
                onPress={navigationHandles.onHitoryNavigationHandle}
                variant="large"
                iconName="clipboard-list"
                comment="All Your Customer Deals"
                title="History"></PoppedCard>
            </>
          ) : null}
        </ScrollView>

        <SamagraBottomSheet
          children={() => (
            <View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Surface
                  style={{
                    width: 80,
                    marginRight: 10,
                    height: 80,
                  }}>
                  <FastImage
                    style={{
                      height: 80,
                      width: 80,
                      borderRadius: 4,
                      marginRight: 10,
                    }}
                    source={{
                      uri: 'https://i.pinimg.com/736x/cf/d2/fd/cfd2fd0ba8a6e2d958b969fbf2953a8c.jpg',
                    }}></FastImage>
                </Surface>
                <View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      // alignItems: 'center',
                    }}>
                    <View style={styles.ratingContainer}>
                      <Icon source="star" size={16} color={'gold'} />
                      <Icon source="star" size={16} color={'gold'} />
                      <Icon source="star" size={16} color={'gold'} />
                      <Icon source="star" size={16} color={'gold'} />
                    </View>
                    <TextComponet
                      customStyle={{
                        color: 'orange',
                      }}
                      fontVariant="bold"
                      title={shop.name}
                      fontSize={24}
                      lineHeight={24}></TextComponet>
                  </View>
                  <TextComponet
                    customStyle={{
                      color: 'green',
                    }}
                    fontVariant="medium"
                    title="Open from 10:00 am to 7:pm"
                    fontSize={14}
                    lineHeight={18}></TextComponet>
                  <TextComponet
                    customStyle={{
                      opacity: 0.8,
                    }}
                    fontVariant="medium"
                    title={shop.location}
                    fontSize={14}
                    lineHeight={18}></TextComponet>
                  <TextComponet
                    customStyle={{
                      opacity: 0.8,
                    }}
                    fontVariant="medium"
                    title={shop.phoneNumber}
                    fontSize={14}
                    lineHeight={18}></TextComponet>
                </View>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}>
                <AppButton
                  style={{
                    marginTop: SamagraScaller({
                      value: 12,
                      scaleBy: 'height',
                    }),
                    flex: 0.7,
                  }}>
                  Edit Shop
                </AppButton>
                <AppButton
                  color="light"
                  style={{
                    marginTop: SamagraScaller({
                      value: 12,
                      scaleBy: 'height',
                    }),
                    flex: 0.2,
                  }}>
                  Close Shop
                </AppButton>
              </View>
              <AppButton onPress={() => onCreateNewShop()}>
                Create New Shop
              </AppButton>
            </View>
          )}
          isOppen={true}
          flexHeight={1}
          pannigGesture={false}
          title="Request for House Keeping Service"></SamagraBottomSheet>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
  },
});
