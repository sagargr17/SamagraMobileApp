import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {Alert, FlatList, StyleSheet, View, ViewStyle} from 'react-native';
import {Logos} from '../../../Assets/SVG/Exports/Exports';

import {size} from '../../../Prefrences/Prefrences';
import {GeneralCardMolecule} from './GeneralCardMolecule';
import {SectionHeaderMolecule} from '../Global/SectionHeaderMolecule';
import {titleRange} from '../../../Utilities/CustomMethods';
import {SpacerElement} from '../../Elements/SpacerElement';

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
export interface CardSliderMoleCuleProps {
  cardDetail: cardDetail[]; // Use 'cardDetail[]' to indicate an array
  headerTitle: string;
}

export const CardSliderMoleCule: React.FC<CardSliderMoleCuleProps> = ({
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
      <SpacerElement height={12}></SpacerElement>
      <SectionHeaderMolecule
        style={{
          fontSize: 20,
          lineHeight: 22,
        }}
        onPress={() => onTabPress()}
        isIcon={false}
        title={headerTitle}></SectionHeaderMolecule>
      <SpacerElement height={18}></SpacerElement>
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
            <GeneralCardMolecule
              frame={item.frame}
              onPress={() => Alert.alert('asdasd')}
              key={index}
              title={item.title}
              comment={item.comment}
            />
          </View>
        )}></FlatList>
      <SpacerElement height={20}></SpacerElement>
    </View>
  );
};
