import {useTheme} from '@react-navigation/native';
import React from 'react';
import {Text} from 'react-native-paper';
import {SliderSwitcher} from '../../../Components/Layout/SliderSwitcher';
import {View} from 'moti';
import FastImage from '@d11/react-native-fast-image';
interface MyShopsProps {}

export const MyShopsScreen: React.FC<MyShopsProps> = ({}) => {
  const {colors} = useTheme();

  const TopParts = () => {
    <></>;
  };

  return (
    <>
      <SliderSwitcher upperContainerFlexHeight={0.07}>
        <View key="Hamro Bijuli Pasal">
          <FastImage></FastImage>
        </View>
        <View key="Hamro Retal Shop">
          <FastImage
            source={{
              uri: 'https://images.unsplash.com/photo-1706117948438-826d8018505a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJpdmF0ZSUyMGNhcnxlbnwwfHwwfHx8MA%3D%3D',
            }}
            style={{
              height: 200,
              width: 200,
            }}></FastImage>
        </View>
        <View key="Janta Garage">
          <FastImage></FastImage>
        </View>
      </SliderSwitcher>
    </>
  );
};
