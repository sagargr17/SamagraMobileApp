import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Logos} from '../../Assets/SVG/Exports/Exports';
import {HomeStackNavigationProp} from '../../Navigators/Stack/HomeStackNavigator';
import {size} from '../../Prefrences/Prefrences';
import {ItemCategoryCard} from '../Molecules/Cards/ItemCategoryCard';
import {SectionHeader} from '../Molecules/Global/SectionHeader';

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

  const styles = StyleSheet.create({
    wrapper: {
      paddingHorizontal: sizes === 'large' ? 10 : 0,
    },
    icon: {
      height: sizes === 'large' ? size.iconSize.medium : size.iconSize.large,
      width: 30,
    },
  });

  const data: Array<{
    titte: string;
    icon: any;
  }> = [
    {
      titte: 'Laundry',
      icon: <Laundry height={styles.icon.height} width={styles.icon.width} />,
    },
    {
      titte: 'Cleaning',
      icon: (
        <HouseKeeping height={styles.icon.height} width={styles.icon.width} />
      ),
    },
    {
      titte: 'Grocery',
      icon: <Grocery height={styles.icon.height} width={styles.icon.width} />,
    },
    {
      titte: 'Stationary',
      icon: (
        <Stationary height={styles.icon.height} width={styles.icon.width} />
      ),
    },
  ];

  const onPress = (categoryTitle = 'Laundry') => {
    sizes === 'large'
      ? navigation.navigate('CategoryListScreen')
      : setSelectedCategory(categoryTitle);
  };

  return (
    <View style={styles.wrapper}>
      <FlatList
        ListHeaderComponent={
          <SectionHeader
            onPress={() => onPress()}
            isIcon={false}
            title="Category"></SectionHeader>
        }
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={data}
        renderItem={({item, index}) => (
          <ItemCategoryCard
            onPress={() => onPress(item.titte)}
            selectedCategory={sizes === 'large' ? item.titte : selectedCategory}
            size={'regular'}
            key={index}
            title={item.titte}
            icon={item.icon}
          />
        )}></FlatList>
    </View>
  );
};
