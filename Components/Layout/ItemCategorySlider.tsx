import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Logos} from '../../Assets/SVG/Exports/Exports';
import {HomeStackNavigationProp} from '../../Navigators/Stack/HomeStackNavigator';
import {AreaMapper} from '../../Utilities/CustomMethods';
import {ItemCategoryCard} from '../Sections/Cards/ItemCategoryCard';
import {SectionHeader} from '../Sections/SectionHeader';
import {styles} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetScrollable/BottomSheetFlashList';

interface ItemCategoryCardProps {
  size: 'regular' | 'large';
}

export const ItemCategoryCardSlider: React.FC<ItemCategoryCardProps> = ({
  size = 'large',
}) => {
  const {Laundry, HouseKeeping, Grocery, Stationary} = Logos;
  const [selectedCategory, setSelectedCategory] = useState<string>('Laundry');
  const navigation =
    useNavigation<HomeStackNavigationProp<'CategoryListScreen'>>();
  const {colors} = useTheme();

  const styles = StyleSheet.create({
    wrapper: {
      paddingHorizontal: size === 'large' ? 10 : 0,
    },
    icon: {
      height: AreaMapper({
        value: size === 'large' ? 40 : 30,
        scaleBy: 'average',
      }),
      width: AreaMapper({
        value: 30,
        scaleBy: 'average',
      }),
    },
  });

  const data: Array<{
    titte: string;
    icon: any;
  }> = [
    {
      titte: 'Laundry',
      icon: <Laundry />,
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
    size === 'large'
      ? navigation.navigate('CategoryListScreen')
      : setSelectedCategory(categoryTitle);
  };

  return (
    <View style={styles.wrapper}>
      <SectionHeader
        onPress={() => onPress()}
        isIcon={size === 'large' ? true : false}
        title="Category"
        titleFontSize={size === 'large' ? 18 : 16}
        titleHeight={22}></SectionHeader>
      <FlatList
        contentContainerStyle={{
          paddingVertical: AreaMapper({
            value: size === 'large' ? 12 : 8,
            scaleBy: 'average',
          }),
        }}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={data}
        renderItem={({item, index}) => (
          <ItemCategoryCard
            onPress={() => onPress(item.titte)}
            selectedCategory={size === 'large' ? item.titte : selectedCategory}
            size={size}
            key={index}
            title={item.titte}
            icon={item.icon}
          />
        )}></FlatList>
    </View>
  );
};
