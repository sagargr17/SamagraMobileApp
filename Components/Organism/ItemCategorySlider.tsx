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
      paddingHorizontal: sizes === 'large' ? 2 : 0,
    },
    icon: {
      height: sizes === 'large' ? size.iconSize.medium : size.iconSize.medium,
      width: 30,
    },
  });

  const iconHeight = styles.icon.height;
  const iconWidth = styles.icon.width;

  const data: Array<{
    titte: string;
    icon: any;
  }> = [
    {
      titte: 'Laundry',
      icon: <Laundry height={iconHeight} width={iconWidth} />,
    },
    {
      titte: 'Cleaning',
      icon: <HouseKeeping height={iconHeight} width={iconWidth} />,
    },
    {
      titte: 'Grocery',
      icon: <Grocery height={iconHeight} width={iconWidth} />,
    },
    {
      titte: 'Stationary',
      icon: <Stationary height={iconHeight} width={iconWidth} />,
    },
  ];

  const onPress = (categoryTitle = 'Laundry') => {
    sizes === 'large'
      ? navigation.navigate('CategoryListScreen')
      : setSelectedCategory(categoryTitle);
  };

  return (
    <View style={styles.wrapper}>
      <SectionHeader
        style={{
          marginVertical: size.spacing.s,
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
            size={"large"}
            key={index}
            title={item.titte}
            icon={item.icon}
          />
        )}></FlatList>
    </View>
  );
};
