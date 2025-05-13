import {useTheme} from '@react-navigation/native';
import React from 'react';
import {SliderSwitcher} from '../../../Components/Layout/SliderSwitcher';

import {Logos} from '../../../Assets/SVG/Exports/Exports';
import {TextComponet} from '../../../Components/Elements/TextComponet';
import {SamagraBottomSheet} from '../../../Components/Sections/SamagraBottomSheet';
import {ShopDisplayCard} from '../../../Components/Sections/ShopDisplayCard';
import {SamagraScaller} from '../../../Utilities/CustomMethods';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Icon, Surface} from 'react-native-paper';
import FastImage from '@d11/react-native-fast-image';
import {ItemCardVerticleSlider} from '../../../Components/Layout/ItemCardVerticleSlider';
import AppButton from '../../../Components/Elements/Button';

interface MyShopsProps {}

export const MyShopsScreen: React.FC<MyShopsProps> = ({}) => {
  const {colors} = useTheme();
  const {Shop1, Shop2, WelcomeShop} = Logos;

  const TopParts = () => {
    <></>;
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      <SliderSwitcher upperContainerFlexHeight={0.07}>
        <View key="Hamro Bijuli Pasal">
          <ShopDisplayCard
            shop={{
              id: `${Math.random()}`,
              icon: (
                <>
                  <Shop1
                    height={SamagraScaller({
                      value: 450,
                      scaleBy: 'height',
                    })}
                    width={'80%'}></Shop1>
                  <AppButton
                    
                    onPress={() => console.log('Add item')}
                    style={{
                      width: SamagraScaller({
                        value: 300,
                        scaleBy: 'average',
                      }),
                    }}>
                    Add Item
                  </AppButton>
                </>
              ),
              shopName: 'Hamro Bijuli Pasal',
              shopDescription: 'All the Electronic Appliances available Here',
              rating: 4,
              item: {
                totalProduct: 167,
                totalServices: 2,
              },

              owner: {
                owner: {
                  ownerName: 'Sagar Gahatraj',
                  phoneNumber: '+9779841150390',
                },
              },
            }}></ShopDisplayCard>
        </View>
        <View key="Hamro Retal Shop">
          <ShopDisplayCard
            shop={{
              id: `${Math.random()}`,
              icon: (
                <ScrollView style={{}}>
                  <ItemCardVerticleSlider
                    titleHeaderStyle={{
                      color: colors.notification,
                    }}
                    titleHeader="Pending Orders(210)"></ItemCardVerticleSlider>
                  <ItemCardVerticleSlider
                    titleHeaderStyle={{
                      color: colors.notification,
                    }}
                    titleHeader="4 Items are having limited stocks"></ItemCardVerticleSlider>
                </ScrollView>
              ),
              shopName: 'Hamro Bijuli Pasal',
              shopDescription: 'All the Electronic Appliances available Here',
              rating: 4,
              item: {
                totalProduct: 167,
                totalServices: 2,
              },

              owner: {
                owner: {
                  ownerName: 'Sagar Gahatraj',
                  phoneNumber: '+9779841150390',
                },
              },
            }}></ShopDisplayCard>
          <SamagraBottomSheet
            customStyle={{}}
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
                        title="Hamro Biujuli Pasal"
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
                      title="New Baneswor Chandbari"
                      fontSize={14}
                      lineHeight={18}></TextComponet>
                    <TextComponet
                      customStyle={{
                        opacity: 0.8,
                      }}
                      fontVariant="medium"
                      title="(+977)9841150390"
                      fontSize={14}
                      lineHeight={18}></TextComponet>
                  </View>
                </View>
                <AppButton
                  style={{
                    marginVertical: SamagraScaller({
                      value: 18,
                      scaleBy: 'height',
                    }),
                  }}>
                  Edit Shop
                </AppButton>
                <View></View>
              </View>
            )}
            isOppen={true}
            flexHeight={2}
            pannigGesture={false}
            title="Request for House Keeping Service"></SamagraBottomSheet>
        </View>
        <View key="Janta Garage">
          <ShopDisplayCard
            shop={{
              id: `${Math.random()}`,
              icon: (
                <>
                  <Shop2
                    height={SamagraScaller({
                      value: 400,
                      scaleBy: 'height',
                    })}
                    width={'80%'}></Shop2>
                  <AppButton
                    onPress={() => console.log('Add item')}
                    style={{
                      width: SamagraScaller({
                        value: 300,
                        scaleBy: 'average',
                      }),
                    }}>
                    Add Item
                  </AppButton>
                </>
              ),
              shopName: 'Hamro Bijuli Pasal',
              shopDescription: 'All the Electronic Appliances available Here',
              rating: 4,
              item: {
                totalProduct: 167,
                totalServices: 2,
              },

              owner: {
                owner: {
                  ownerName: 'Sagar Gahatraj',
                  phoneNumber: '+9779841150390',
                },
              },
            }}></ShopDisplayCard>
        </View>
      </SliderSwitcher>
    </View>
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
