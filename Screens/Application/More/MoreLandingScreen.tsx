import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {clearTokens} from '../../../client/Token/TokenAccess';
import FastImage from '@d11/react-native-fast-image';
import {useNavigation, useTheme} from '@react-navigation/native';
import AppButton from '../../../Components/Elements/Button';
import {TextComponet} from '../../../Components/Elements/TextComponet';
import {PoppedCard} from '../../../Components/Sections/Cards/PoppedCard';
import {SamagraScaller} from '../../../Utilities/CustomMethods';

interface MoreLandingScreenProps {}

export const MoreLandingScreen: React.FC<MoreLandingScreenProps> = ({}) => {
  const {colors} = useTheme();
  const navigation = useNavigation<any>();
  let userLogoutHandle = () => clearTokens();

  return (
    <View
      style={{
        padding: SamagraScaller({
          value: 10,
          scaleBy: 'average',
        }),
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingVertical: SamagraScaller({
            value: 20,
            scaleBy: 'average',
          }),
          borderWidth: 0.3,
          paddingHorizontal: SamagraScaller({
            value: 10,
            scaleBy: 'average',
          }),
          borderRadius: 10,
          borderColor: colors.border,
        }}>
        <FastImage
          style={{
            height: 60,
            width: 60,
            borderRadius: SamagraScaller({
              scaleBy: 'width',
              value: 100,
            }),
          }}
          source={{
            uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          }}
          resizeMode="cover"></FastImage>
        <View
          style={{
            marginLeft: SamagraScaller({
              value: 8,
              scaleBy: 'average',
            }),
          }}>
          <TextComponet
            title="Sarita Thapa"
            customStyle={{
              textAlign: 'left',
              marginLeft: SamagraScaller({
                value: 5,
                scaleBy: 'average',
              }),
            }}
            fontVariant="bold"
            fontSize={30}
            lineHeight={30}></TextComponet>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TextComponet
              title="12 Shops"
              customStyle={{
                textAlign: 'left',
                marginLeft: SamagraScaller({
                  value: 5,
                  scaleBy: 'average',
                }),
              }}
              fontVariant="regular"
              fontSize={14}
              lineHeight={20}></TextComponet>
            <TextComponet
              title="1009 Items"
              customStyle={{
                textAlign: 'left',
                marginLeft: SamagraScaller({
                  value: 5,
                  scaleBy: 'average',
                }),
              }}
              fontVariant="regular"
              fontSize={14}
              lineHeight={20}></TextComponet>
          </View>
        </View>

        <TouchableOpacity>
          <TextComponet
            title="P"
            customStyle={{
              textAlign: 'right',
              marginLeft: SamagraScaller({
                value: 5,
                scaleBy: 'average',
              }),
              backgroundColor: 'orange',
              paddingHorizontal: SamagraScaller({
                value: 15,
                scaleBy: 'average',
              }),
              paddingVertical: SamagraScaller({
                value: 10,
                scaleBy: 'average',
              }),
              borderRadius: 45,
              color: 'white',
              left: SamagraScaller({
                value: 50,
                scaleBy: 'width',
              }),
            }}
            fontVariant="bold"
            fontSize={30}
            lineHeight={30}></TextComponet>
        </TouchableOpacity>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 8,
        }}>
        <PoppedCard
          customStyle={{
            flex: 0.48,
          }}
          // comment="Personal Change"
          onPress={() => console.log('setting')}
          title="History"
          variant="large"
          iconName="history"></PoppedCard>
        <PoppedCard
          customStyle={{
            flex: 0.48,
          }}
          // comment="Personal Change"
          onPress={() => console.log('setting')}
          title="Activity"
          variant="small"
          iconName="chart-bar-stacked"></PoppedCard>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <PoppedCard
          customStyle={{
            flex: 0.48,
          }}
          onPress={() => console.log('setting')}
          title="Favourite"
          variant="large"
          iconName="heart-outline"></PoppedCard>
        <PoppedCard
          customStyle={{
            flex: 0.48,
          }}
          // comment="Personal Change"
          onPress={() => console.log('setting')}
          title="Recent"
          variant="small"
          iconName="view-comfy"></PoppedCard>
      </View>

      <View
        style={{
          marginVertical: SamagraScaller({
            value: 4,
            scaleBy: 'average',
          }),
        }}>
        <PoppedCard
          onPress={() => {
            navigation.navigate('ApplicationOverlay', {
              screen: 'ShopItemsScreen',
              params: {
                name: 'Hamro Shop',
              },
            });
          }}
          title="Items"
          variant="large"
          comment="Stocks,Orders & Other  Management"
          iconName="basket-unfill"></PoppedCard>
        <PoppedCard
          onPress={() => {
            navigation.navigate('ApplicationOverlay', {
              screen: 'AddShopScreen',
            });
          }}
          title="Manage Store"
          variant="large"
          comment="Shops, Details and management "
          iconName="store"></PoppedCard>
        <PoppedCard
          onPress={() => console.log('Error')}
          title="Personal Account"
          variant="large"
          comment="Profile, Update User"
          iconName="account"></PoppedCard>
        <PoppedCard
          onPress={() => console.log('Error')}
          title="App Setting"
          variant="large"
          comment="Personal & Shop Setting"
          iconName="wrench"></PoppedCard>

        <AppButton onPress={userLogoutHandle} color="danger">
          Logout
        </AppButton>
      </View>
    </View>
  );
};
