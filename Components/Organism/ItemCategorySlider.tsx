import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Logos} from '../../Assets/SVG/Exports/Exports';
import {HomeStackNavigationProp} from '../../Navigators/Stack/HomeStackNavigator';
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
  const {Laundry, HouseKeeping, Grocery, Stationary} = Logos;
  const [selectedCategory, setSelectedCategory] = useState<string>('Laundry');
  const navigation =
    useNavigation<HomeStackNavigationProp<'CategoryListScreen'>>();

  const height = sizes === 'large' ? size.iconSize.large+5 : size.iconSize.medium;
  const width = sizes === 'large' ? size.iconSize.large+5 : size.iconSize.medium+2;

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
      titte: 'Grocery',
      icon: <Grocery height={height} width={width} />,
    },
    {
      titte: titleRange('Plumbin & wire',10),
      icon: <Stationary height={height} width={width} />,
    },
  ];

  const onPress = (categoryTitle = 'Laundry') => {
    sizes === 'large'
      ? navigation.navigate('CategoryListScreen')
      : setSelectedCategory(categoryTitle);
  };

  return (
    <View>
      <SectionHeader
        style={{
          paddingBottom: size.spacing.xs,
        }}
        onPress={() => onPress()}
        isIcon={false}
        title="Category"></SectionHeader>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={data}
        renderItem={({item, index}) => (
          <ItemCategoryCard
            onPress={() => onPress(item.titte)}
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
