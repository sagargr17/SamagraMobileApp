import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Logos} from '../../Assets/SVG/Exports/Exports';

import {size} from '../../Prefrences/Prefrences';
import {ItemCategoryCard} from '../Molecules/Cards/ItemCategoryCard';
import {SectionHeader} from '../Molecules/Global/SectionHeader';
import {titleRange} from '../../Utilities/CustomMethods';

interface ItemCategoryCardProps {
  sizes: 'regular' | 'large';
}

export const ItemCategoryCardSlider: React.FC<ItemCategoryCardProps> = ({
  sizes = 'large',
}) => {
  const {fonts} = useTheme();
  const {Laundry, HouseKeeping, Grocery, Stationary} = Logos;
  const [selectedCategory, setSelectedCategory] = useState<string>('Laundry');
  const navigation: any = useNavigation();

  const height = sizes === 'large' ? size.iconSize.large : size.iconSize.medium;
  const width =
    sizes === 'large' ? size.iconSize.large : size.iconSize.medium + 2;

  const data: Array<{
    titte: string;
    icon: any;
  }> = [
    {
      titte: 'Laundry',
      icon: <Laundry height={height} width={width} />,
    },
    {
      titte: 'Cleaning',
      icon: <HouseKeeping height={height} width={width} />,
    },
    {
      titte: titleRange('Plumbin & wire', 10),
      icon: <Stationary height={height} width={width} />,
    },
    {
      titte: 'More',
      icon: <Grocery height={height} width={width} />,
    },  
  ];

  const onTabPress = useCallback(
    (categoryTitle = 'Laundry') => {
       navigation.navigate('CategoryListScreen')
      // sizes === 'large'
      //   ? navigation.navigate('CategoryListScreen')
      //   : setSelectedCategory(categoryTitle);
    },
    [sizes, navigation, setSelectedCategory],
  );

  return (
    <View>
      {sizes === 'regular' ? null : (
        <SectionHeader
          style={{
            paddingBottom: size.spacing.xs,
          }}
          onPress={() => onTabPress()}
          isIcon={false}
          title="Category"></SectionHeader>
      )}
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={data}
        renderItem={({item, index}) => (
          <ItemCategoryCard
            onPress={() => onTabPress(item.titte)}
            selectedCategory={sizes === 'large' ? item.titte : selectedCategory}
            size={sizes}
            key={index}
            title={item.titte}
            icon={item.icon}
          />
        )}></FlatList>
    </View>
  );
};
