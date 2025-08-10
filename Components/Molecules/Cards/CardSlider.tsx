import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {Alert, FlatList, StyleSheet, View, ViewStyle} from 'react-native';
import {Logos} from '../../../Assets/SVG/Exports/Exports';

import {size} from '../../../Prefrences/Prefrences';
import {GeneralCard} from './GeneralCard';
import {SectionHeader} from '../Global/SectionHeader';
import {titleRange} from '../../../Utilities/CustomMethods';
import {Spacer} from '../../Elements/Spacer';

export interface cardDetail {
  title: string;
  imageSize?: {
    height: number;
    width: number;
  };
  frame: string | any;
  onPress: any;
  containerStyle?: ViewStyle;
  comment?: string;
}

// Correctly define CardSliderProps to accept an array of cardDetail objects
export interface CardSliderProps {
  cardDetail: cardDetail[]; // Use 'cardDetail[]' to indicate an array
  headerTitle: string;
}

export const CardSlider: React.FC<CardSliderProps> = ({
  cardDetail,
  headerTitle,
}) => {
  const {fonts} = useTheme();
  const {Laundry, HouseKeeping, Grocery, Stationary, More} = Logos;
  const [selectedCategory, setSelectedCategory] = useState<string>('Laundry');
  const navigation: any = useNavigation();
  const onTabPress = () => {};

  // const height = sizes === 'large' ? size.iconSize.large : size.iconSize.medium;
  // const width =
  //   sizes === 'large' ? size.iconSize.large : size.iconSize.medium + 2;

  return (
    <View>
      <Spacer height={12}></Spacer>
      <SectionHeader
        style={{
          fontSize: 20,
          lineHeight: 22,
        }}
        onPress={() => onTabPress()}
        isIcon={false}
        title={headerTitle}></SectionHeader>
      <Spacer height={18}></Spacer>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={cardDetail}
        renderItem={({item, index}) => (
          <View
            style={[
              item.containerStyle,
              {
                right: size.spacing.xs,
              },
            ]}>
            <GeneralCard
              frame={item.frame}
              onPress={() => Alert.alert('asdasd')}
              key={index}
              title={item.title}
              comment={item.comment}
            />
          </View>
        )}></FlatList>
      <Spacer height={20}></Spacer>
    </View>
  );
};
