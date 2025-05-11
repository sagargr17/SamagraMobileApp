import {useTheme} from '@react-navigation/native';
import React from 'react';
import {Text} from 'react-native-paper';
import {SliderSwitcher} from '../../../Components/Layout/SliderSwitcher';
import {View} from 'moti';
import FastImage from '@d11/react-native-fast-image';
import {Logos} from '../../../Assets/SVG/Exports/Exports';
import {ShopDisplayCard} from '../../../Components/Sections/ShopDisplayCard';
interface MyShopsProps {}

export const MyShopsScreen: React.FC<MyShopsProps> = ({}) => {
  const {colors} = useTheme();
  const {Shop1, Shop2, WelcomeShop} = Logos;

  const TopParts = () => {
    <></>;
  };

  return (
    <>
      <SliderSwitcher upperContainerFlexHeight={0.07}>
        <View key="Hamro Bijuli Pasal">
          <ShopDisplayCard
            shop={{
              icon: <Shop1 height={400} width={'90%'}></Shop1>,
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
              icon: <Shop2 height={350} width={'60%'}></Shop2>,
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
        <View key="Janta Garage">
          <FastImage></FastImage>
        </View>
      </SliderSwitcher>
    </>
  );
};
