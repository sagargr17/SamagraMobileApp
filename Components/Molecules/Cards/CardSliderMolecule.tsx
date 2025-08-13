import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
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
  headerStyle?: TextStyle;
}

export const CardSliderMoleCule: React.FC<CardSliderMoleCuleProps> = ({
  cardDetail,
  headerTitle,
  headerStyle,
}) => {
  const {fonts} = useTheme();
  const {Laundry, HouseKeeping, Grocery, Stationary, More} = Logos;
  const [selectedCategory, setSelectedCategory] = useState<string>('Laundry');
  const navigation: any = useNavigation();
  const onTabPress = () => {};

  return (
    <View>
      <SpacerElement height={20}></SpacerElement>
      <SectionHeaderMolecule
        style={headerStyle}
        onPress={() => onTabPress()}
        isIcon={false}
        title={headerTitle}></SectionHeaderMolecule>
      <SpacerElement height={12}></SpacerElement>

      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={cardDetail}
        renderItem={({item, index}) => (
          <View
            style={[
              // item.containerStyle,
              {
                right: size.spacing.xxs,
                // marginTop: size.spacing.s,
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
      <SpacerElement height={16}></SpacerElement>
    </View>
  );
};
